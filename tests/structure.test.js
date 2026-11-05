const test = require('node:test');
const assert = require('node:assert');
require('../js/core/scoring.js');
require('../js/core/progress.js');
require('../js/core/loader.js');
require('../data/structure.js');
const { progress, data } = globalThis.HR;

test('has the expected counts', () => {
  const [ai, cloud] = data.structure.courses;
  assert.strictEqual(ai.chapters.length, 6);
  assert.strictEqual(cloud.chapters.length, 6);
  assert.strictEqual(ai.chapters.flatMap((c) => c.subs).length, 20);
  assert.strictEqual(cloud.chapters.flatMap((c) => c.subs).length, 30);
  assert.strictEqual(data.structure.mocks.length, 3);
});

test('IDs are unique', () => {
  const ids = progress.allNodes(data.structure).map((x) => x.node.id);
  assert.strictEqual(new Set(ids).size, ids.length);
});

test('page ranges are ordered, contiguous and inside the PDF', () => {
  for (const course of data.structure.courses.filter((c) => c.pdf)) {
    let chapterEnd = 0;
    for (const ch of course.chapters) {
      assert.strictEqual(ch.pages[0], chapterEnd + 1, ch.id);
      chapterEnd = ch.pages[1];
      assert.ok(ch.subs[0].pages[0] >= ch.pages[0], ch.id);
      ch.subs.forEach((s, i) => {
        assert.ok(s.pages[0] <= s.pages[1], s.id);
        if (i > 0) assert.strictEqual(s.pages[0], ch.subs[i - 1].pages[1] + 1, s.id);
      });
      assert.strictEqual(ch.subs[ch.subs.length - 1].pages[1], ch.pages[1], ch.id);
    }
    assert.strictEqual(chapterEnd, course.pageCount, course.id);
  }
});

test('Course 3 is marked as outside the course material', () => {
  const beyond = data.structure.courses.find((c) => c.id === 'beyond');
  assert.strictEqual(beyond.external, true);
  assert.strictEqual(beyond.chapters.length, 3);
  assert.strictEqual(beyond.chapters.flatMap((c) => c.subs).length, 11);
});
