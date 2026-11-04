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
