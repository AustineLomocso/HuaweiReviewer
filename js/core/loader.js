(function (root) {
  root.HR = root.HR || {};
  const HR = root.HR;
  const data = { structure: null, manifest: {}, sections: {}, mocks: {} };
  HR.data = data;
  // True when the app is opened from local files (or under Node), where the git-ignored source PDFs and
  // exam screenshots exist. On the published website those files are absent, so their links are hidden.
  HR.isLocal = () => !root.location || root.location.protocol === 'file:';
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
  const loadSection = (id) => Promise.all([
    loadScript('data/source-inventory.js'),
    loadScript(`data/sections/${id}.js`),
  ]);
  const loadMocks = () => Promise.all([
    loadScript('data/exam-inventory.js'),
    loadScript('data/source-inventory.js'),
    ...data.structure.mocks.map((m) => loadScript(`data/past/${m.id}.js`)),
  ]);
  const loadInventory = () => Promise.all([
    loadScript('data/source-inventory.js'),
    loadScript('data/exam-inventory.js'),
  ]);

  function mappedLessonIds(question) {
    const secondary = Array.isArray(question.secondarySectionIds) ? question.secondarySectionIds : [];
    return [...new Set([question.sectionId, ...secondary].filter(Boolean))];
  }

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
    return allCaptures().find((q) => q.id === qid && (q.inApp || q.status === 'verified')) || null;
  }

  const allCaptures = () => (data.examInventory?.papers || []).flatMap((paper) => paper.captures);
  const verifiedNationals = () => allCaptures().filter((q) => q.status === 'verified');
  const nationalsPaper = (id) => (data.examInventory?.papers || []).find((p) => p.id === id) || null;
  const isNationals = (id) => !!(data.structure && (data.structure.nationals || []).some((n) => n.id === id));

  // Review progress of one Nationals paper. It enters the test engine only once every available question is reviewed.
  function nationalsStatus(id) {
    const paper = nationalsPaper(id);
    if (!paper) return { reviewed: 0, total: 0, ready: false };
    const numbers = [...new Set(paper.captures.map((c) => c.number))];
    const reviewed = numbers.filter((n) => paper.captures.some((c) => c.number === n && c.inApp)).length;
    return { reviewed, total: numbers.length, ready: numbers.length > 0 && reviewed === numbers.length };
  }

  // One question per printed number, in printed order. A repeated capture adds only its screenshot.
  function nationalsQuestions(id) {
    const paper = nationalsPaper(id);
    if (!paper || !nationalsStatus(id).ready) return [];
    const seen = new Set();
    return [...paper.captures].sort((a, b) => a.number - b.number).filter((c) => {
      if (!c.inApp || seen.has(c.number)) return false;
      seen.add(c.number);
      return true;
    });
  }

  // Every screenshot of a Nationals question, including repeated captures of the same number.
  // Screenshots exist only on the owner's computer, so they are offered only when the app runs from local files.
  function sourceImages(q) {
    if (!q.image || !HR.isLocal()) return [];
    const paper = (data.examInventory?.papers || []).find((p) => p.captures.includes(q));
    return paper ? paper.captures.filter((c) => c.number === q.number).map((c) => c.image) : [q.image];
  }

  function resolve(key, retry) {
    const { id, kind } = parseKey(key);
    if (kind === 'full') {
      if (isNationals(id)) return nationalsQuestions(id);
      return data.mocks[id] ? data.mocks[id].questions : [];
    }
    if (key === 'retry:all') return Object.keys(retry).map(findQuestion).filter(Boolean);
    if (kind === 'past') {
      const ids = new Set(HR.progress.descendantIds(data.structure, id));
      return [...Object.values(data.mocks).flatMap((m) => m.questions), ...verifiedNationals()]
        .filter((q) => !q.mergedInto && mappedLessonIds(q).some((lessonId) => ids.has(lessonId)));
    }
    const s = data.sections[id];
    return s ? s.tests[kind] || [] : [];
  }

  async function ensureLoaded(key, retry) {
    const { id, kind } = parseKey(key);
    if (key === 'retry:all') {
      const ids = [...new Set(Object.keys(retry).map(sectionOfQid).filter(Boolean))];
      // A stale ID must not block the rest of the retry set, so count failures instead of throwing.
      const settled = await Promise.allSettled(ids.map(loadSection));
      await loadMocks();
      return { failed: settled.filter((r) => r.status === 'rejected').length };
    }
    if (kind === 'past' || kind === 'full') await loadMocks();
    else await loadSection(id);
    return { failed: 0 };
  }

  function title(key) {
    if (key === 'retry:all') return 'Retry Set';
    const { id, kind } = parseKey(key);
    if (kind === 'full') return [...data.structure.mocks, ...(data.structure.nationals || [])].find((m) => m.id === id).title;
    const { node } = HR.progress.findNode(data.structure, id);
    return node.num ? `${KIND_LABEL[kind]} ${node.num}` : `${KIND_LABEL[kind]}: ${node.title}`;
  }

  const allowsPractice = (key) => ['past', 'full', 'all'].includes(parseKey(key).kind);

  HR.loader = { loadScript, loadSection, loadMocks, loadInventory };
  HR.tests = {
    parseKey, sectionOfQid, findQuestion, resolve, ensureLoaded, title, allowsPractice, mappedLessonIds, KIND_LABEL,
    isNationals, nationalsStatus, nationalsQuestions, sourceImages,
  };
})(globalThis);
