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

test('two tabs do not overwrite each other', () => {
  const b = memoryBackend();
  const tab1 = storage.createStore(b);
  const tab2 = storage.createStore(b);
  tab1.update((st) => { st.read.ch1 = 1; });
  tab2.update((st) => { st.read.ch2 = 1; });
  const saved = JSON.parse(b.getItem(storage.KEY));
  assert.strictEqual(saved.read.ch1, 1);
  assert.strictEqual(saved.read.ch2, 1);
});

test('state keeps its identity across updates in a single tab', () => {
  const s = storage.createStore(memoryBackend());
  const before = s.get();
  s.update((st) => { st.read.a = 1; });
  s.update((st) => { st.read.b = 1; });
  assert.strictEqual(s.get(), before);
});

test('rejects backups with array-shaped sections', () => {
  const s = storage.createStore(memoryBackend());
  const bad = JSON.stringify({ v: storage.VERSION, read: [], attempts: {}, inProgress: {}, retry: {} });
  assert.throws(() => s.importJSON(bad));
});

test('never overwrites corrupt data it could not set aside', () => {
  const b = memoryBackend();
  b.setItem(storage.KEY, '{real but truncated');
  const realSet = b.setItem;
  b.setItem = (k, v) => { if (k.endsWith('.corrupt')) throw new Error('quota'); realSet(k, v); };
  const s = storage.createStore(b);
  assert.strictEqual(s.available, false);
  s.update((st) => { st.read.n = 1; });
  assert.strictEqual(b.getItem(storage.KEY), '{real but truncated');
});

test('detects storage that reads but cannot write at startup', () => {
  const b = memoryBackend();
  b.setItem = () => { throw new Error('blocked'); };
  assert.strictEqual(storage.createStore(b).available, false);
});

test('available recovers after a later successful save', () => {
  const b = memoryBackend();
  const s = storage.createStore(b);
  const realSet = b.setItem;
  b.setItem = () => { throw new Error('quota'); };
  s.update((st) => { st.read.a = 1; });
  assert.strictEqual(s.available, false);
  b.setItem = realSet;
  s.update((st) => { st.read.b = 1; });
  assert.strictEqual(s.available, true);
  assert.strictEqual(JSON.parse(b.getItem(storage.KEY)).read.a, 1);
});

test('a restore that cannot be saved reports failure and keeps current data', () => {
  const b = memoryBackend();
  const s = storage.createStore(b);
  s.update((st) => { st.read.old = 1; });
  const backup = JSON.stringify({ v: storage.VERSION, read: { imported: 1 }, attempts: {}, inProgress: {}, retry: {} });
  b.setItem = () => { throw new Error('quota'); };
  assert.throws(() => s.importJSON(backup));
  assert.strictEqual(s.get().read.old, 1);
  assert.strictEqual(s.get().read.imported, undefined);
});

test('sync picks up another tab without writing', () => {
  const b = memoryBackend();
  const tab1 = storage.createStore(b);
  const tab2 = storage.createStore(b);
  tab1.update((st) => { st.read.fromTab1 = 1; });
  assert.strictEqual(tab2.get().read.fromTab1, undefined);
  tab2.sync();
  assert.strictEqual(tab2.get().read.fromTab1, 1);
});

test('validateJSON throws the import messages and returns the parsed backup', () => {
  const s = storage.createStore(memoryBackend());
  assert.throws(() => s.validateJSON('nope'), /not valid JSON/);
  assert.throws(() => s.validateJSON('{}'), /not a compatible reviewer backup/);
  const good = JSON.stringify({ v: storage.VERSION, read: { a: 1 }, attempts: {}, inProgress: {}, retry: {} });
  assert.strictEqual(s.validateJSON(good).read.a, 1);
  assert.throws(() => s.importJSON('nope'), /not valid JSON/);
});

test('onSaveFailure is called when a save fails', () => {
  const b = memoryBackend();
  const s = storage.createStore(b);
  let calls = 0;
  s.onSaveFailure = () => { calls += 1; };
  s.update((st) => { st.read.ok = 1; });
  assert.strictEqual(calls, 0);
  b.setItem = () => { throw new Error('quota'); };
  s.update((st) => { st.read.bad = 1; });
  assert.strictEqual(calls, 1);
  assert.strictEqual(s.available, false);
});
