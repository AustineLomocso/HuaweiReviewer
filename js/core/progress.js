(function (root) {
  const KINDS = ['pre', 'post', 'summative', 'past'];
  const childrenOf = (n) => n.chapters || n.subs || [];
  const testKey = (id, kind) => `${id}:${kind}`;

  function allNodes(structure) {
    const out = [];
    const walk = (node, level, path) => {
      const p = [...path, node];
      out.push({ node, level, path: p });
      const next = level === 'course' ? 'chapter' : 'sub';
      childrenOf(node).forEach((c) => walk(c, next, p));
    };
    structure.courses.forEach((c) => walk(c, 'course', []));
    return out;
  }

  function findNode(structure, id) {
    return allNodes(structure).find((x) => x.node.id === id) || null;
  }

  function descendantIds(structure, id) {
    const found = findNode(structure, id);
    if (!found) return [];
    const ids = [];
    const walk = (n) => { ids.push(n.id); childrenOf(n).forEach(walk); };
    walk(found.node);
    return ids;
  }

  function ownItems(id, manifest) {
    const e = manifest[id];
    if (!e) return [];
    const items = e.notes ? [{ type: 'notes', id }] : [];
    KINDS.forEach((k) => { if (e[k] > 0) items.push({ type: 'test', key: testKey(id, k) }); });
    return items;
  }

  function itemDone(item, state) {
    if (item.type === 'notes') return !!state.read[item.id];
    return (state.attempts[item.key] || []).length > 0;
  }

  function ownComplete(id, manifest, state) {
    const items = ownItems(id, manifest);
    return items.length > 0 && items.every((i) => itemDone(i, state));
  }

  function nodeStats(node, manifest, state) {
    let done = 0;
    let total = 0;
    const walk = (n) => {
      const items = ownItems(n.id, manifest);
      if (items.length === 0) total += 1; // Unwritten content counts as not done.
      items.forEach((i) => { total += 1; if (itemDone(i, state)) done += 1; });
      childrenOf(n).forEach(walk);
    };
    walk(node);
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0, complete: total > 0 && done === total };
  }

  function testSummary(key, state) {
    const list = state.attempts[key] || [];
    const exam = list.filter((a) => a.mode === 'exam');
    return {
      attempts: list.length,
      best: exam.length ? Math.max(...exam.map((a) => a.pct)) : null,
      latest: exam.length ? exam[exam.length - 1].pct : null,
      passed: exam.some((a) => a.passed),
    };
  }

  function gain(id, state) {
    const pre = (state.attempts[testKey(id, 'pre')] || []).filter((a) => a.mode === 'exam');
    const post = (state.attempts[testKey(id, 'post')] || []).filter((a) => a.mode === 'exam');
    if (!pre.length || !post.length) return null;
    return Math.round((Math.max(...post.map((a) => a.pct)) - pre[0].pct) * 10) / 10;
  }

  function weakTopics(structure, state) {
    const out = [];
    allNodes(structure).forEach(({ node }) => {
      let latest = null;
      KINDS.forEach((k) => {
        (state.attempts[testKey(node.id, k)] || []).forEach((a) => {
          if (a.mode === 'exam' && (!latest || a.at >= latest.at)) latest = a;
        });
      });
      if (latest && !latest.passed) out.push({ id: node.id, node, pct: latest.pct });
    });
    return out;
  }

  function applyRetry(retry, questions, answers, uncertain, now) {
    questions.forEach((q) => {
      const id = q.mergedInto || q.id;
      const correct = root.HR.scoring.isCorrect(q, answers[q.id]);
      if (correct && !uncertain[q.id]) delete retry[id];
      else retry[id] = { at: now };
    });
  }

  root.HR = root.HR || {};
  root.HR.progress = {
    KINDS, testKey, childrenOf, allNodes, findNode, descendantIds, ownItems, itemDone,
    ownComplete, nodeStats, testSummary, gain, weakTopics, applyRetry,
  };
})(globalThis);
