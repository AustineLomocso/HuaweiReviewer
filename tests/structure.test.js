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
      const checkChildren = (parent) => {
        const children = parent.subs || [];
        if (!children.length) return;
        assert.ok(children[0].pages[0] >= parent.pages[0], parent.id);
        children.forEach((s, i) => {
          assert.ok(s.pages[0] <= s.pages[1], s.id);
          assert.ok(s.pages[1] <= parent.pages[1], s.id);
          if (i > 0) assert.strictEqual(s.pages[0], children[i - 1].pages[1] + 1, s.id);
          checkChildren(s);
        });
        assert.strictEqual(children[children.length - 1].pages[1], parent.pages[1], parent.id);
      };
      checkChildren(ch);
    }
    assert.strictEqual(chapterEnd, course.pageCount, course.id);
  }
});

test('fundamentals keeps the six source lessons and their deeper instructional sections', () => {
  const course = data.structure.courses.find((c) => c.id === 'fundamentals1');
  assert.strictEqual(course.pdf, 'ai-fundamentals-1');
  assert.strictEqual(course.chapters.length, 6);
  assert.strictEqual(course.chapters[1].subs.length, 2);
  assert.strictEqual(course.chapters[2].subs.length, 3);
  assert.strictEqual(course.chapters[4].subs.length, 7);
  assert.strictEqual(course.chapters[5].subs.length, 4);
  assert.strictEqual(progress.findNode(data.structure, 'fundamentals1-5-3').path.length, 3);
});

test('Course 3 is marked as outside the course material', () => {
  const beyond = data.structure.courses.find((c) => c.id === 'beyond');
  assert.strictEqual(beyond.external, true);
  assert.strictEqual(beyond.chapters.length, 3);
  assert.strictEqual(beyond.chapters.flatMap((c) => c.subs).length, 11);
});
