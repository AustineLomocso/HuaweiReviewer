(function (root) {
  const HR = root.HR;
  const { h } = HR.ui;

  function navigation(title) {
    return h('div', null,
      h('nav', { class: 'row', 'aria-label': 'Study resources' },
        h('a', { href: '#/' }, 'Dashboard'),
        h('a', { href: '#/coverage' }, 'Coverage'),
        h('a', { href: '#/sources' }, 'Sources'),
        h('a', { href: '#/mappings' }, 'Question mappings')),
      h('h1', { style: 'margin-top:1rem' }, title));
  }

  function pdfLink(sourceId, page, label) {
    const href = HR.curriculum.sourceHref(sourceId, page);
    return href ? h('a', { href, target: '_blank', rel: 'noopener' }, label) : h('span', null, label);
  }

  function table(headers, rows) {
    return h('div', { class: 'table-scroll' }, h('table', { class: 'coverage-table' },
      h('thead', null, h('tr', null, headers.map((header) => h('th', { scope: 'col' }, header)))),
      h('tbody', null, rows.map((cells) => h('tr', null, cells.map((cell) => h('td', null, cell)))))));
  }

  async function renderCoverage(el) {
    await HR.loader.loadInventory();
    const inventory = HR.data.inventory;
    el.append(navigation('Curriculum coverage'),
      h('p', null, `${inventory.sources.length} included PDFs, ${inventory.sources.reduce((sum, source) => sum + source.pageCount, 0)} pages. `,
        'Objective-by-objective verification is pending. Counts below show content currently available in the app.'),
      h('p', { class: 'small muted' }, 'Your reading and assessment progress is available on the dashboard.'));
    inventory.sources.forEach((source) => {
      const lessons = HR.curriculum.sourceCoverage(source.id);
      const missing = lessons.filter((lesson) => !lesson.notes || !lesson.pre || !lesson.post || !lesson.summative);
      el.append(h('section', { class: 'card' },
        h('h2', null, h('a', { href: `#/sources/${source.id}` }, source.title)),
        h('p', { class: 'small' }, source.kind === 'edition-context'
          ? 'Edition context extracted. Instructional classification awaits source review.'
          : lessons.length ? `${lessons.length} existing curriculum nodes. ${missing.length} have missing notes or assessments.`
            : 'PDF text extracted. Lesson hierarchy and revision content await authoring.'),
        lessons.length > 0 && h('details', null, h('summary', null, 'Lesson content and assessment counts'),
          table(['Lesson', 'Notes', 'Pre', 'Post', 'Summative', 'Past', 'Objective review'], lessons.map((lesson) => [
            h('a', { href: lesson.level === 'course' ? `#/course/${lesson.id}` : `#/s/${lesson.id}` }, lesson.title),
            lesson.notes ? 'Available' : 'Missing', lesson.pre, lesson.post, lesson.summative, lesson.past,
            lesson.coverageStatus === 'source-reviewed' ? `${lesson.objectives.length} objectives reviewed` : 'Pending',
          ]))),
        lessons.filter((lesson) => lesson.objectives.length > 0).map((lesson) => h('details', null,
          h('summary', null, `Objective coverage — ${lesson.title}`),
          table(['Objective', 'Note blocks', 'Pre items', 'Post items', 'Summative items'], lesson.objectives.map((objective) => [
            objective.description, objective.notes, objective.pre, objective.post, objective.summative,
          ])))),
      ));
    });
    const supplemental = HR.data.structure.courses.filter((course) => course.external);
    el.append(h('section', { class: 'card' }, h('h2', null, 'Supplementary lessons'),
      h('p', null, 'Existing supplementary lessons require reconciliation with the expanded source material.'),
      supplemental.map((course) => h('a', { href: `#/course/${course.id}` }, course.title))));
  }

  async function renderSources(el, id) {
    await HR.loader.loadInventory();
    const inventory = HR.data.inventory;
    const sources = id ? inventory.sources.filter((source) => source.id === id) : inventory.sources;
    if (!sources.length) throw new Error('Unknown source document.');
    el.append(navigation('Study sources'), h('p', { class: 'small muted' },
      'Page references use one-based PDF viewer pages. Source links open the local PDF in another tab.'));
    sources.forEach((source) => {
      const ocrPages = source.pages.filter((page) => page.slideOcr).length;
      el.append(h('section', { class: 'card' },
        h('h2', null, source.title),
        h('p', null, `${source.pageCount} pages. Text extracted${ocrPages ? `, including OCR of ${ocrPages} slide images` : ''}. Source review pending.`),
        h('p', { class: 'small' }, source.path),
        h('div', { class: 'row' }, pdfLink(source.id, 1, 'Open PDF'),
          h('a', { href: '#/coverage' }, 'View coverage')),
        source.outline.length > 0 && h('details', null, h('summary', null, 'PDF outline'),
          h('ul', { class: 'list' }, source.outline.map((item) => h('li', null,
            pdfLink(source.id, item.page, `${item.title} — p. ${item.page}`))))),
        source.objectivePages.length > 0 && h('details', null, h('summary', null, 'Extracted source objectives'),
          source.objectivePages.map((item) => h('div', null,
            pdfLink(source.id, item.page, `PDF p. ${item.page}`),
            h('pre', { class: 'source-extract' }, item.text)))),
        source.contentsPages.length > 0 && h('details', null, h('summary', null, 'Contents slide references'),
          h('p', { class: 'small' }, 'Repeated contents slides are retained for hierarchy review.'),
          h('div', { class: 'row' }, source.contentsPages.map((item) => pdfLink(source.id, item.page, `p. ${item.page}`)))),
        source.lessonCandidates.length > 0 && h('details', null, h('summary', null, 'Lesson hierarchy candidates'),
          h('p', { class: 'small muted' }, 'Extracted titles await hierarchy and page-boundary review.'),
          h('ul', { class: 'list' }, source.lessonCandidates.map((item) => h('li', null,
            `${item.number || item.parentNumber + ' /'} ${item.title} `,
            item.contentsPages.slice(0, 3).map((page) => pdfLink(source.id, page, `p. ${page} `)))))),
        h('details', null, h('summary', null, 'File identity'), h('p', { class: 'small hash' }, `SHA-256 ${source.sha256}`)),
      ));
    });
    if (!id) el.append(h('section', { class: 'card' }, h('h2', null, 'Excluded lab guides'),
      h('ul', null, inventory.excluded.map((source) => h('li', null, source.path)))));
  }

  function lessonLink(id, role) {
    const found = HR.progress.findNode(HR.data.structure, id);
    if (!found) return h('span', { class: 'warned' }, `${role} lesson ${id} is missing`);
    const href = found.level === 'course' ? `#/course/${id}` : `#/s/${id}`;
    return h('p', { class: 'small' }, `${role} — `, h('a', { href },
      `${found.path[0].title} / ${found.node.title}`));
  }

  function existingCard(record) {
    const q = record.question;
    return h('article', { class: 'card' }, h('h2', null, q.id), h('p', null, q.stem),
      lessonLink(q.sectionId, 'Primary'),
      (q.secondarySectionIds || []).map((id) => lessonLink(id, 'Secondary')),
      q.mappingEvidence
        ? q.mappingEvidence.map((evidence) => h('p', { class: 'small' }, evidence.reason, ' ',
          evidence.source.pages.map((page) => pdfLink(evidence.source.pdf, page, `PDF p. ${page} `))))
        : h('p', { class: 'small muted' }, 'Expanded-source mapping review pending.'),
      h('details', null, h('summary', null, 'Review answer and evidence'),
        h('ul', null, q.options.map((option) => h('li', null, option.text))),
        h('p', null, 'Current answer — ', q.answer.map((key) => q.options.find((option) => option.key === key).text).join(' / ')),
        h('p', null, q.explanation),
        q.source.kind === 'material'
          ? h('p', null, 'Existing material citation — ', q.source.pages.map((page) => pdfLink(q.source.pdf, page, `p. ${page} `)))
          : h('p', { class: 'warned' }, 'AI-inferred answer. Source verification pending.'),
        q.flag && h('p', { class: 'warned' }, q.flag)));
  }

  function draftCard(paper, capture) {
    return h('article', { class: 'card' }, h('h2', null, `${paper.id} / Question ${capture.number || '?'}`),
      h('p', null, capture.stem || 'Transcription requires visual review.'),
      h('p', { class: 'small warned' }, capture.status === 'verified' ? 'Transcription, answer, and lesson mapping verified against supplied material.'
        : capture.status === 'answer-review' ? 'Transcription reviewed. Answer issue requires resolution.'
          : capture.status === 'transcribed' ? 'Transcription reviewed. Material verification pending.' : 'OCR draft. Lesson mapping and answer verification pending.'),
      capture.sectionId && lessonLink(capture.sectionId, 'Primary'),
      (capture.secondarySectionIds || []).map((id) => lessonLink(id, 'Secondary')),
      capture.proposedSectionId && lessonLink(capture.proposedSectionId, 'Proposed mapping — review pending'),
      h('details', null, h('summary', null, 'Review capture and supplied key'),
        HR.isLocal() && h('p', null, h('a', { href: capture.image.split('/').map(encodeURIComponent).join('/'), target: '_blank', rel: 'noopener' }, 'Open source screenshot')),
        h('ul', null, capture.options.map((option) => h('li', null, `${option.key}. ${option.text}`))),
        h('p', null, capture.suppliedKey ? `Supplied key as extracted — ${capture.suppliedKey}` : 'A supplied key was not extracted.'),
        capture.suppliedKeyStatus === 'visually-reviewed' && h('p', { class: 'small' }, 'Supplied key visually checked against the screenshot. Material-based answer verification pending.'),
        capture.suppliedExplanation && h('p', null, capture.suppliedExplanation),
        capture.reviewNotes && h('p', { class: 'small warned' }, capture.reviewNotes),
        capture.answer && h('p', null, `${capture.status === 'verified' ? 'Verified answer' : 'Answer used for scoring'} — ${capture.answer.join(', ')}`),
        capture.explanation && h('p', null, capture.explanation),
        capture.flag && h('p', { class: 'small warned' }, capture.flag),
        capture.source && capture.source.kind === 'material' && capture.source.pages.map((page) => pdfLink(capture.source.pdf, page, `Supporting PDF p. ${page} `)),
        capture.issues.length > 0 && h('ul', { class: 'small warned' }, capture.issues.map((issue) => h('li', null, issue)))));
  }

  async function renderMappings(el) {
    await Promise.all([HR.loader.loadInventory(), HR.loader.loadMocks()]);
    const existing = HR.curriculum.existingQuestions();
    const papers = HR.data.examInventory.papers;
    const search = h('input', { type: 'search', placeholder: 'Search question text or ID', 'aria-label': 'Search questions', class: 'grow' });
    const paperSelect = h('select', { 'aria-label': 'Filter paper' },
      h('option', { value: '' }, 'All papers'),
      HR.data.structure.mocks.map((paper) => h('option', { value: paper.id }, paper.title)),
      papers.map((paper) => h('option', { value: paper.id }, paper.title)));
    const courseSelect = h('select', { 'aria-label': 'Filter course' }, h('option', { value: '' }, 'All mappings'),
      h('option', { value: 'unmapped' }, 'Mapping pending'),
      HR.data.structure.courses.map((course) => h('option', { value: course.id }, course.title)));
    const statusSelect = h('select', { 'aria-label': 'Filter evidence' },
      h('option', { value: '' }, 'All evidence statuses'),
      h('option', { value: 'material' }, 'Existing material citation'),
      h('option', { value: 'inferred' }, 'Existing inferred answer'),
      h('option', { value: 'verified' }, 'Verified Nationals question'),
      h('option', { value: 'transcribed' }, 'Reviewed transcription'),
      h('option', { value: 'answer-review' }, 'Nationals answer review'),
      h('option', { value: 'draft' }, 'OCR draft'));
    const list = h('div');
    const counter = h('p', { class: 'small muted', 'aria-live': 'polite' });
    const more = h('button', { class: 'btn' }, 'Show more');
    let limit = 25;

    function draw() {
      const query = search.value.toLowerCase().trim();
      const course = courseSelect.value;
      const ids = course && course !== 'unmapped' ? new Set(HR.progress.descendantIds(HR.data.structure, course)) : null;
      const records = existing.filter((record) => !paperSelect.value || record.paperId === paperSelect.value)
        .filter((record) => !statusSelect.value || record.question.source.kind === statusSelect.value)
        .filter((record) => course !== 'unmapped')
        .filter((record) => !ids || HR.tests.mappedLessonIds(record.question).some((id) => ids.has(id)))
        .filter((record) => `${record.question.id} ${record.question.stem}`.toLowerCase().includes(query))
        .map((record) => ({ existing: record }));
      papers.filter((paper) => !paperSelect.value || paper.id === paperSelect.value).forEach((paper) => {
        paper.captures.filter((capture) => `${paper.id} ${capture.number} ${capture.stem}`.toLowerCase().includes(query))
          .filter((capture) => !statusSelect.value || (statusSelect.value === 'draft' ? capture.status === 'ocr-draft' : capture.status === statusSelect.value))
          .filter((capture) => course !== 'unmapped' || !capture.sectionId)
          .filter((capture) => !ids || HR.tests.mappedLessonIds(capture).some((id) => ids.has(id)))
          .forEach((capture) => records.push({ paper, capture }));
      });
      counter.textContent = `${records.length} matching records. Showing ${Math.min(limit, records.length)}.`;
      list.replaceChildren(...records.slice(0, limit).map((record) => record.existing
        ? existingCard(record.existing) : draftCard(record.paper, record.capture)));
      more.hidden = records.length <= limit;
    }

    [search, paperSelect, courseSelect, statusSelect].forEach((control) => control.addEventListener('input', () => { limit = 25; draw(); }));
    more.addEventListener('click', () => { limit += 25; draw(); });
    el.append(navigation('Question mappings'),
      h('p', null, `${existing.length} existing canonical questions and ${papers.reduce((sum, paper) => sum + paper.captures.length, 0)} national-stage captures.`),
      h('p', null, `${papers.flatMap((p) => p.captures).filter((c) => c.transcriptionStatus === 'visually-reviewed').length} transcriptions reviewed. ${papers.flatMap((p) => p.captures).filter((c) => c.status === 'verified').length} answers and mappings verified.`),
      papers.map((paper) => h('p', { class: 'small' }, `${paper.id} — ${paper.uniqueNumbers}/${paper.expectedQuestions} question numbers captured. `,
        paper.missingNumbers.length > 0 && `Missing ${paper.missingNumbers.join(', ')}. `,
        paper.duplicateNumbers.length > 0 && `Repeated ${paper.duplicateNumbers.join(', ')}.`)),
      h('div', { class: 'card row filters' }, search, paperSelect, courseSelect, statusSelect), counter, list, more);
    draw();
  }

  HR.ui.curriculum = { renderCoverage, renderSources, renderMappings };
})(globalThis);
