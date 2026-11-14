(function (root) {
  const HR = root.HR;

  function sourceHref(sourceId, page) {
    const source = HR.data.inventory && HR.data.inventory.sources.find((item) => item.id === sourceId);
    if (!source || !HR.isLocal()) return null;
    if (page !== undefined && (!Number.isInteger(page) || page < 1 || page > source.pageCount)) return null;
    const path = source.path.split('/').map(encodeURIComponent).join('/');
    return path + (page === undefined ? '' : `#page=${page}`);
  }

  function sourceCoverage(sourceId) {
    const course = HR.data.structure.courses.find((item) => item.pdf === sourceId);
    if (!course) return [];
    return HR.progress.allNodes({ courses: [course] }).map(({ node, level }) => {
      const entry = HR.data.manifest[node.id] || {};
      return {
        id: node.id, title: node.title, level, pages: node.pages,
        notes: !!entry.notes, pre: entry.pre || 0, post: entry.post || 0,
        summative: entry.summative || 0, past: entry.past || 0,
        objectives: entry.objectives || [], coverageStatus: entry.coverageStatus || 'review-pending',
      };
    });
  }

  function existingQuestions() {
    return Object.values(HR.data.mocks).flatMap((paper) => paper.questions
      .filter((question) => !question.mergedInto)
      .map((question) => ({ paperId: paper.id, question })));
  }

  HR.curriculum = { sourceHref, sourceCoverage, existingQuestions };
})(globalThis);
