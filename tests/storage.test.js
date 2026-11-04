const test = require('node:test');
const assert = require('node:assert');
require('../js/core/storage.js');
const { storage } = globalThis.HR;

function memoryBackend() {
  const m = {};
  return { getItem: (k) => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, raw: m };
}

test('starts empty and persists across instances', () => {
  const b = memoryBackend();
  const s = storage.createStore(b);
  assert.deepStrictEqual(s.get().attempts, {});
  s.update((st) => { st.read['a'] = 1; });
  assert.strictEqual(storage.createStore(b).get().read.a, 1);
});

test('keeps corrupt data aside and starts fresh', () => {
  const b = memoryBackend();
  b.setItem(storage.KEY, '{not json');
  const s = storage.createStore(b);
  assert.deepStrictEqual(s.get().attempts, {});
  assert.strictEqual(s.wasCorrupt, true);
  assert.strictEqual(b.getItem(storage.KEY + '.corrupt'), '{not json');
});

test('reports unavailable storage and keeps working in memory', () => {
  const s = storage.createStore({
    getItem() { throw new Error('blocked'); },
    setItem() { throw new Error('blocked'); },
  });
  assert.strictEqual(s.available, false);
  s.update((st) => { st.read.x = 1; });
  assert.strictEqual(s.get().read.x, 1);
});

test('reports a failed save', () => {
  const b = memoryBackend();
  const s = storage.createStore(b);
  b.setItem = () => { throw new Error('quota'); };
  s.update((st) => { st.read.y = 1; });
  assert.strictEqual(s.available, false);
});

test('backup round-trips', () => {
  const a = storage.createStore(memoryBackend());
  a.update((st) => { st.read.z = 5; });
  const b = storage.createStore(memoryBackend());
  b.importJSON(a.exportJSON());
  assert.strictEqual(b.get().read.z, 5);
});

test('rejects invalid backups and leaves data unchanged', () => {
  const s = storage.createStore(memoryBackend());
  s.update((st) => { st.read.keep = 1; });
  for (const bad of ['nope', '{}', JSON.stringify({ v: 99, read: {}, attempts: {}, inProgress: {}, retry: {} })]) {
    assert.throws(() => s.importJSON(bad));
  }
  assert.strictEqual(s.get().read.keep, 1);
});
