(function (root) {
  const HR = root.HR;

  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (v === null || v === undefined || v === false) return;
      if (k === 'class') el.className = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k === 'checked' || k === 'disabled' || k === 'open') el[k] = !!v;
      else el.setAttribute(k, v === true ? '' : v);
    });
    children.flat(Infinity).forEach((c) => {
      if (c === null || c === undefined || c === false) return;
      el.append(c.nodeType ? c : document.createTextNode(String(c)));
    });
    return el;
  }

  const bar = (pct) => h('div', { class: 'bar' }, h('span', { style: `width:${pct}%` }));

  // Ranges are [first, last]. Source citations are lists of individual pages.
  function pagesText(pdf, pages, isRange = true) {
    const name = { ai: 'HCIA-AI Solution', cloud: 'HCIA-Cloud Service' }[pdf];
    return `${name}, p${pages.length > 1 ? 'p' : ''}. ${pages.join(isRange ? '–' : ', ')}`;
  }

  function sourceBadge(q) {
    if (q.source && q.source.kind === 'material') {
      return h('span', { class: 'badge good' }, 'Course material: ' + pagesText(q.source.pdf, q.source.pages, false));
    }
    return h('span', { class: 'badge warned' }, 'AI-inferred, verify');
  }

  function duration(secs) {
    const t = Math.max(0, Math.round(secs || 0));
    return t < 60 ? `${t} s` : `${Math.floor(t / 60)} min ${t % 60} s`;
  }

  const pad = (n) => String(n).padStart(2, '0');
  function localDate(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
  function dateTime(at) {
    const d = new Date(at);
    return `${localDate(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  // Where "Back" goes for a test key.
  function backHref(key) {
    const { id, kind } = HR.tests.parseKey(key);
    return kind === 'full' ? '#/mocks' : key === 'retry:all' ? '#/' : `#/s/${id}`;
  }

  // Every attempt of a test, newest first, in a collapsed list.
  function history(key, attempts) {
    if (!attempts.length) return null;
    return h('details', { style: 'margin-top:.5rem' },
      h('summary', { class: 'small' }, `Attempt history (${attempts.length})`),
      h('ul', { class: 'list small' }, attempts.map((a, i) => ({ a, i })).reverse().map(({ a, i }) =>
        h('li', null,
          [dateTime(a.at), a.mode === 'practice' ? 'Practice' : `Exam ${a.pct}%`,
            a.passed ? 'Passed' : 'Not passed', duration(a.secs)].join(' · '), ' ',
          h('a', { href: `#/results/${encodeURIComponent(key)}/${i}` }, 'View')))));
  }

  HR.ui = HR.ui || {};
  Object.assign(HR.ui, { h, bar, pagesText, sourceBadge, duration, localDate, dateTime, backHref, history });
})(globalThis);
