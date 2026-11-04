HR.registerMock({
  id: 'm2324',
  questions: Array.from({ length: 60 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    const type = i < 25 ? 'single' : i < 45 ? 'multi' : 'tf';
    const options = type === 'tf'
      ? [{ key: 'T', text: 'True' }, { key: 'F', text: 'False' }]
      : ['A', 'B', 'C', 'D'].map((key) => ({ key, text: 'Option ' + key }));
    return {
      id: 'm2324-' + n, type, stem: 'FIXTURE past question ' + n, options,
      answer: type === 'multi' ? ['A', 'B'] : [options[0].key],
      explanation: 'FIXTURE explanation.', source: { kind: 'inferred' },
      sectionId: i < 5 ? 'cloud-2-1' : 'cloud-2', mergedInto: null, appearsIn: ['2023-24'],
    };
  }),
});
