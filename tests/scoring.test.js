const test = require('node:test');
const assert = require('node:assert');
require('../js/core/scoring.js');
const { scoring } = globalThis.HR;

const single = { id: 's', type: 'single', answer: ['B'] };
const multi = { id: 'm', type: 'multi', answer: ['A', 'C'] };
const tf = { id: 't', type: 'tf', answer: ['F'] };

test('points match the mock exams', () => {
  assert.deepStrictEqual(scoring.POINTS, { single: 16, multi: 18, tf: 16 });
});

test('a 25/20/15 exam totals 1000', () => {
  const qs = [
    ...Array(25).fill(single), ...Array(20).fill(multi), ...Array(15).fill(tf),
  ].map((q, i) => ({ ...q, id: 'q' + i }));
  assert.strictEqual(scoring.scoreAttempt(qs, {}).total, 1000);
});

test('multi is all-or-nothing and order-independent', () => {
  assert.ok(scoring.isCorrect(multi, ['C', 'A']));
  assert.ok(!scoring.isCorrect(multi, ['A']));
  assert.ok(!scoring.isCorrect(multi, ['A', 'B', 'C']));
});

test('unanswered is wrong', () => {
  assert.ok(!scoring.isCorrect(single, []));
  assert.ok(!scoring.isCorrect(single, undefined));
});

test('scoreAttempt reports percent, pass and by-type breakdown', () => {
  const r = scoring.scoreAttempt([single, multi, tf], { s: ['B'], m: ['A'], t: ['F'] });
  assert.strictEqual(r.earned, 32);
  assert.strictEqual(r.total, 50);
  assert.strictEqual(r.pct, 64);
  assert.strictEqual(r.passed, true);
  assert.deepStrictEqual(r.byType.multi, { correct: 0, count: 1, earned: 0, total: 18 });
  assert.deepStrictEqual(r.correctIds, ['s', 't']);
});

test('exactly 60 percent passes', () => {
  const qs = Array.from({ length: 5 }, (_, i) => ({ id: 'q' + i, type: 'tf', answer: ['T'] }));
  const r = scoring.scoreAttempt(qs, { q0: ['T'], q1: ['T'], q2: ['T'] });
  assert.strictEqual(r.pct, 60);
  assert.strictEqual(r.passed, true);
});

test('a score just under 60 percent fails even if it rounds to 60', () => {
  const tf = Array.from({ length: 21 }, (_, i) => ({ id: 't' + i, type: 'tf', answer: ['T'] }));
  const multi = Array.from({ length: 26 }, (_, i) => ({ id: 'm' + i, type: 'multi', answer: ['A', 'B'] }));
  const answers = { t0: ['T'], t1: ['T'] };
  for (let i = 0; i < 25; i++) answers['m' + i] = ['A', 'B'];
  const r = scoring.scoreAttempt([...tf, ...multi], answers);
  assert.strictEqual(r.earned, 482);
  assert.strictEqual(r.total, 804);
  assert.strictEqual(r.pct, 60);
  assert.strictEqual(r.passed, false);
});

test('itemStatus is correct or incorrect, and unanswered counts as incorrect', () => {
  assert.strictEqual(scoring.itemStatus(single, ['B']), 'correct');
  assert.strictEqual(scoring.itemStatus(single, ['A']), 'incorrect');
  assert.strictEqual(scoring.itemStatus(single, []), 'incorrect');
  assert.strictEqual(scoring.itemStatus(single, undefined), 'incorrect');
  assert.strictEqual(scoring.itemStatus(multi, ['C', 'A']), 'correct');
  assert.strictEqual(scoring.itemStatus(multi, ['A']), 'incorrect');
});

test('single-answer and true/false questions reveal on selection, multiple-answer ones do not', () => {
  assert.ok(scoring.revealsOnSelect(single));
  assert.ok(scoring.revealsOnSelect(tf));
  assert.ok(!scoring.revealsOnSelect(multi));
});

test('revealedStatus is only set in Practice, once the question is revealed', () => {
  assert.strictEqual(scoring.revealedStatus(single, ['B'], 'practice', true), 'correct');
  assert.strictEqual(scoring.revealedStatus(single, ['A'], 'practice', true), 'incorrect');
  assert.strictEqual(scoring.revealedStatus(single, ['B'], 'practice', false), null);
  assert.strictEqual(scoring.revealedStatus(single, ['B'], 'practice', undefined), null);
  assert.strictEqual(scoring.revealedStatus(single, ['B'], 'exam', true), null);
});

test('navLabel names the question number and its status', () => {
  assert.strictEqual(scoring.navLabel(3, 'correct'), 'Question 3, correct');
  assert.strictEqual(scoring.navLabel(12, 'incorrect'), 'Question 12, incorrect');
});
