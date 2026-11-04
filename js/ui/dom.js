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

  HR.ui = HR.ui || {};
  Object.assign(HR.ui, { h, bar, pagesText, sourceBadge });
})(globalThis);
