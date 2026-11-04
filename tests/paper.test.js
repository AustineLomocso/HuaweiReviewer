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
