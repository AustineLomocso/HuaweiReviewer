(function (root) {
  const HR = root.HR;

  // One card per whole paper: attempts, Open or Resume, and the last result.
  function paperCard(h, state, m, extra) {
    const key = `${m.id}:full`;
    const s = HR.progress.testSummary(key, state);
    return h('section', { class: 'card' },
      h('h2', null, m.title),
      extra.info,
      h('p', { class: 'small' }, s.attempts === 0 ? 'Not attempted'
        : `${s.attempts} attempt${s.attempts === 1 ? '' : 's'}${s.best !== null ? ` · Best ${s.best}% · Latest ${s.latest}%` : ''}`,
      ' ', s.passed && h('span', { class: 'badge good' }, 'Passed')),
      h('div', { class: 'row' },
        h('a', { class: 'btn primary', href: `#/test/${encodeURIComponent(key)}` }, state.inProgress[key] ? 'Resume' : 'Open'),
        s.attempts > 0 && h('a', { class: 'btn', href: `#/results/${encodeURIComponent(key)}/${s.attempts - 1}` }, 'Last result'),
        extra.links),
      HR.ui.history(key, state.attempts[key] || []));
  }

  async function render(el) {
    const { h } = HR.ui;
    await HR.loader.loadInventory();
    const state = HR.app.store.get();
    const printable = (id) => h('a', { class: 'btn', href: `NationalsQuestionnaires/${id}.html` }, 'Printable version');
    el.append(h('div', null,
      h('p', { class: 'small' }, h('a', { href: '#/' }, 'Dashboard')),
      h('h1', null, 'Past Exams'),
      h('h2', null, 'National stage papers'),
      h('p', { class: 'small muted' }, 'Before each sitting you choose the mode, timer, order, which questions to include and how to navigate. Best score and Passed count only full-paper exam attempts.'),
      (HR.data.structure.nationals || []).map((n) => {
        const st = HR.tests.nationalsStatus(n.id);
        const paper = HR.data.examInventory.papers.find((p) => p.id === n.id);
        const missing = paper && paper.missingNumbers.length ? ` · Source questions ${paper.missingNumbers.join(' and ')} missing` : '';
        const keyNote = n.id === 'n2324'
          ? 'Scored with the supplied answer key.'
          : 'No official key was supplied: answers were worked out for this reviewer from the course material.';
        if (!st.ready) {
          return h('section', { class: 'card' },
            h('h2', null, n.title),
            h('p', { class: 'small' }, `${st.total} available questions${missing}`),
            h('p', { class: 'small warned' }, `In review: ${st.reviewed}/${st.total} questions checked against the screenshots. It opens here once all are checked.`),
            h('div', { class: 'row' }, printable(n.id)));
        }
        return paperCard(h, state, n, {
          info: h('p', { class: 'small muted' }, `${st.total} available questions${missing} · ${keyNote}`),
          links: printable(n.id),
        });
      }),
      h('h2', null, 'Earlier practice and preliminary papers'),
      h('p', { class: 'small muted' }, 'None of the photos showed official answers, so every answer here was worked out for this reviewer.'),
      HR.data.structure.mocks.map((m) => paperCard(h, state, m, {})),
    ));
  }

  HR.ui.mocks = { render };
})(globalThis);
