(function (root) {
  const HR = root.HR;
  const { h } = HR.ui;
  let cleanup = null;

  function backend() {
    try { return root.localStorage; } catch (e) {
      return { getItem() { throw e; }, setItem() { throw e; } };
    }
  }

  const routes = [
    [/^#\/$/, () => (el) => HR.ui.dashboard.render(el)],
    [/^#\/course\/(.+)$/, (m) => (el) => HR.ui.section.renderCourse(el, m[1])],
    [/^#\/s\/(.+)$/, (m) => (el) => HR.ui.section.render(el, m[1])],
    [/^#\/mocks$/, () => (el) => HR.ui.mocks.render(el)],
    [/^#\/test\/(.+)$/, (m) => (el) => HR.ui.test.render(el, decodeURIComponent(m[1]))],
    [/^#\/results\/(.+)\/(\d+)$/, (m) => (el) => HR.ui.results.render(el, decodeURIComponent(m[1]), Number(m[2]))],
  ];

  function banner() {
    const el = document.getElementById('banner');
    el.replaceChildren();
    const store = HR.app.store;
    if (!store.available) {
      el.append(h('div', { class: 'banner' }, 'Browser storage is unavailable or full, so progress will NOT be saved. Download a backup and check your browser settings.'));
    } else if (store.wasCorrupt) {
      el.append(h('div', { class: 'banner' }, 'Saved progress could not be read, so the app started fresh. Restore a backup from the dashboard if you have one.'));
    }
  }

  async function route() {
    if (cleanup) { cleanup(); cleanup = null; }
    const hash = location.hash || '#/';
    const view = document.getElementById('view');
    view.replaceChildren();
    window.scrollTo(0, 0);
    banner();
    const match = routes.map(([re, make]) => [re.exec(hash), make]).find(([m]) => m);
    if (!match) {
      view.append(h('div', { class: 'card' }, 'Page not found. ', h('a', { href: '#/' }, 'Back to the dashboard')));
      return;
    }
    try {
      cleanup = (await match[1](match[0])(view)) || null;
    } catch (e) {
      view.replaceChildren(h('div', { class: 'card' }, h('h2', null, 'This page could not be loaded'), h('p', null, e.message), h('a', { href: '#/' }, 'Back to the dashboard')));
    }
    banner();
  }

  HR.app = { store: HR.storage.createStore(backend()), rerender: route };
  root.addEventListener('hashchange', route);
  route();
})(globalThis);
