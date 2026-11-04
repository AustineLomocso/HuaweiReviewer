(function (root) {
  const KEY = 'huawei-reviewer';
  const VERSION = 1;

  function fresh() {
    return { v: VERSION, read: {}, attempts: {}, inProgress: {}, retry: {}, last: null };
  }

  function isValid(o) {
    return !!o && o.v === VERSION &&
      ['read', 'attempts', 'inProgress', 'retry'].every((k) => o[k] && typeof o[k] === 'object');
  }

  function createStore(backend) {
    const store = { available: true, wasCorrupt: false };
    let state = fresh();
    try {
      const raw = backend.getItem(KEY);
      if (raw !== null) {
        let parsed = null;
        try { parsed = JSON.parse(raw); } catch (e) { parsed = null; }
        if (isValid(parsed)) {
          state = parsed;
        } else {
          store.wasCorrupt = true;
          backend.setItem(KEY + '.corrupt', raw);
        }
      }
    } catch (e) {
      store.available = false;
    }

    function save() {
      try {
        backend.setItem(KEY, JSON.stringify(state));
      } catch (e) {
        store.available = false;
      }
    }

    store.get = () => state;
    store.update = (fn) => { fn(state); save(); };
    store.exportJSON = () => JSON.stringify(state, null, 2);
    store.importJSON = (text) => {
      let parsed;
      try { parsed = JSON.parse(text); } catch (e) { throw new Error('This file is not valid JSON.'); }
      if (!isValid(parsed)) throw new Error('This file is not a compatible reviewer backup.');
      state = parsed;
      save();
    };
    return store;
  }

  root.HR = root.HR || {};
  root.HR.storage = { KEY, VERSION, createStore };
})(globalThis);
