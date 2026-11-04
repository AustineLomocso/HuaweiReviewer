const test = require('node:test');
const assert = require('node:assert');
require('../js/core/scoring.js');
require('../js/core/progress.js');
require('../js/core/loader.js');
const HR = globalThis.HR;

HR.registerStructure({
  courses: [{ id: 'c', title: 'Course', chapters: [{ id: 'c-1', num: '1', title: 'Ch', subs: [{ id: 'c-1-1', num: '1.1', title: 'Sub' }] }] }],
  mocks: [{ id: 'm1', year: '2023-24', title: 'Mock One' }],
});
const q = (id, extra) => ({ id, type: 'tf', options: [], answer: ['T'], ...extra });
HR.registerSection({ id: 'c-1-1', tests: { pre: [q('c-1-1-pre-01')], post: [], summative: [] } });
HR.registerMock({ id: 'm1', questions: [
  q('m1-01', { sectionId: 'c-1-1', mergedInto: null }),
  q('m1-02', { sectionId: 'c-1-1', mergedInto: 'm1-01' }),
  q('m1-03', { sectionId: 'c-1', mergedInto: null }),
] });

test('parses keys', () => {
  assert.deepStrictEqual(HR.tests.parseKey('c-1-1:pre'), { id: 'c-1-1', kind: 'pre' });
});

test('finds which section a generated question belongs to', () => {
  assert.strictEqual(HR.tests.sectionOfQid('cloud-2-1-summative-07'), 'cloud-2-1');
  assert.strictEqual(HR.tests.sectionOfQid('ai-pre-01'), 'ai');
  assert.strictEqual(HR.tests.sectionOfQid('m2526-07'), null);
});

test('generated test resolves from its section', () => {
  assert.deepStrictEqual(HR.tests.resolve('c-1-1:pre', {}).map((x) => x.id), ['c-1-1-pre-01']);
});

test('past set holds canonical questions and rolls up', () => {
  assert.deepStrictEqual(HR.tests.resolve('c-1-1:past', {}).map((x) => x.id), ['m1-01']);
  assert.deepStrictEqual(HR.tests.resolve('c-1:past', {}).map((x) => x.id).sort(), ['m1-01', 'm1-03']);
});

test('full mock keeps every question including repeats', () => {
  assert.strictEqual(HR.tests.resolve('m1:full', {}).length, 3);
});

test('retry resolves stored IDs and skips missing ones', () => {
  const retry = { 'c-1-1-pre-01': { at: 1 }, 'm1-03': { at: 1 }, 'gone-pre-01': { at: 1 } };
  assert.deepStrictEqual(HR.tests.resolve('retry:all', retry).map((x) => x.id).sort(), ['c-1-1-pre-01', 'm1-03']);
});

test('titles use numbering', () => {
  assert.strictEqual(HR.tests.title('c-1-1:post'), 'Post-Test 1.1');
  assert.strictEqual(HR.tests.title('c-1:summative'), 'Summative Test 1');
  assert.strictEqual(HR.tests.title('c:pre'), 'Pre-Test: Course');
  assert.strictEqual(HR.tests.title('c-1-1:past'), 'Past Exam Set 1.1');
  assert.strictEqual(HR.tests.title('m1:full'), 'Mock One');
  assert.strictEqual(HR.tests.title('retry:all'), 'Retry Set');
});

test('only past sets, full mocks and retry offer practice', () => {
  assert.strictEqual(HR.tests.allowsPractice('c-1-1:pre'), false);
  assert.strictEqual(HR.tests.allowsPractice('c-1-1:past'), true);
  assert.strictEqual(HR.tests.allowsPractice('m1:full'), true);
  assert.strictEqual(HR.tests.allowsPractice('retry:all'), true);
});

function fakeDocument(failing) {
  globalThis.document = {
    createElement: () => ({}),
    head: { appendChild: (el) => (failing(el.src) ? el.onerror() : el.onload()) },
  };
}

test('a retry set reports a section that fails to load', async () => {
  fakeDocument((src) => src.includes('/sections/'));
  try {
    const r = await HR.tests.ensureLoaded('retry:all', { 'x-9-pre-01': { at: 1 }, 'y-9-post-02': { at: 1 }, 'm1-01': { at: 1 } });
    assert.deepStrictEqual(r, { failed: 2 });
  } finally {
    delete globalThis.document;
  }
});

test('other test types still reject when their section fails to load', async () => {
  fakeDocument((src) => src.includes('/sections/'));
  try {
    await assert.rejects(() => HR.tests.ensureLoaded('x-8:pre', {}));
  } finally {
    delete globalThis.document;
  }
});
