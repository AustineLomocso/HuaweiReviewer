(function (root) {
  const HR = root.HR;

  function testCard(id, kind, count) {
    const { h } = HR.ui;
    const key = HR.progress.testKey(id, kind);
    const state = HR.app.store.get();
    const s = HR.progress.testSummary(key, state);
    const inProgress = !!state.inProgress[key];
    return h('div', { class: 'card' },
      h('strong', null, HR.tests.title(key)),
      h('div', { class: 'small muted' }, `${count} question${count === 1 ? '' : 's'}`),
      h('div', { class: 'small' },
        s.attempts === 0 ? 'Not attempted'
          : s.best === null ? `${s.attempts} practice attempt${s.attempts === 1 ? '' : 's'}`
            : `Best ${s.best}% · Latest ${s.latest}% · ${s.attempts} attempt${s.attempts === 1 ? '' : 's'}`,
        ' ', s.passed && h('span', { class: 'badge good' }, 'Passed')),
      h('div', { class: 'row', style: 'margin-top:.5rem' },
        h('a', { class: 'btn primary', href: `#/test/${encodeURIComponent(key)}` }, inProgress ? 'Resume' : 'Open'),
        s.attempts > 0 && h('a', { class: 'btn', href: `#/results/${encodeURIComponent(key)}/${s.attempts - 1}` }, 'Last result')),
      HR.ui.history(key, state.attempts[key] || []));
  }

  function notesBlock(id, node, course, section) {
    const { h, pagesText } = HR.ui;
    const store = HR.app.store;
    const read = !!store.get().read[id];
    return h('section', { class: 'card' },
      h('div', { class: 'row spread' },
        h('h2', null, 'Review notes'),
        node.pages && course.pdf && h('span', { class: 'small muted' }, pagesText(course.pdf, node.pages))),
      course.external && h('p', { class: 'badge warned' }, 'AI-written notes. This topic is not from your course material.'),
      section.notes.map((n) => h('div', { style: 'margin-top:.75rem' },
        h('strong', null, n.heading),
        n.pages && course.pdf && h('span', { class: 'small muted' }, ` (${pagesText(course.pdf, n.pages)})`),
        h('ul', null, n.bullets.map((b) => h('li', null, b))))),
      h('button', {
        class: read ? 'btn' : 'btn primary',
        onclick: () => {
          store.update((st) => { if (read) delete st.read[id]; else st.read[id] = Date.now(); });
          HR.app.rerender({ keepScroll: true });
        },
      }, read ? 'Marked as read (undo)' : 'Mark as read'));
  }

  async function ownContent(id) {
    const { h } = HR.ui;
    const found = HR.progress.findNode(HR.data.structure, id);
    const entry = HR.data.manifest[id];
    const wrap = h('div');
    if (!entry) {
      wrap.append(h('p', { class: 'card muted' }, 'Content for this section has not been written yet.'));
      return wrap;
    }
    await HR.loader.loadSection(id);
    const section = HR.data.sections[id];
    const gain = HR.progress.gain(id, HR.app.store.get());
    const short = section.shortfall || {};
    wrap.append(h('div', null,
      h('p', { class: 'small muted' }, 'Suggested order: Pre-Test, notes, Post-Test, Summative Test.'),
      notesBlock(id, found.node, found.path[0], section),
      gain !== null && h('p', { class: 'card' }, 'Pre-to-post gain: ',
        h('strong', { class: gain >= 0 ? 'good' : 'bad' }, `${gain > 0 ? '+' : ''}${gain} points`)),
      h('div', { class: 'test-grid' }, ['pre', 'post', 'summative'].map((k) => entry[k] > 0 && testCard(id, k, entry[k]))),
      Object.entries(short).map(([k, why]) => h('p', { class: 'small muted' }, `${HR.tests.KIND_LABEL[k]} is shorter than usual: ${why}`)),
      entry.past > 0
        ? testCard(id, 'past', entry.past)
        : h('p', { class: 'card muted' }, 'No past exam questions on this topic.'),
    ));
    return wrap;
  }

  function crumbs(path) {
    const { h } = HR.ui;
    return h('p', { class: 'small' }, h('a', { href: '#/' }, 'Dashboard'),
      path.slice(0, -1).map((n, i) => [' / ', h('a', { href: i === 0 ? `#/course/${n.id}` : `#/s/${n.id}` }, n.title)]));
  }

  function rememberPlace(node, hash) {
    HR.app.store.update((st) => { st.last = { hash, label: (node.num ? node.num + ' ' : '') + node.title, at: Date.now() }; });
  }

  async function render(el, id) {
    const { h, bar } = HR.ui;
    const found = HR.progress.findNode(HR.data.structure, id);
    if (!found) throw new Error('Unknown section.');
    if (found.level === 'course') { location.replace(`#/course/${id}`); return; }
    const { node, path } = found;
    rememberPlace(node, `#/s/${id}`);
    el.append(crumbs(path), h('h1', null, `${node.num} ${node.title}`));
    el.append(await ownContent(id));
    if (node.subs) {
      const state = HR.app.store.get();
      el.append(h('section', { class: 'card' }, h('h2', null, 'Subchapters'),
        h('ul', { class: 'list' }, node.subs.map((s) => {
          const st = HR.progress.nodeStats(s, HR.data.manifest, state);
          const best = HR.progress.bestScore(s.id, state);
          return h('li', null, h('div', { class: 'row spread' },
            h('a', { href: `#/s/${s.id}` }, `${s.num} ${s.title}`),
            best !== null && h('span', { class: 'small muted' }, `Best ${best}%`)), bar(st.pct));
        }))));
    }
  }

  async function renderCourse(el, id) {
    const { h, bar } = HR.ui;
    const found = HR.progress.findNode(HR.data.structure, id);
    if (!found || found.level !== 'course') throw new Error('Unknown course.');
    const course = found.node;
    const state = HR.app.store.get();
    const stats = HR.progress.nodeStats(course, HR.data.manifest, state);
    el.append(
      h('p', { class: 'small' }, h('a', { href: '#/' }, 'Dashboard')),
      h('h1', null, course.title), bar(stats.pct),
      h('p', { class: 'small muted' }, `${stats.pct}% complete`),
      h('section', { class: 'card' }, h('h2', null, 'Chapters'),
        course.chapters.map((ch) => {
          const cs = HR.progress.nodeStats(ch, HR.data.manifest, state);
          const chBest = HR.progress.bestScore(ch.id, state);
          return h('details', { open: true, style: 'margin-bottom:.75rem' },
            h('summary', null, `${ch.num} ${ch.title} (${cs.pct}%)${chBest !== null ? ` · Best ${chBest}%` : ''}`),
            h('ul', { class: 'list' },
              h('li', null, h('a', { href: `#/s/${ch.id}` }, 'Chapter notes and tests')),
              ch.subs.map((s) => {
                const ss = HR.progress.nodeStats(s, HR.data.manifest, state);
                const best = HR.progress.bestScore(s.id, state);
                return h('li', null, h('div', { class: 'row spread' },
                  h('a', { href: `#/s/${s.id}` }, `${s.num} ${s.title}`),
                  h('span', { class: 'row' },
                    best !== null && h('span', { class: 'small muted' }, `Best ${best}%`),
                    ss.complete ? h('span', { class: 'badge good' }, 'Complete') : h('span', { class: 'small muted' }, `${ss.pct}%`))),
                bar(ss.pct));
              })));
        })),
      h('h2', null, 'Whole-course notes and tests'),
    );
    el.append(await ownContent(id));
  }

  HR.ui.section = { render, renderCourse };
})(globalThis);
