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
    if (isRange && pages.length === 2 && pages[0] === pages[1]) pages = [pages[0]];
    const name = { ai: 'HCIA-AI Solution', cloud: 'HCIA-Cloud Service' }[pdf]
      || HR.data.structure.courses.find((course) => course.pdf === pdf)?.title
      || HR.data.inventory?.sources.find((source) => source.id === pdf)?.title || pdf;
    return `${name}, p${pages.length > 1 ? 'p' : ''}. ${pages.join(isRange ? '–' : ', ')}`;
  }

  function sourceBadge(q) {
    if (q.source && q.source.kind === 'material') {
      return h('span', { class: 'badge good' }, 'Course material: ',
        q.source.pages.map((page, i) => [i ? ', ' : '', h('a', {
          href: HR.curriculum.sourceHref(q.source.pdf, page) || `#/sources/${q.source.pdf}`,
          target: '_blank', rel: 'noopener',
        }, pagesText(q.source.pdf, [page], false))]));
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

  const STATUS_TEXT = { wrong: 'answered wrong last time', uncertain: 'marked Uncertain last time', unanswered: 'never answered' };
  const TYPE_TEXT = { single: 'single-answer', multi: 'multiple-answer', tf: 'True/False' };

  // Describes which questions a partial sitting used, for example "Partial: nos. 1–30, multiple-answer only".
  function filterText(filters) {
    if (!filters) return 'Partial';
    const parts = [];
    if (filters.from !== null && filters.to !== null) parts.push(`nos. ${filters.from}–${filters.to}`);
    else if (filters.from !== null) parts.push(`from no. ${filters.from}`);
    else if (filters.to !== null) parts.push(`up to no. ${filters.to}`);
    if (filters.types && filters.types.length) parts.push(`${filters.types.map((t) => TYPE_TEXT[t]).join(' and ')} only`);
    if (filters.status && filters.status !== 'all') parts.push(STATUS_TEXT[filters.status]);
    if (filters.count) parts.push(`random ${filters.count}`);
    return parts.length ? `Partial: ${parts.join(', ')}` : 'Partial';
  }

  // Every attempt of a test, newest first, in a collapsed list.
  function history(key, attempts) {
    if (!attempts.length) return null;
    return h('details', { style: 'margin-top:.5rem' },
      h('summary', { class: 'small' }, `Attempt history (${attempts.length})`),
      h('ul', { class: 'list small' }, attempts.map((a, i) => ({ a, i })).reverse().map(({ a, i }) =>
        h('li', null,
          [dateTime(a.at), a.mode === 'practice' ? 'Practice' : `Exam ${a.pct}%`,
            a.passed ? 'Passed' : 'Not passed', duration(a.secs), a.partial && filterText(a.filters)].filter(Boolean).join(' · '), ' ',
          h('a', { href: `#/results/${encodeURIComponent(key)}/${i}` }, 'View')))));
  }

  HR.ui = HR.ui || {};
  Object.assign(HR.ui, { h, bar, pagesText, sourceBadge, duration, localDate, dateTime, backHref, history, filterText });
})(globalThis);
