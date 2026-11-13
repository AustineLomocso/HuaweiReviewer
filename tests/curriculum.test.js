const test = require('node:test');
const assert = require('node:assert/strict');
require('../js/core/progress.js');
require('../js/core/loader.js');
require('../js/core/curriculum.js');
const HR = globalThis.HR;

HR.registerStructure({
  courses: [
    { id: 'a', pdf: 'a', title: 'A', chapters: [{ id: 'a-1', subs: [{ id: 'a-1-1' }, { id: 'a-1-2' }] }] },
    { id: 'b', pdf: 'b', title: 'B', chapters: [{ id: 'b-1', subs: [{ id: 'b-1-1' }] }] },
  ],
  mocks: [{ id: 'm1' }],
});
HR.registerMock({ id: 'm1', questions: [
  { id: 'm1-01', sectionId: 'a-1-1', secondarySectionIds: ['a-1-2', 'b-1-1'] },
  { id: 'm1-02', sectionId: 'a-1-1', mergedInto: 'm1-01' },
  { id: 'm1-03', sectionId: 'a-1-2' },
] });
HR.registerManifest({ 'a-1-1': { notes: true, pre: 3, post: 8, summative: 12, past: 1 } });
HR.data.inventory = { sources: [{ id: 'a', path: 'HuaweiStudyMaterial/Course (V1).pdf', pageCount: 20 }] };

test('secondary mappings include a canonical question in each matching course and lesson', () => {
  assert.deepEqual(HR.tests.resolve('b:past').map((q) => q.id), ['m1-01']);
  assert.deepEqual(HR.tests.resolve('a-1-2:past').map((q) => q.id), ['m1-01', 'm1-03']);
});

test('ancestor past sets deduplicate multiple descendant mappings and preserve old unmapped fields', () => {
  assert.deepEqual(HR.tests.resolve('a:past').map((q) => q.id), ['m1-01', 'm1-03']);
  assert.deepEqual(HR.tests.mappedLessonIds({ sectionId: 'a-1-1' }), ['a-1-1']);
  assert.equal(HR.tests.resolve('m1:full').length, 3);
});

test('source links encode local paths and validate physical pages', () => {
  assert.equal(HR.curriculum.sourceHref('a', 20), 'HuaweiStudyMaterial/Course%20(V1).pdf#page=20');
  for (const page of [0, 21, 1.5, NaN]) assert.equal(HR.curriculum.sourceHref('a', page), null);
  assert.equal(HR.curriculum.sourceHref('unknown', 1), null);
});

test('coverage reports missing content separately from existing variable assessment counts', () => {
  const rows = HR.curriculum.sourceCoverage('a');
  assert.equal(rows.find((row) => row.id === 'a-1-1').post, 8);
  assert.equal(rows.find((row) => row.id === 'a-1-2').notes, false);
  assert.equal(rows.find((row) => row.id === 'a-1-2').summative, 0);
  assert.deepEqual(HR.curriculum.sourceCoverage('unknown'), []);
});
