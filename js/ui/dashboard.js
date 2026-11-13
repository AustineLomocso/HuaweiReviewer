(function (root) {
  const HR = root.HR;

  function backupCard() {
    const { h } = HR.ui;
    const store = HR.app.store;
    const status = h('p', { class: 'small muted' });
    const file = h('input', {
      type: 'file', accept: '.json,application/json', hidden: true,
      onchange: async (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const text = await f.text();
        e.target.value = '';
        try {
          store.validateJSON(text);
        } catch (err) {
          status.textContent = err.message;
          return;
        }
        if (!confirm('Replace all progress in this browser with this backup?')) return;
        try {
          store.importJSON(text);
          // The status text would be lost in the rerender, so confirm with an alert.
          alert('Backup restored.');
          HR.app.rerender();
        } catch (err) {
          status.textContent = err.message;
        }
      },
    });
    const exportIt = () => {
      const url = URL.createObjectURL(new Blob([store.exportJSON()], { type: 'application/json' }));
      const a = h('a', { href: url, download: `huawei-reviewer-backup-${HR.ui.localDate(new Date())}.json` });
      a.click();
      URL.revokeObjectURL(url);
      status.textContent = 'Backup downloaded.';
    };
    return h('section', { class: 'card' },
      h('h2', null, 'Backup and restore'),
      h('p', { class: 'small muted' }, 'Clearing browser data erases progress. Keep a backup file to protect it or move it to another browser.'),
      h('div', { class: 'row' },
        h('button', { class: 'btn', onclick: exportIt }, 'Download backup'),
        h('button', { class: 'btn', onclick: () => file.click() }, 'Restore backup')),
      file, status);
  }

  function render(el) {
    const { h, bar } = HR.ui;
    const { structure, manifest } = HR.data;
    const state = HR.app.store.get();
    const weak = HR.progress.weakTopics(structure, state);
    const retryCount = Object.keys(state.retry).length;
    const courseName = (id) => HR.progress.findNode(structure, id).path[0].title;

    // Built through h(), because el.append would print null and false as text.
    el.append(h('div', null,
      h('h1', null, 'Your progress'),
      h('nav', { class: 'row', 'aria-label': 'Study resources', style: 'margin-bottom:1rem' },
        h('a', { href: '#/coverage' }, 'Coverage'),
        h('a', { href: '#/sources' }, 'Sources'),
        h('a', { href: '#/mappings' }, 'Question mappings'),
        h('a', { href: 'NationalsQuestionnaires/index.html' }, 'Nationals questionnaires')),
      state.last && typeof state.last.hash === 'string' && /^#\//.test(state.last.hash) && h('section', { class: 'card row spread' },
        h('span', null, 'Continue where you left off: ', h('strong', null, state.last.label)),
        h('a', { class: 'btn primary', href: state.last.hash }, 'Continue')),
      h('div', { class: 'test-grid' }, structure.courses.map((c) => {
        const s = HR.progress.nodeStats(c, manifest, state);
        return h('a', { class: 'card', href: `#/course/${c.id}`, style: 'text-decoration:none;color:inherit' },
          h('h2', null, c.title), bar(s.pct),
          h('div', { class: 'small muted' }, `${s.pct}% complete (${s.done} of ${s.total} items)`));
      })),
      h('section', { class: 'card row spread' },
        h('div', null, h('h2', null, 'Past Exams'), h('div', { class: 'small muted' }, 'The 3 full mock exams in their original order.')),
        h('a', { class: 'btn', href: '#/mocks' }, 'Open')),
      h('section', { class: 'card' },
        h('h2', null, 'Weak topics'),
        weak.length
          ? h('ul', { class: 'list' }, weak.map((w) => h('li', { class: 'row spread' },
            h('a', { href: `#/s/${w.id}` }, `${courseName(w.id)}: ${w.node.num ? w.node.num + ' ' : ''}${w.node.title}`),
            h('span', { class: 'bad' }, `${w.pct}%`))))
          : h('p', { class: 'muted small' }, 'No section has a latest test score below 60%.'),
        h('div', { class: 'row spread' },
          h('span', null, `Retry set: ${retryCount} question${retryCount === 1 ? '' : 's'} you missed or marked Uncertain`),
          retryCount > 0 && h('a', { class: 'btn', href: '#/test/retry:all' }, 'Practise them'))),
      backupCard(),
    ));
  }

  HR.ui.dashboard = { render };
})(globalThis);
