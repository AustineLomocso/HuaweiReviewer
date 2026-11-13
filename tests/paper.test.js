const test = require('node:test');
const assert = require('node:assert');
require('../js/core/paper.js');
const { paper } = globalThis.HR;

const opts = ['A', 'B', 'C', 'D'].map((key) => ({ key, text: key }));
const tfOpts = [{ key: 'T', text: 'True' }, { key: 'F', text: 'False' }];
const qs = [
  { id: 't1', type: 'tf', options: tfOpts },
  { id: 'm1', type: 'multi', options: opts },
  { id: 's1', type: 'single', options: opts },
  { id: 's2', type: 'single', options: opts },
  { id: 's3', type: 'single', options: opts },
];

test('same seed gives the same paper', () => {
  assert.deepStrictEqual(paper.buildPaper(qs, { seed: 7 }), paper.buildPaper(qs, { seed: 7 }));
});

test('some seed changes question or option order', () => {
  const base = JSON.stringify(paper.buildPaper(qs, { seed: 1 }));
  const changed = [2, 3, 4, 5, 6].some((seed) => JSON.stringify(paper.buildPaper(qs, { seed })) !== base);
  assert.ok(changed);
});

test('groups questions by type: single, multi, tf', () => {
  const types = paper.buildPaper(qs, { seed: 3 }).map((p) => p.id[0]);
  assert.deepStrictEqual(types, ['s', 's', 's', 'm', 't']);
});

test('keeps every option and never reorders True/False', () => {
  for (const p of paper.buildPaper(qs, { seed: 9 })) {
    if (p.id === 't1') assert.deepStrictEqual(p.optionOrder, ['T', 'F']);
    else assert.deepStrictEqual([...p.optionOrder].sort(), ['A', 'B', 'C', 'D']);
  }
});

test('keepOrder preserves question and option order', () => {
  const p = paper.buildPaper(qs, { seed: 9, keepOrder: true });
  assert.deepStrictEqual(p.map((x) => x.id), ['t1', 'm1', 's1', 's2', 's3']);
  assert.deepStrictEqual(p[1].optionOrder, ['A', 'B', 'C', 'D']);
});

test('labels follow display position', () => {
  assert.strictEqual(paper.label(0), 'A');
  assert.strictEqual(paper.label(3), 'D');
});

test('timer allows 90 seconds per question', () => {
  assert.strictEqual(paper.timeLimitMs(60), 90 * 60 * 1000);
  assert.strictEqual(paper.timeLimitMs(5), 7.5 * 60 * 1000);
});

test('new session records mode, order and deadline', () => {
  const s = paper.newSession(qs, { seed: 1, mode: 'exam', timed: true, keepOrder: false, now: 1000 });
  assert.strictEqual(s.mode, 'exam');
  assert.strictEqual(s.deadline, 1000 + 5 * 90000);
  assert.strictEqual(s.paper.length, 5);
  assert.deepStrictEqual(s.answers, {});
  assert.strictEqual(s.cur, 0);
});

test('untimed sessions have no deadline', () => {
  assert.strictEqual(paper.newSession(qs, { seed: 1, mode: 'exam', timed: false, now: 1 }).deadline, null);
});

test('practice sessions never have a deadline', () => {
  assert.strictEqual(paper.newSession(qs, { seed: 1, mode: 'practice', timed: true, now: 1 }).deadline, null);
});

require('../js/core/scoring.js');

test('question and option shuffles are independent', () => {
  for (let seed = 1; seed < 20; seed++) {
    const kept = paper.buildPaper(qs, { seed, shuffleQuestions: false, shuffleOptions: true });
    assert.deepStrictEqual(kept.map((x) => x.id), ['t1', 'm1', 's1', 's2', 's3']);
    const fixedOptions = paper.buildPaper(qs, { seed, shuffleQuestions: true, shuffleOptions: false });
    for (const p of fixedOptions) if (p.id !== 't1') assert.deepStrictEqual(p.optionOrder, ['A', 'B', 'C', 'D']);
  }
  const anyOptionMoved = [1, 2, 3, 4, 5].some((seed) =>
    paper.buildPaper(qs, { seed, shuffleQuestions: false, shuffleOptions: true })
      .some((p) => p.id !== 't1' && p.optionOrder.join('') !== 'ABCD'));
  assert.ok(anyOptionMoved);
});

test('a custom time limit sets the deadline, and null turns the timer off', () => {
  assert.strictEqual(paper.newSession(qs, { seed: 1, mode: 'exam', timeLimitMs: 60000, now: 10 }).deadline, 60010);
  assert.strictEqual(paper.newSession(qs, { seed: 1, mode: 'exam', timeLimitMs: null, now: 10 }).deadline, null);
  assert.strictEqual(paper.newSession(qs, { seed: 1, mode: 'practice', timeLimitMs: 60000, now: 10 }).deadline, null);
});

test('new sessions record layout, source, auto-advance and partial choices', () => {
  const s = paper.newSession(qs, {
    seed: 1, mode: 'exam', now: 1, layout: 'page', showSource: false, autoAdvance: true,
    partial: true, filters: { from: 1, to: 2 },
  });
  assert.deepStrictEqual([s.layout, s.showSource, s.autoAdvance, s.partial], ['page', false, true, true]);
  assert.deepStrictEqual(s.filters, { from: 1, to: 2 });
  const d = paper.newSession(qs, { seed: 1, mode: 'exam', now: 1 });
  assert.deepStrictEqual([d.layout, d.showSource, d.autoAdvance, d.partial], ['single', true, false, false]);
});

const graded = [
  { id: 'a', type: 'single', number: 1, options: opts, answer: ['A'] },
  { id: 'b', type: 'multi', number: 2, options: opts, answer: ['A', 'B'] },
  { id: 'c', type: 'tf', number: 3, options: tfOpts, answer: ['T'] },
  { id: 'd', type: 'single', number: 5, options: opts, answer: ['C'] },
  { id: 'e', type: 'single', number: 6, options: opts },
];

test('subset filters by original number range and type', () => {
  assert.deepStrictEqual(paper.selectSubset(graded, { from: 2, to: 5 }).questions.map((q) => q.id), ['b', 'c', 'd']);
  assert.deepStrictEqual(paper.selectSubset(graded, { types: ['single'] }).questions.map((q) => q.id), ['a', 'd', 'e']);
  assert.strictEqual(paper.selectSubset(graded, {}).partial, false);
  assert.strictEqual(paper.selectSubset(graded, { to: 3 }).partial, true);
});

test('questions without a printed number use their position', () => {
  const plain = graded.map(({ number, ...q }) => q);
  assert.deepStrictEqual(paper.selectSubset(plain, { from: 4, to: 5 }).questions.map((q) => q.id), ['d', 'e']);
});

test('random count is deterministic by seed and keeps original order', () => {
  const one = paper.selectSubset(graded, { count: 3, seed: 4 }).questions.map((q) => q.id);
  assert.strictEqual(one.length, 3);
  assert.deepStrictEqual(one, paper.selectSubset(graded, { count: 3, seed: 4 }).questions.map((q) => q.id));
  assert.deepStrictEqual(one, graded.map((q) => q.id).filter((id) => one.includes(id)));
});

test('status filters use the latest answer and Uncertain mark from earlier attempts', () => {
  const attempts = [
    { paper: [{ id: 'a' }, { id: 'b' }, { id: 'c' }], answers: { a: ['B'], b: ['A', 'B'] }, uncertain: { b: true } },
    { paper: [{ id: 'a' }, { id: 'b' }, { id: 'e' }], answers: { a: ['A'], e: ['A'] }, uncertain: {} },
  ];
  // a was wrong, then right; b was right and unanswered the second time; e is ungraded so never "wrong".
  assert.deepStrictEqual(paper.selectSubset(graded, { status: 'wrong' }, attempts).questions.map((q) => q.id), []);
  attempts.push({ paper: [{ id: 'd' }], answers: { d: ['A'] }, uncertain: { d: true } });
  assert.deepStrictEqual(paper.selectSubset(graded, { status: 'wrong' }, attempts).questions.map((q) => q.id), ['d']);
  assert.deepStrictEqual(paper.selectSubset(graded, { status: 'uncertain' }, attempts).questions.map((q) => q.id), ['d']);
  assert.deepStrictEqual(paper.selectSubset(graded, { status: 'unanswered' }, attempts).questions.map((q) => q.id), ['c']);
});
