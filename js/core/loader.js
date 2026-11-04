(function (root) {
  root.HR = root.HR || {};
  const HR = root.HR;
  const data = { structure: null, manifest: {}, sections: {}, mocks: {} };
  HR.data = data;
  HR.registerStructure = (s) => { data.structure = s; };
  HR.registerManifest = (m) => { data.manifest = m; };
  HR.registerSection = (s) => { data.sections[s.id] = s; };
  HR.registerMock = (m) => { data.mocks[m.id] = m; };

  const scripts = {};
  function loadScript(src) {
    if (!scripts[src]) {
      scripts[src] = new Promise((resolve, reject) => {
        const el = document.createElement('script');
        el.src = src;
        el.onload = resolve;
        el.onerror = () => { delete scripts[src]; reject(new Error('Could not load ' + src)); };
        document.head.appendChild(el);
      });
    }
    return scripts[src];
  }
  const loadSection = (id) => loadScript(`data/sections/${id}.js`);
  const loadMocks = () => Promise.all(data.structure.mocks.map((m) => loadScript(`data/past/${m.id}.js`)));

  const KIND_LABEL = { pre: 'Pre-Test', post: 'Post-Test', summative: 'Summative Test', past: 'Past Exam Set' };

  function parseKey(key) {
    const i = key.lastIndexOf(':');
    return { id: key.slice(0, i), kind: key.slice(i + 1) };
  }

  function sectionOfQid(qid) {
    const m = /^(.+)-(pre|post|summative)-\d+$/.exec(qid);
    return m ? m[1] : null;
  }

  function findQuestion(qid) {
    const sectionId = sectionOfQid(qid);
    if (sectionId) {
      const s = data.sections[sectionId];
      if (!s) return null;
      const kind = /-(pre|post|summative)-\d+$/.exec(qid)[1];
      return (s.tests[kind] || []).find((q) => q.id === qid) || null;
    }
    for (const m of Object.values(data.mocks)) {
      const q = m.questions.find((x) => x.id === qid);
      if (q) return q;
    }
    return null;
  }

  function resolve(key, retry) {
    const { id, kind } = parseKey(key);
    if (kind === 'full') return data.mocks[id] ? data.mocks[id].questions : [];
    if (key === 'retry:all') return Object.keys(retry).map(findQuestion).filter(Boolean);
    if (kind === 'past') {
      const ids = new Set(HR.progress.descendantIds(data.structure, id));
      return Object.values(data.mocks)
        .flatMap((m) => m.questions)
        .filter((q) => !q.mergedInto && ids.has(q.sectionId));
    }
    const s = data.sections[id];
    return s ? s.tests[kind] || [] : [];
  }

  async function ensureLoaded(key, retry) {
    const { id, kind } = parseKey(key);
    if (key === 'retry:all') {
      const ids = [...new Set(Object.keys(retry).map(sectionOfQid).filter(Boolean))];
      await Promise.all(ids.map(loadSection));
      await loadMocks();
    } else if (kind === 'past' || kind === 'full') {
      await loadMocks();
    } else {
      await loadSection(id);
    }
  }

  function title(key) {
    if (key === 'retry:all') return 'Retry Set';
    const { id, kind } = parseKey(key);
    if (kind === 'full') return data.structure.mocks.find((m) => m.id === id).title;
    const { node } = HR.progress.findNode(data.structure, id);
    return node.num ? `${KIND_LABEL[kind]} ${node.num}` : `${KIND_LABEL[kind]}: ${node.title}`;
  }

  const allowsPractice = (key) => ['past', 'full', 'all'].includes(parseKey(key).kind);

  HR.loader = { loadScript, loadSection, loadMocks };
  HR.tests = { parseKey, sectionOfQid, findQuestion, resolve, ensureLoaded, title, allowsPractice, KIND_LABEL };
})(globalThis);
