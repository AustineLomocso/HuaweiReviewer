const test = require('node:test');
const assert = require('node:assert');
const { checkQuestion, checkMix, expectedSize } = require('../tools/check-content.js');

const opts = ['A', 'B', 'C', 'D'].map((key) => ({ key, text: 'Option ' + key }));
const good = {
  id: 'x-pre-01', type: 'single', stem: 'Which one is right?', options: opts, answer: ['A'],
  explanation: 'Because of the reason given in the slides.',
  source: { kind: 'material', pdf: 'cloud', pages: [10] },
};
const pageCounts = { ai: 387, cloud: 404 };

test('accepts a valid question', () => {
  assert.deepStrictEqual(checkQuestion(good, pageCounts), []);
});

test('flags each invalid field', () => {
  const cases = [
    [{ ...good, answer: ['A', 'B'] }, /exactly one/],
    [{ ...good, type: 'multi' }, /at least two/],
    [{ ...good, answer: ['Z'] }, /not an option/],
    [{ ...good, explanation: 'Option B is wrong.' }, /letters/],
    [{ ...good, source: { kind: 'material', pdf: 'cloud', pages: [999] } }, /page/],
    [{ ...good, source: undefined }, /source/],
    [{ ...good, options: opts.slice(0, 3) }, /four options/],
    [{ ...good, stem: '' }, /stem/],
    [{ ...good, type: 'tf', answer: ['T'] }, /True\/False/],
  ];
  for (const [q, pattern] of cases) {
    assert.ok(checkQuestion(q, pageCounts).some((e) => pattern.test(e)), String(pattern));
  }
});

test('expected sizes follow the spec', () => {
  assert.strictEqual(expectedSize('sub', 'summative'), 10);
  assert.strictEqual(expectedSize('chapter', 'pre'), 10);
  assert.strictEqual(expectedSize('course', 'post'), 60);
});

test('type mix follows the spec', () => {
  const mk = (s, m, t) => [
    ...Array(s).fill({ type: 'single' }), ...Array(m).fill({ type: 'multi' }), ...Array(t).fill({ type: 'tf' }),
  ];
  assert.deepStrictEqual(checkMix(mk(2, 2, 1)), []);
  assert.deepStrictEqual(checkMix(mk(25, 20, 15)), []);
  assert.strictEqual(checkMix(mk(3, 1, 1)).length, 1);
});

// ---------------------------------------------------------------------------
// Hardening: question context, section rules, past-exam rules, duplicates
// ---------------------------------------------------------------------------
require('../js/core/progress.js');
require('../js/core/paper.js');
const { checkAll } = require('../tools/check-content.js');
const { sample } = require('../tools/sample-review.js');
const progress = globalThis.HR.progress;

test('citations must match the section pdf and page range', () => {
  const ctx = { pdf: 'ai', range: [10, 20] };
  const ai = (pages) => ({ ...good, source: { kind: 'material', pdf: 'ai', pages } });
  assert.deepStrictEqual(checkQuestion(ai([10, 20]), pageCounts, ctx), []);
  assert.ok(checkQuestion(good, pageCounts, ctx).some((e) => /course pdf/.test(e)));
  assert.ok(checkQuestion(ai([9]), pageCounts, ctx).some((e) => /outside/.test(e)));
  assert.ok(checkQuestion(ai([21]), pageCounts, ctx).some((e) => /outside/.test(e)));
});

test('external sections only accept inferred sources', () => {
  const ctx = { external: true };
  assert.ok(checkQuestion(good, pageCounts, ctx).some((e) => /inferred/.test(e)));
  assert.deepStrictEqual(checkQuestion({ ...good, source: { kind: 'inferred' } }, pageCounts, ctx), []);
});

test('source pages must be a non-empty array of integers', () => {
  for (const pages of ['10', 10, null, [], [1.5], ['3'], [NaN]]) {
    const errs = checkQuestion({ ...good, source: { kind: 'material', pdf: 'cloud', pages } }, pageCounts);
    assert.ok(errs.some((e) => /array of integers/.test(e)), JSON.stringify(pages));
  }
});

test('answer keys and option texts must be unique and non-empty', () => {
  assert.ok(checkQuestion({ ...good, type: 'multi', answer: ['A', 'A'] }, pageCounts).some((e) => /duplicate answer/.test(e)));
  const blank = opts.map((o, i) => (i === 2 ? { ...o, text: '  ' } : o));
  assert.ok(checkQuestion({ ...good, options: blank }, pageCounts).some((e) => /empty option/.test(e)));
  const nonString = opts.map((o, i) => (i === 2 ? { ...o, text: 5 } : o));
  assert.ok(checkQuestion({ ...good, options: nonString }, pageCounts).some((e) => /empty option/.test(e)));
  const same = opts.map((o, i) => (i === 1 ? { ...o, text: ' option a ' } : o));
  assert.ok(checkQuestion({ ...good, options: same }, pageCounts).some((e) => /duplicate option/.test(e)));
});

test('option-letter references are caught without flagging ordinary English', () => {
  const flagged = ['Options A and B are wrong.', 'The answer is D.', 'Answer: C', '(B) fails here.', 'A is correct.',
    'Both A and C hold.', 'Statement B is wrong.', 'Only choice D applies.'];
  const clean = ['You answer a customer ticket.', 'The option a team has is limited.', 'A VPC is isolated.',
    'Both ECS and BMS are compute services.', 'Use a, b and c as labels.'];
  for (const explanation of flagged) {
    assert.ok(checkQuestion({ ...good, explanation }, pageCounts).some((e) => /letters/.test(e)), explanation);
  }
  for (const explanation of clean) {
    assert.deepStrictEqual(checkQuestion({ ...good, explanation }, pageCounts), [], explanation);
  }
});

// --- in-memory data set ---------------------------------------------------
const MIXES = { 5: [2, 2, 1], 10: [4, 3, 3], 20: [8, 7, 5], 60: [25, 20, 15] };
const SIZES_BY_LEVEL = { sub: [5, 5, 10], chapter: [10, 10, 20], course: [60, 60, 60] };
let uniq = 0;
function mkQ(id, type, extra) {
  uniq += 1;
  const options = type === 'tf'
    ? [{ key: 'T', text: 'True' }, { key: 'F', text: 'False' }]
    : ['A', 'B', 'C', 'D'].map((k) => ({ key: k, text: `opt${uniq}${k}` }));
  return {
    id, type, stem: `stem${uniq} concept${uniq} detail${uniq}`, options,
    answer: type === 'multi' ? ['A', 'B'] : [options[0].key],
    explanation: 'Because the slides say so.',
    source: { kind: 'material', pdf: 'p', pages: [5] },
    ...extra,
  };
}
function typesFor(size) {
  const [s, m, t] = MIXES[size];
  return [...Array(s).fill('single'), ...Array(m).fill('multi'), ...Array(t).fill('tf')];
}
const num = (i) => String(i + 1).padStart(2, '0');
function mkSection(id, level, { source, notePages = [1, 5], extra } = {}) {
  const [pre, post, sum] = SIZES_BY_LEVEL[level];
  const mk = (kind, size) => typesFor(size).map((t, i) => mkQ(`${id}-${kind}-${num(i)}`, t, source ? { source } : {}));
  const note = { heading: 'Heading', bullets: ['A point.'] };
  if (notePages) note.pages = notePages;
  return { id, notes: [note], tests: { pre: mk('pre', pre), post: mk('post', post), summative: mk('summative', sum) }, ...extra };
}
function mkMock(id, year, sectionId = 'p-1-1') {
  return {
    id,
    questions: typesFor(60).map((t, i) => mkQ(`${id}-${num(i)}`, t, {
      sectionId, mergedInto: null, appearsIn: [year], source: { kind: 'material', pdf: 'p', pages: [90] },
    })),
  };
}
function mkHR(sections = [mkSection('p-1-1', 'sub')], mocks = [mkMock('m1', '2023-24'), mkMock('m2', '2024-25')]) {
  return {
    progress,
    data: {
      structure: {
        courses: [
          { id: 'p', pdf: 'p', title: 'P', pageCount: 100, chapters: [
            { id: 'p-1', num: '1', title: 'One', pages: [1, 50], subs: [{ id: 'p-1-1', num: '1.1', title: 'Sub', pages: [1, 20] }] },
          ] },
          { id: 'x', external: true, title: 'X', chapters: [
            { id: 'x-1', num: '1', title: 'Ext', subs: [{ id: 'x-1-1', num: '1.1', title: 'ExtSub' }] },
          ] },
        ],
        mocks: [{ id: 'm1', year: '2023-24' }, { id: 'm2', year: '2024-25' }],
      },
      sections: Object.fromEntries(sections.map((s) => [s.id, s])),
      mocks: Object.fromEntries(mocks.map((m) => [m.id, m])),
    },
  };
}
const errorsOf = (hr, opts) => checkAll(hr, opts).errors;
const has = (list, re) => list.some((e) => re.test(e));

test('a well-formed data set has no errors and unwritten sections only warn', () => {
  const r = checkAll(mkHR());
  assert.deepStrictEqual(r.errors, []);
  assert.ok(r.warnings.some((w) => /not yet written/.test(w)));
  assert.strictEqual(r.counts.generated, 20);
  assert.strictEqual(r.counts.past, 120);
});

test('strict mode turns unwritten sections and mocks into errors', () => {
  const hr = mkHR([mkSection('p-1-1', 'sub')], [mkMock('m1', '2023-24')]);
  assert.deepStrictEqual(errorsOf(hr), []);
  const strict = errorsOf(hr, { strict: true });
  assert.ok(has(strict, /p-1: not yet written/));
  assert.ok(has(strict, /m2: not yet transcribed/));
});

test('generated citations are checked against the section pdf and pages', () => {
  const wrongPdf = mkSection('p-1-1', 'sub', { source: { kind: 'material', pdf: 'ai', pages: [5] } });
  assert.ok(has(errorsOf(mkHR([wrongPdf])), /course pdf/));
  const outside = mkSection('p-1-1', 'sub', { source: { kind: 'material', pdf: 'p', pages: [21] } });
  assert.ok(has(errorsOf(mkHR([outside])), /outside/));
  const chapterWide = mkSection('p-1', 'chapter', { source: { kind: 'material', pdf: 'p', pages: [50] }, notePages: [1, 50] });
  assert.deepStrictEqual(errorsOf(mkHR([chapterWide])), []);
  const courseWide = mkSection('p', 'course', { source: { kind: 'material', pdf: 'p', pages: [100] }, notePages: [1, 100] });
  assert.deepStrictEqual(errorsOf(mkHR([courseWide])), []);
  const beyond = mkSection('p', 'course', { source: { kind: 'material', pdf: 'p', pages: [101] }, notePages: [1, 100] });
  assert.ok(has(errorsOf(mkHR([beyond])), /outside|bad source page/));
});

test('external courses need inferred sources and page-free notes', () => {
  const inferred = mkSection('x-1-1', 'sub', { source: { kind: 'inferred' }, notePages: null });
  assert.deepStrictEqual(errorsOf(mkHR([inferred])), []);
  const material = mkSection('x-1-1', 'sub', { notePages: null });
  assert.ok(has(errorsOf(mkHR([material])), /inferred/));
  const paged = mkSection('x-1-1', 'sub', { source: { kind: 'inferred' }, notePages: [1, 2] });
  assert.ok(has(errorsOf(mkHR([paged])), /external.*notes.*pages/));
});

test('a malformed question yields an error naming its id instead of aborting', () => {
  const s = mkSection('p-1-1', 'sub');
  s.tests.pre[1].options = 5;
  Object.defineProperty(s.tests.pre[2], 'answer', { get() { throw new Error('boom'); } });
  s.tests.post[0] = null;
  const errs = errorsOf(mkHR([s]));
  assert.ok(has(errs, /p-1-1-pre-02.*options/));
  assert.ok(has(errs, /p-1-1-pre-03.*malformed.*boom/));
  assert.ok(has(errs, /p-1-1:post.*malformed/));
  assert.ok(!has(errs, /summative/), 'later tests are still checked');
});

test('notes need valid in-range pages and non-empty bullets', () => {
  const bad = (notePages) => errorsOf(mkHR([mkSection('p-1-1', 'sub', { notePages })]));
  assert.deepStrictEqual(bad([1, 20]), []);
  for (const pages of [[5, 3], [0, 4], [1, 21], [1], 'x', [1.5, 3]]) {
    assert.ok(has(bad(pages), /note 0: pages/), JSON.stringify(pages));
  }
  assert.ok(has(bad(null), /note 0: pages/));
  const s = mkSection('p-1-1', 'sub');
  s.notes[0].bullets = ['ok', '  '];
  assert.ok(has(errorsOf(mkHR([s])), /empty bullet/));
});

test('shortfall is valid only for a partial test with a real reason', () => {
  const reason = 'The slides cover too little for ten questions.';
  const short = (n, shortfall) => {
    const s = mkSection('p-1-1', 'sub');
    s.tests.summative = s.tests.summative.slice(0, n);
    if (shortfall !== undefined) s.shortfall = { summative: shortfall };
    return checkAll(mkHR([s]));
  };
  const ok = short(8, reason);
  assert.ok(!has(ok.errors, /summative/));
  assert.ok(ok.warnings.some((w) => /p-1-1:summative: 8\/10/.test(w)));
  assert.ok(has(short(8, 'too short').errors, /shortfall reason/));
  assert.ok(has(short(8).errors, /no shortfall reason/));
  assert.ok(has(short(0, reason).errors, /shortfall/));
  assert.ok(has(short(10, reason).errors, /shortfall/));
});

test('a short test keeps a near-proportional type mix, as a warning', () => {
  const reason = 'The slides cover too little for ten questions.';
  const s = mkSection('p-1-1', 'sub');
  s.tests.summative = s.tests.summative.filter((q) => q.type !== 'tf').slice(0, 6);
  s.shortfall = { summative: reason };
  const r = checkAll(mkHR([s]));
  assert.ok(!has(r.errors, /mix/));
  assert.ok(r.warnings.some((w) => /mix/.test(w)));
});

test('registered section ids must be in the structure and match their file', () => {
  const stray = mkSection('p-9-9', 'sub');
  assert.ok(has(errorsOf(mkHR([mkSection('p-1-1', 'sub'), stray])), /p-9-9.*not in structure/));
  const hr = mkHR();
  assert.deepStrictEqual(errorsOf(hr, { sectionFiles: { 'p-1-1': 'p-1-1.js' } }), []);
  assert.ok(has(errorsOf(hr, { sectionFiles: { 'p-1-1': 'p-1-2.js' } }), /p-1-2\.js.*p-1-1/));
});

// --- past exams -----------------------------------------------------------
function mergedPair() {
  const m1 = mkMock('m1', '2023-24');
  const m2 = mkMock('m2', '2024-25');
  const canon = m1.questions[0];
  m2.questions[0] = { ...canon, id: 'm2-01', mergedInto: 'm1-01', appearsIn: ['2024-25'], options: canon.options.map((o) => ({ ...o })) };
  canon.appearsIn = ['2023-24', '2024-25'];
  return { m1, m2, canon, merged: m2.questions[0] };
}
const withMocks = (m1, m2) => mkHR([mkSection('p-1-1', 'sub')], [m1, m2]);

test('a correct merge passes', () => {
  const { m1, m2 } = mergedPair();
  assert.deepStrictEqual(errorsOf(withMocks(m1, m2)), []);
});

test('mergedInto must reference a distinct, unmerged, same-type mock question', () => {
  let p = mergedPair();
  p.merged.mergedInto = 'm1-99';
  assert.ok(has(errorsOf(withMocks(p.m1, p.m2)), /m2-01.*mergedInto.*not a mock question/));
  p = mergedPair();
  p.merged.mergedInto = 'm2-01';
  assert.ok(has(errorsOf(withMocks(p.m1, p.m2)), /mergedInto.*itself/));
  p = mergedPair();
  p.m1.questions[0].mergedInto = 'm1-02';
  assert.ok(has(errorsOf(withMocks(p.m1, p.m2)), /mergedInto.*itself merged/));
  p = mergedPair();
  p.merged.mergedInto = 'm1-30';
  assert.ok(has(errorsOf(withMocks(p.m1, p.m2)), /mergedInto.*different type/));
  p = mergedPair();
  p.merged.mergedInto = 'p-1-1-pre-01';
  assert.ok(has(errorsOf(withMocks(p.m1, p.m2)), /mergedInto.*not a mock question/));
});

test('past questions need a sectionId and canonical ones a known section', () => {
  const { m1, m2 } = mergedPair();
  delete m2.questions[10].sectionId;
  m1.questions[11].sectionId = 'nowhere';
  const errs = errorsOf(withMocks(m1, m2));
  assert.ok(has(errs, /m2-11.*sectionId/));
  assert.ok(has(errs, /m1-12.*unknown section/));
});

test('the canonical appearsIn lists every year it was repeated', () => {
  const { m1, m2, canon } = mergedPair();
  canon.appearsIn = ['2023-24'];
  assert.ok(has(errorsOf(withMocks(m1, m2)), /m1-01.*appearsIn.*2024-25/));
});

test('merged repeats must keep the same correct option texts', () => {
  let p = mergedPair();
  p.merged.options = p.merged.options.slice().reverse().map((o, i) => ({ key: 'ABCD'[i], text: o.text }));
  p.merged.answer = ['D'];
  assert.deepStrictEqual(errorsOf(withMocks(p.m1, p.m2)), [], 'same text, reordered keys, still correct');
  p = mergedPair();
  p.merged.answer = ['B'];
  assert.ok(has(errorsOf(withMocks(p.m1, p.m2)), /m2-01.*correct.*differ.*m1-01/));
});

test('merged repeats with reworded options warn for a human check', () => {
  const { m1, m2, merged } = mergedPair();
  merged.options[2] = { key: 'C', text: 'something reworded' };
  const r = checkAll(withMocks(m1, m2));
  assert.ok(!has(r.errors, /correct.*differ/));
  assert.ok(r.warnings.some((w) => /m2-01/.test(w) && /m1-01/.test(w) && /wording/.test(w)));
});

test('past answers may cite pages outside the section range but inside a pdf', () => {
  const { m1, m2 } = mergedPair();
  assert.deepStrictEqual(errorsOf(withMocks(m1, m2)), []);
  m1.questions[3].source = { kind: 'material', pdf: 'p', pages: [101] };
  assert.ok(has(errorsOf(withMocks(m1, m2)), /m1-04.*page/));
});

test('past questions in an external course must be inferred', () => {
  const m1 = mkMock('m1', '2023-24', 'x-1-1');
  const m2 = mkMock('m2', '2024-25');
  assert.ok(has(errorsOf(withMocks(m1, m2)), /m1-01.*inferred/));
});

// --- duplicates -------------------------------------------------------------
test('identical wording is an error, reordered wording is a warning', () => {
  const s = mkSection('p-1-1', 'sub');
  const [a, b] = s.tests.pre;
  b.stem = a.stem;
  b.options = a.options.map((o) => ({ ...o }));
  let r = checkAll(mkHR([s]));
  assert.ok(has(r.errors, /duplicate question: p-1-1-pre-01 and p-1-1-pre-02/));

  const t = mkSection('p-1-1', 'sub');
  const [d, e] = t.tests.pre;
  e.stem = d.stem.split(' ').reverse().join(' ');
  e.options = d.options.map((o) => ({ ...o }));
  r = checkAll(mkHR([t]));
  assert.ok(!has(r.errors, /duplicate question/));
  assert.ok(r.warnings.some((w) => /p-1-1-pre-01/.test(w) && /p-1-1-pre-02/.test(w)));
});

// --- sample-review ------------------------------------------------------------
function sampleHR() {
  const order = ['single', 'multi', 'tf'];
  const types = [...Array(40).fill('single'), ...Array(40).fill('multi'), ...Array(20).fill('tf')];
  const qs = types.map((t, i) => mkQ(`p-1-1-pre-${num(i)}`, t));
  const past = Array.from({ length: 10 }, (_, i) => mkQ(`m1-${num(i)}`, order[i % 3], { sectionId: 'p-1-1', mergedInto: null }));
  const merged = mkQ('m1-99', 'single', { sectionId: 'p-1-1', mergedInto: 'm1-01' });
  return {
    data: {
      sections: {
        'p-1-1': { id: 'p-1-1', tests: { pre: qs, post: [], summative: [] } },
        'q-1': { id: 'q-1', tests: { pre: [mkQ('q-1-pre-01', 'tf')], post: [], summative: [] } },
      },
      mocks: { m1: { id: 'm1', questions: [...past, merged] } },
    },
  };
}

test('sample-review needs a seed, a count and a prefix', () => {
  const hr = sampleHR();
  assert.throws(() => sample(hr, 'p-1', 5, undefined), /Usage/);
  assert.throws(() => sample(hr, 'p-1', 5, 'abc'), /Usage/);
  assert.throws(() => sample(hr, 'p-1', 0, 1), /Usage/);
  assert.throws(() => sample(hr, '', 5, 1), /Usage/);
});

test('sample-review is seeded, prefix-scoped and includes past questions', () => {
  const hr = sampleHR();
  const a = sample(hr, 'p-1', 20, 7).map((q) => q.id);
  assert.deepStrictEqual(a, sample(hr, 'p-1', 20, 7).map((q) => q.id));
  assert.notDeepStrictEqual(a, sample(hr, 'p-1', 20, 8).map((q) => q.id));
  assert.strictEqual(new Set(a).size, 20);
  const everything = sample(hr, 'p-1', 1000, 3).map((q) => q.id);
  assert.strictEqual(everything.length, 110);
  assert.ok(everything.includes('m1-03'));
  assert.ok(!everything.includes('m1-99'), 'merged repeats are not sampled');
  assert.ok(!everything.includes('q-1-pre-01'));
});

test('sample-review picks reflect the type shares', () => {
  const hr = sampleHR();
  const pool = { single: 0, multi: 0, tf: 0 };
  sample(hr, 'p-1', 1000, 1).forEach((q) => { pool[q.type] += 1; });
  const tally = { single: 0, multi: 0, tf: 0 };
  let total = 0;
  for (let seed = 1; seed <= 40; seed++) {
    sample(hr, 'p-1', 10, seed).forEach((q) => { tally[q.type] += 1; total += 1; });
  }
  Object.keys(tally).forEach((t) => {
    assert.ok(tally[t] / total < 0.7, `${t} is ${tally[t] / total}`);
    assert.ok(Math.abs(tally[t] / total - pool[t] / 110) < 0.12, `${t} share ${tally[t] / total}`);
  });
});
