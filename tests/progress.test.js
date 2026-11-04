const test = require('node:test');
const assert = require('node:assert');
require('../js/core/scoring.js');
require('../js/core/progress.js');
const { progress } = globalThis.HR;

const structure = {
  courses: [{
    id: 'c', title: 'C',
    chapters: [{
      id: 'c-1', num: '1', title: 'One',
      subs: [{ id: 'c-1-1', num: '1.1', title: 'A' }, { id: 'c-1-2', num: '1.2', title: 'B' }],
    }],
  }],
};
const entry = (past) => ({ notes: true, pre: 5, post: 5, summative: 10, past });
const manifest = { c: entry(1), 'c-1': entry(1), 'c-1-1': entry(1), 'c-1-2': entry(0) };
const attempt = (pct, at, mode = 'exam') => ({ pct, at, mode, passed: pct >= 60 });
const blank = () => ({ read: {}, attempts: {}, inProgress: {}, retry: {} });

function finishSub(st, id, hasPast) {
  st.read[id] = 1;
  for (const k of ['pre', 'post', 'summative']) st.attempts[`${id}:${k}`] = [attempt(70, 1)];
  if (hasPast) st.attempts[`${id}:past`] = [attempt(30, 1, 'practice')];
}

test('findNode returns level and path', () => {
  assert.strictEqual(progress.findNode(structure, 'c').level, 'course');
  assert.strictEqual(progress.findNode(structure, 'c-1').level, 'chapter');
  const sub = progress.findNode(structure, 'c-1-2');
  assert.strictEqual(sub.level, 'sub');
  assert.deepStrictEqual(sub.path.map((n) => n.id), ['c', 'c-1', 'c-1-2']);
  assert.strictEqual(progress.findNode(structure, 'nope'), null);
});

test('descendants include the node itself', () => {
  assert.deepStrictEqual(progress.descendantIds(structure, 'c-1'), ['c-1', 'c-1-1', 'c-1-2']);
});

test('a sub without past questions does not require a past set', () => {
  const st = blank();
  finishSub(st, 'c-1-2', false);
  assert.strictEqual(progress.ownComplete('c-1-2', manifest, st), true);
});

test('practice attempts complete a past set, attempts need not pass', () => {
  const st = blank();
  finishSub(st, 'c-1-1', true);
  assert.strictEqual(progress.ownComplete('c-1-1', manifest, st), true);
});

test('missing notes read keeps a sub incomplete', () => {
  const st = blank();
  finishSub(st, 'c-1-2', false);
  delete st.read['c-1-2'];
  assert.strictEqual(progress.ownComplete('c-1-2', manifest, st), false);
});

test('chapter needs its own items and all subs', () => {
  const st = blank();
  finishSub(st, 'c-1-1', true);
  finishSub(st, 'c-1-2', false);
  const chapter = structure.courses[0].chapters[0];
  assert.strictEqual(progress.nodeStats(chapter, manifest, st).complete, false);
  finishSub(st, 'c-1', true);
  const s = progress.nodeStats(chapter, manifest, st);
  assert.strictEqual(s.complete, true);
  assert.strictEqual(s.pct, 100);
});

test('testSummary ignores practice for best and keeps passed', () => {
  const st = blank();
  st.attempts['x:past'] = [attempt(100, 1, 'practice'), attempt(80, 2), attempt(40, 3)];
  assert.deepStrictEqual(progress.testSummary('x:past', st), { attempts: 3, best: 80, latest: 40, passed: true });
});

test('gain is best post minus first pre', () => {
  const st = blank();
  st.attempts['x:pre'] = [attempt(40, 1), attempt(90, 2)];
  st.attempts['x:post'] = [attempt(60, 3), attempt(75, 4), attempt(70, 5)];
  assert.strictEqual(progress.gain('x', st), 35);
  assert.strictEqual(progress.gain('y', st), null);
});

test('weak topics use the most recent exam attempt in a section', () => {
  const st = blank();
  st.attempts['c-1-1:pre'] = [attempt(30, 1)];
  st.attempts['c-1-1:post'] = [attempt(80, 2)];
  st.attempts['c-1-2:pre'] = [attempt(80, 1)];
  st.attempts['c-1-2:post'] = [attempt(50, 2)];
  st.attempts['c-1:past'] = [attempt(10, 5, 'practice')];
  assert.deepStrictEqual(progress.weakTopics(structure, st).map((w) => w.id), ['c-1-2']);
});

test('retry adds wrong and uncertain, removes clean correct', () => {
  const retry = { keep: { at: 1 }, fixed: { at: 1 } };
  const qs = [
    { id: 'fixed', type: 'tf', answer: ['T'] },
    { id: 'wrong', type: 'tf', answer: ['T'] },
    { id: 'unsure', type: 'tf', answer: ['T'] },
  ];
  progress.applyRetry(retry, qs, { fixed: ['T'], wrong: ['F'], unsure: ['T'] }, { unsure: true }, 9);
  assert.deepStrictEqual(Object.keys(retry).sort(), ['keep', 'unsure', 'wrong']);
});

test('a chapter with an unwritten subchapter is not complete', () => {
  const st = blank();
  finishSub(st, 'c-1-1', true);
  finishSub(st, 'c-1', true);
  const partial = { 'c-1': entry(1), 'c-1-1': entry(1) };
  const s = progress.nodeStats(structure.courses[0].chapters[0], partial, st);
  assert.strictEqual(s.complete, false);
  assert.ok(s.pct < 100);
});
