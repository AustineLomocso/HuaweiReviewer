(function () {
  const opts = (a, b, c, d) => [['A', a], ['B', b], ['C', c], ['D', d]].map(([key, text]) => ({ key, text }));
  const tf = [{ key: 'T', text: 'True' }, { key: 'F', text: 'False' }];
  const src = { kind: 'material', pdf: 'cloud', pages: [61] };
  const q = (id, type, stem, options, answer) => ({ id, type, stem, options, answer, explanation: 'FIXTURE explanation.', source: src });
  const set = (kind, n) => Array.from({ length: n }, (_, i) => {
    const id = `cloud-2-1-${kind}-${String(i + 1).padStart(2, '0')}`;
    const mix = { 5: [2, 2], 10: [4, 3] }[n];
    if (i < mix[0]) return q(id, 'single', `FIXTURE single ${id}`, opts('Right', 'Wrong 1', 'Wrong 2', 'Wrong 3'), ['A']);
    if (i < mix[0] + mix[1]) return q(id, 'multi', `FIXTURE multi ${id}`, opts('Right 1', 'Right 2', 'Wrong 1', 'Wrong 2'), ['A', 'B']);
    return q(id, 'tf', `FIXTURE true or false ${id}`, tf, ['T']);
  });
  HR.registerSection({
    id: 'cloud-2-1',
    notes: [{ heading: 'FIXTURE notes', pages: [61, 83], bullets: ['Fixture bullet one.', 'Fixture bullet two.'] }],
    tests: { pre: set('pre', 5), post: set('post', 5), summative: set('summative', 10) },
  });
})();
