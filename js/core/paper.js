(function (root) {
  const TYPE_ORDER = ['single', 'multi', 'tf'];

  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffled(items, rand) {
    const a = [...items];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildPaper(questions, { seed, keepOrder = false }) {
    const rand = rng(seed);
    const ordered = keepOrder
      ? questions
      : TYPE_ORDER.flatMap((t) => shuffled(questions.filter((q) => q.type === t), rand));
    return ordered.map((q) => {
      const keys = q.options.map((o) => o.key);
      return { id: q.id, optionOrder: keepOrder || q.type === 'tf' ? keys : shuffled(keys, rand) };
    });
  }

  function label(i) {
    return 'ABCDEFGH'[i];
  }

  root.HR = root.HR || {};
  root.HR.paper = { buildPaper, label };
})(globalThis);
