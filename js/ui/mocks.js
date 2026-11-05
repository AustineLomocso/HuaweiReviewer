(function (root) {
  const HR = root.HR;

  function render(el) {
    const { h } = HR.ui;
    const state = HR.app.store.get();
    el.append(h('div', null,
      h('p', { class: 'small' }, h('a', { href: '#/' }, 'Dashboard')),
      h('h1', null, 'Past Exams'),
      h('p', { class: 'small muted' }, 'Original question order on your first attempt, shuffled on retakes. None of the photos showed official answers, so every answer here was worked out for this reviewer.'),
      HR.data.structure.mocks.map((m) => {
        const key = `${m.id}:full`;
        const s = HR.progress.testSummary(key, state);
        return h('section', { class: 'card' },
          h('h2', null, m.title),
          h('p', { class: 'small' }, s.attempts === 0 ? 'Not attempted'
            : `${s.attempts} attempt${s.attempts === 1 ? '' : 's'}${s.best !== null ? ` · Best ${s.best}% · Latest ${s.latest}%` : ''}`,
          ' ', s.passed && h('span', { class: 'badge good' }, 'Passed')),
          h('div', { class: 'row' },
            h('a', { class: 'btn primary', href: `#/test/${encodeURIComponent(key)}` }, state.inProgress[key] ? 'Resume' : 'Open'),
            s.attempts > 0 && h('a', { class: 'btn', href: `#/results/${encodeURIComponent(key)}/${s.attempts - 1}` }, 'Last result')),
          HR.ui.history(key, state.attempts[key] || []));
      }),
    ));
  }

  HR.ui.mocks = { render };
})(globalThis);
