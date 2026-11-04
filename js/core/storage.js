(function (root) {
  const KEY = 'huawei-reviewer';
  const VERSION = 1;

  function fresh() {
    return { v: VERSION, read: {}, attempts: {}, inProgress: {}, retry: {}, last: null };
  }

  function isValid(o) {
    return !!o && o.v === VERSION &&
      ['read', 'attempts', 'inProgress', 'retry'].every((k) => o[k] && typeof o[k] === 'object' && !Array.isArray(o[k]));
  }

  function createStore(backend) {
    const store = { available: true, wasCorrupt: false };
    let state = fresh();
    let lastRaw = null;
    let holdsUnsavedCorruptData = false;

    function parseValid(raw) {
      try {
        const parsed = JSON.parse(raw);
        return isValid(parsed) ? parsed : null;
      } catch (e) {
        return null;
      }
    }

    try {
      const raw = backend.getItem(KEY);
      lastRaw = raw;
      if (raw !== null) {
        const parsed = parseValid(raw);
        if (parsed) {
          state = parsed;
        } else {
          store.wasCorrupt = true;
          try {
            backend.setItem(KEY + '.corrupt', raw);
          } catch (e) {
            holdsUnsavedCorruptData = true;
            store.available = false;
          }
        }
      }
      if (!holdsUnsavedCorruptData) backend.setItem(KEY + '.probe', '1');
    } catch (e) {
      store.available = false;
    }

    // Picks up changes from another tab. Same-tab updates keep the same object.
    function syncFromOtherTabs() {
      try {
        const raw = backend.getItem(KEY);
        if (raw === lastRaw) return;
        const parsed = parseValid(raw);
        if (parsed) {
          state = parsed;
          lastRaw = raw;
        }
      } catch (e) {
        // Storage is unreadable, so keep working in memory.
      }
    }

    function failed() {
      if (typeof store.onSaveFailure === 'function') {
        try { store.onSaveFailure(); } catch (e) { /* A broken callback must not break saving. */ }
      }
      return false;
    }

    function save() {
      if (holdsUnsavedCorruptData) return failed();
      try {
        const json = JSON.stringify(state);
        backend.setItem(KEY, json);
        lastRaw = json;
        store.available = true;
        return true;
      } catch (e) {
        store.available = false;
        return failed();
      }
    }

    function validateJSON(text) {
      let parsed;
      try { parsed = JSON.parse(text); } catch (e) { throw new Error('This file is not valid JSON.'); }
      if (!isValid(parsed)) throw new Error('This file is not a compatible reviewer backup.');
      return parsed;
    }

    store.sync = syncFromOtherTabs;
    store.onSaveFailure = null;
    store.validateJSON = validateJSON;
    store.get = () => state;
    store.update = (fn) => {
      syncFromOtherTabs();
      fn(state);
      save();
    };
    store.exportJSON = () => JSON.stringify(state, null, 2);
    store.importJSON = (text) => {
      const parsed = validateJSON(text);
      const previous = state;
      const previousHold = holdsUnsavedCorruptData;
      state = parsed;
      holdsUnsavedCorruptData = false;
      if (!save()) {
        state = previous;
        holdsUnsavedCorruptData = previousHold;
        throw new Error('The backup could not be saved because browser storage is unavailable or full.');
      }
    };
    return store;
  }

  root.HR = root.HR || {};
  root.HR.storage = { KEY, VERSION, createStore };
})(globalThis);
