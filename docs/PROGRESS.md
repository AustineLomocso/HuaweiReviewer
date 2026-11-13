# Progress

Read this at the start of each session, and update it before ending one. Task numbers refer to [the plan](superpowers/plans/2026-11-05-huawei-reviewer.md).

## Current state

**Nationals in the test engine, 2026-11-14.** Follow `C:/Users/austi/.claude/plans/the-task-is-to-tender-puffin.md` (summary under Decisions). Part A (engine and setup screen) is done. Part B: **n2324 and n2425 are complete and open in the app.** n2324 uses the supplied key (Q10 ungraded). n2425 has worked answers, 56 of 90 with PDF page citations, with Q11 and Q24 ungraded because no single answer is defensible. **Next: n2526** (148 available questions, 147 to transcribe). Workflow: write `work/nationals-batches/<paper>-bNN.json`, run `node tools/apply-nationals-reviews.js <batch>`, `python tools/reconcile-exams.py`, `npm test` (enforces the content rules), and commit. Helpers: `node work/nationals-batches/dump.js <paper> <from> <to>` prints OCR records; `node work/nationals-batches/find.js "term" "term"` searches the extracted PDF text.

**Curriculum expansion in progress, 2026-11-14.** Follow [Complete curriculum coverage and past-exam mapping](superpowers/plans/2026-11-13-complete-curriculum-coverage.md). The user's preferences are recorded there and in `docs/content-brief.md`.

- Inventoried 15 included PDFs and seven excluded lab guides. Extracted all 5,044 physical pages. OCR of all 604 Cloud Service Solutions Architect slide images is retained alongside native speaker notes. The registry holds PDF outlines, 525 lesson-title candidates, contents slides, objective slides, hashes, and page extraction records. Candidates await hierarchy/boundary review.
- Inventoried all 519 exam images, including 190 original HEIC photographs and 329 Nationals screenshots. OCR drafts cover Nationals papers with 90, 90, and 150 expected questions. The 2025–26 captures omit 1 and 94 and repeat 10. The user confirmed continuing with available sources; keep both missing numbers recorded.
- Visually checked all 90 displayed keys in 2324Answer. `data/exam-key-reviews.json` records image hashes. The first ten n2324 question transcriptions are reviewed. Two answers/mappings are verified, seven await material verification, and question 10 has an unresolved answer issue. Remaining transcriptions await review.
- Added offline Coverage, Sources, and Question mappings views linked from the dashboard. These distinguish available content, extracted drafts, and source review. They expose source PDFs/pages, hierarchy candidates, paper filters, course filters, evidence filters, and collapsed answer details.
- Added primary/secondary mapping resolution and validation. Ancestor sets deduplicate canonical questions across matching descendants. The first evidenced secondary mapping connects `m2526-11` to NAT Gateway.
- Audited `cloud-3-2` (EIP), expanded its notes, declared three source-backed objectives, and added one fresh question per assessment. Its blueprint is pre 6, post 6, summative 7. All original 16 question records remain intact. Other sections retain legacy count validation until audited.
- Separated `m2526-11` from `m2425-13` because their options and correct answers test different sharing mechanisms. The follow-up merge audit separated three more differing-option pairs: there are now 177 canonical questions across the original 180 occurrences, with three equivalent merges retained and documented in `docs/past-merge-audit.md`. Source verification of `m2425-13` now cites the expanded Cloud Service Solutions Architect PDF p.139. Work-folder generator inputs were updated as well.
- Audited `cloud-3-5` (NAT Gateway), with four source-backed objectives, worked application notes, and pre/post/summative counts of 6/6/10. Two new questions cover configuration constraints and capacity planning; all 20 previous items remain intact.
- Filled all four empty course assessments with 100 fresh items: AI post/summative 20/20 and Cloud post/summative 30/30, one item per current sublesson in each test. Added AI pretest item 61 for the previously absent business-model topic. All 120 original course pretest records were preserved, apart from added objective metadata. These are explicitly partial-review breadth samples, not a full instructional-depth audit.
- Read all ten pages of four edition-context documents and recorded training-versus-written-test distinctions in `docs/edition-context-review.md`. Reviewed the 49-page AI Fundamentals Chapter 1 text and documented deeper hierarchy and source conflicts in `docs/ai-fundamentals-1-source-review.md`; diagrams and disputed facts remain pending.
- Added `fundamentals1` for AI Fundamentals Chapter 1: six main source lessons, 16 deeper sections, and a course overview, with 132 fresh questions. The source-specific authoring generator is `tools/build-fundamentals-1.js`; its output is in `data/sections/fundamentals1*.js`. Historical contradictions and philosophical caveats remain visible, and no source-wide completion flag was set.
- Added direct local PDF page links to notes and question evidence. Section loading now includes the source registry. Leaf sections no longer show an empty Subchapters card.
- Verified `m2425-48` against EI Developer pp.10/12 and added evidenced secondary mappings for it and `m2526-42` to the machine-learning foundations lesson and the new introductory connectionism lesson. Keys and IDs are unchanged.
- Current content totals are 2,033 generated questions and 180 original past occurrences. There are now 98 section files across 102 nodes. AI Fundamentals Chapter 1 adds 23 authored nodes; most other expanded source courses remain pending.
- Verification has 106 passing unit tests, passing inventory integrity checks, passing new-view browser checks, and a passing full browser checklist. The content checker now has zero errors and 13 warnings: six legacy size shortfalls, four missing supplementary parent sections, and three retained-merge wording warnings. Full source coverage is unfinished.

## Next steps

0. **Nationals Part B first** (user's current priority): review n2324, then n2425, then n2526 in batches of 15–20, committing each batch. See the plan file for the per-question steps.
1. Review the source hierarchy candidates against actual pages, including deeper sublessons, and define stable curriculum IDs/page ranges for all included instructional content. Read edition-context documents before classifying their contents.
2. Visually verify Nationals question text/options, reconcile occurrences with the original mocks, and verify answers against supplied sources. Preserve keys separately. Continue despite the two missing 2025–26 captures, retaining explicit source gaps.
3. Map every verified question to its primary and supported secondary lessons, recording evidence. Existing merge decisions are documented in `docs/past-merge-audit.md`; their transcription and answer-verification status remains independent.
4. Audit existing sections and author new sections in source-based batches with objectives and coverage blueprints. Deepen the new course assessment samples as the objective audit progresses, and complete the four supplementary parent files. Reconcile supplementary topics with the expanded material.
5. Expand source/overlap navigation as the reviewed hierarchies become actual curriculum nodes. Run `npm run manifest` after changing section counts or question mappings.
6. Run `npm test`, `npm run check`, `npm run check:coverage`, and the browser suites for relevant changes. Strict coverage validation must continue to fail while documents, captures, or missing questions remain unresolved.

### Shortfalls so far

Legacy shortfalls remain in `ai-4-1` (summative 5/10), `ai-5-2` (summative 6/10), `cloud-4-4` (post 4/5, summative 6/10), `cloud-6-3` (summative 6/10), and `cloud-6-4` (summative 7/10). EIP now uses its reviewed objective-based blueprint.

### Pilot fact-check caveat

The pilot's later rewrites (14 questions changed to all four correct, 7 replaced wrong options) have not had a second fact-check. Include `cloud-2` in the Task 24 fact-check.

## Decisions

The spec records most decisions. These came later:

- **Hidden text:** 4 questions (`m2425-21`, `-22`, `-23`, `-40`) use a best reading in brackets with a visible `note`, as the user chose.
- **Merged repeats:** originally 7 pairs. The curriculum audit separated `m2526-11` from `m2425-13`; 3 semantically equivalent pairs remain in `work/past-groups.json`, reviewed in `docs/past-merge-audit.md`. Questions on the same topic with materially different options stay separate.
- **Past question citations:** must be valid pages, but need not sit in the section's range. Generated ones must.
- **Commit trailers:** each commit credits the model that wrote it.
- **Practice feedback:** single-answer and True/False questions reveal immediately on choosing. Multiple-answer questions use a "Submit answer" button. Item numbers turn green or red once revealed, and in every results review.
- **Nationals in the app (2026-11-14):** run inside the reviewer as `n2324:full` and so on, with standalone pages kept as printable versions. A paper opens only after every question is checked against its screenshot. n2324 is scored with its supplied key, and Q10 stays ungraded with its dispute flag. n2425 and n2526 get worked answers citing PDF pages where supported, otherwise `inferred` plus a flag, always labelled unofficial. Supplied explanations are rewritten without option letters. Wrong or Uncertain Nationals answers join the Retry Set.
- **Setup screen (2026-11-14):** for whole papers only (Nationals and earlier mocks), resetting to defaults each time. It offers mode, timer (off, 90 s per question, or custom minutes with auto-submit), original or shuffled question order, option shuffle, number range, types, status filter (wrong, Uncertain or never answered last time), random count, one-at-a-time or one-page layout, auto-advance, and screenshot links. Subset sittings are recorded as Partial and never set Best, Latest or Passed. Mocks no longer switch to shuffled order after the first attempt; shuffling is the user's choice.
- **Course 3:** 11 topics in 3 groups, with the third group (Cloud Data Center and Networking) added for 2 stray questions, as the user chose.

## Review process

Each code task went through an implementer and an independent reviewer. Reviewers must show that each defect comes from a reachable input, because one early report's example could not actually occur. Check reviewer and implementer claims against the code before acting.

## Session log

### 2026-11-14: n2425 reviewed and opened in the app

- Checked all 90 n2425 questions against their screenshots and fixed OCR errors (AI/Al, ECSs, AZs, MLlib, L1, 0, Service, and similar). Worked out every answer, searching the extracted PDFs; 56 cite pages actually read and the rest are `inferred` with caution flags. All carry the note "no official key was supplied".
- Two are ungraded: Q11, where three ELB high-availability designs are all valid, and Q24, where the GES storage claim conflicts with the organizers' n2324 Q75 explanation. Q71 and Q75 are identical on the original paper and both kept. Q62 has a bracketed reading of text hidden by an on-screen icon.
- Regenerated the printable pages. Checks: 118 unit tests, content check at 0 errors, and all three browser suites pass.

### 2026-11-14: n2324 reviewed and opened in the app

- The user approved committing earlier uncommitted work separately (`84ba82a`). Screenshot folders are now git-ignored as source material.
- Checked all 90 n2324 questions against their screenshots and fixed OCR errors in about 30 stems and options (underscores in API names, VMs, NPU, MindIR, AI, I/O, and so on). Rewrote all explanations without option letters. Answers use the supplied key, marked `inferred` with a flag, except the two verified items (Q7, Q9). Q10 stays ungraded with its dispute flag. Flagged doubtful keys: Q39 (Flume rollSize is in bytes), Q42 (key conflicts with its own explanation), and Q47.
- Added `tools/apply-nationals-reviews.js`. Fixed a crash in the Question mappings view for captures with inferred sources, and relabelled their answers "Answer used for scoring". Regenerated the printable n2324 page.
- Checks: 118 unit tests, content check at 0 errors, coverage at 0 errors, and all three browser suites pass. A manual walkthrough of the real n2324 (setup, practice range 9–12, verified-question feedback with citation) showed no page errors.

### 2026-11-14: Nationals setup screen and engine (Part A)

- The user chose to run the Nationals inside the reviewer with a pre-start setup screen; their answers are recorded under Decisions.
- `paper.js` now shuffles questions and options independently and adds `selectSubset`, `questionHistory`, `originalNumber`, and session layout, source and partial fields. `scoring.isGraded` lets ungraded questions show without being scored or entering retry. `testSummary` ignores partial attempts. The loader resolves `n2324:full` and so on from reviewed `inApp` captures, collapses repeated numbers, and exposes `nationalsStatus` and `sourceImages`.
- Added the setup screen, the one-page layout, paper numbers, screenshot links, and Not graded feedback. Results show Partial and ungraded notes. Past Exams shows Nationals cards with printable links and "In review N/M" until a paper is ready. `reconcile-exams.py` copies `inApp` and `flag`.
- Checks: 118 unit tests (including a Nationals content-rules test); content check at 0 errors and 13 warnings; coverage at 0 errors; the full, curriculum and fundamentals browser suites all pass. New full-suite item 18 covers subsets, page layout, custom timer auto-submit, Partial history, gating, a simulated reviewed n2324 with source links, ungraded Q10, and Retry Set entry.

### 2026-11-14: All Nationals questionnaires delivered

- User clarified the immediate deliverable as questionnaires for all past Nationals papers. Created `NationalsQuestionnaires/index.html` and three complete available-source questionnaires, with 90, 90, and 148 available questions respectively. The 2025?26 document retains 150 numbered positions with missing-source markers at 1/94. Repeated question 10 appears once with both screenshot links.
- Added a dashboard link. Each standalone offline HTML paper supports radio/checkbox responses, browser persistence, paper-specific confirmed reset, and printing/Save PDF. The 2023?24 supplied answer key is collapsed and excluded from print. The other papers state that their supplied screenshots have no answer key.
- Restored five incomplete option sets through screenshot inspection, bringing reviewed transcriptions to 15. The partly obscured CBR option uses bracketed text and a visible source note. Full transcription and answer verification remain ongoing, with that limitation stated on the questionnaires.
- Generator is `node tools/build-nationals-questionnaires.js`, using the reconciled exam inventory. Questionnaire production is complete for all available Nationals sources. Broader curriculum expansion and material verification remain separate pending work.
- Browser checks passed for all three papers: counts, original source links, saved responses after reload, multiple-response selection, print-key suppression, duplicate provenance, missing markers, and 390px layout. All 106 unit tests and source-integrity checks passed.



### 2026-11-14: Nationals review started

- User narrowed active work to the Nationals papers. Reviewed n2324 questions 1?10 against screenshots and corrected OCR errors in the Hive and MindSpore text. Source-explanation prose remains OCR and is labeled accordingly.
- Added hash-bound `data/nationals-reviews.json` and reproducible reconciliation into exam inventory. Original OCR values and supplied keys are retained independently.
- Verified CNN question 7 against EI Developer p.190 and backpropagation question 9 against p.47. Both have primary/secondary mapping evidence and enter lesson past sets and retry resolution. Question 9 retains an overlay/transcription caveat in review notes.
- Flagged question 10 for unresolved answer interpretation. Its supplied key C remains recorded, with no graded answer assigned. The other seven reviewed questions have proposed mappings and await supporting material.
- Mapping view now distinguishes reviewed transcription, verified questions, and answer-review issues. Verified records filter by mapped course. Added validation of review hashes/content and regression coverage for practice/retry admission and OCR/key preservation.
- Checks pass: 106 unit tests, inventory integrity, curriculum browser checks, and direct verification of the new status filters. Content checker retains zero errors and 13 existing warnings. Nationals work remains incomplete with 327 captures awaiting complete verification and missing questions 1/94 in n2526.



### 2026-11-14: AI Fundamentals Chapter 1 authoring

- Added a fourth course with the six source lessons and deeper origins, schools, ethics, and learning divisions. Authored notes, local objectives, and pre/post/summative assessments for all 23 new nodes (132 fresh items). Small one-page sections use focused micro-assessments, with further parent-level questions for integration.
- Visually inspected the schools-of-thought diagrams and the context-dependent numerical-representation diagram. Retained timeline contradictions and edition caveats; did not manufacture graded historical dates.
- Added links to overlapping AI Solution lessons while keeping source courses separate. Verified one previously inferred past answer from EI Developer and mapped two overfitting questions to relevant secondary lessons, explicitly distinguishing introductory context from detailed answer evidence.
- Improved direct page citations and nested-leaf presentation. Updated structure validation to recurse through deeper lessons and allow substantive lessons without children.
- Checks: 104 unit tests; zero content errors and 13 existing warnings; source integrity passes; full browser, curriculum browser, and new fundamentals browser suites pass. New browser test loads every new section, checks nested navigation, direct PDF page URLs, mapped past sets, and mobile layout.
- Whole-project completion is still pending. Source-wide review flags remain unset, and 329 Nationals capture drafts still await full review/mapping.



### 2026-11-14: Course assessments and source-structure review

- Continued under the user's instruction to finish the expansion. The whole request remains incomplete; do not treat the zero-error legacy content check as source coverage completion.
- Authored 101 fresh questions after reading cited supplied pages. AI course now has 61/20/20 items; Cloud course has 60/30/30. Added objective metadata, variable-count blueprints, and explicit scope notes. Both course records remain `partial-review`.
- Confirmed all 120 original pretest questions retain IDs, stems, options, keys, explanations, and sources. Reviewed option lengths and revised distractors and multiple-response sets. The manifest reflects 2,033 generated questions.
- Content validation: zero errors, 13 warnings. Unit tests: 103 passing. Full browser checklist and curriculum browser suite passed; direct offline checks loaded both new course tests and confirmed coverage of all 20 AI and 30 Cloud sublessons.
- Read edition-context PDFs and recorded their different training and certification weightings without assuming Nationals weights. Read AI Fundamentals Chapter 1 text and recorded its six lessons, deeper divisions, and unresolved historical/terminological issues. No source-wide completion flags were set.



### 2026-11-13: Merge review and NAT Gateway audit

- User confirmed continuing without missing Nationals questions 1/94; their gaps remain explicit.
- Compared all six remaining merged pairs. Separated PaaS, connectivity, and EVS variants with different distractors. Retained three equivalent pairs with documented option correspondence; 177 canonical questions remain across 180 occurrences. All 180 original IDs, stems, options, answers, explanations, sources, and primary mappings were checked unchanged.
- Read NAT Gateway source pages 186?199 and visually inspected the architecture/direction diagrams. Added four objectives, objective links for notes and tests, a justified 6/6/10 blueprint, two fresh questions, a worked scenario, edition context, and a source-typo clarification. Preserved all 20 original NAT questions and linked back to EIP.
- Regenerated the manifest. Verification: 103 unit tests, source integrity, and curriculum browser suite pass. Content validation retains four baseline empty-course errors and 13 warnings (six legacy count shortfalls, four missing parent files, three retained merge wording differences).


### 2026-11-13: First curriculum expansion batch

- Added reproducible PDF/source inventory and Windows OCR tooling, source/key provenance, reconciliation reports, and inventory integrity validation.
- Extracted 5,044 PDF pages and 329 exam captures, with slide OCR recovering the raster Cloud Service Solutions Architect material. Identified 2025–26 missing questions 1/94 and repeated capture 10.
- Added the three offline resource views, secondary mapping support, objective links, coverage-blueprint validation, and an audited EIP lesson with three added questions and richer notes.
- Corrected one semantic merge and verified one inferred shared-bandwidth answer against the expanded sources. Preserved graded answer values and original question IDs.
- Regenerated the manifest, making previously omitted existing course/supplementary content visible as well as adding the EIP objective coverage.
- Fixed two browser-test fixture assumptions exposed by the current data: a practice screenshot set may have only one single-answer question, and an earlier mock practice attempt must be isolated from a first-attempt ordering test.
- Verification reached 103 unit tests and both browser suites passing. Four existing empty-assessment errors and the broader authoring/review backlog remain.

### 2026-11-13: Curriculum expansion planning

- Inspected current structure, section data, past data, loaders, progress logic, manifest generation, validation rules, and all PDF metadata.
- Ran unit tests (96 passing) and content validation (four errors, 18 warnings).
- Confirmed scope and preferences with the user, including excluding seven lab guides and using all three Nationals screenshot folders.
- Saved the phased expansion plan with source inventory, mapping and provenance rules, content/assessment coverage, UI scope, compatibility checks, and acceptance criteria.
- Changes in this planning session are limited to the plan and this progress record. Curriculum implementation and full source reconciliation remain pending.

### First session, started 2026-11-04: Design through pilot

- Agreed the requirements with the user, and wrote the spec and plan.
- Built and reviewed the core logic and all screens. Reviews found real bugs, now fixed, including tabs overwriting each other's progress and stale answers being scored.
- Transcribed all 190 photos into 180 questions. Fact-checks: two runs of one batch agreed 24/24, and a blind check of 27 agreed 26/27. The disagreement (`m2324-49`) is flagged. 96 of 180 past answers are AI-inferred.
- Built the pilot. A fact-check of 25 sampled questions found 0 wrong answers and 7 with style, wording, or ambiguity problems.
- Hit the plan's 5-hour usage limit once and resumed safely. Expect more stops during bulk writing.
- Moved the browser test script into the repo, and added `CLAUDE.md` and this file.

### Pilot review fixes, 2026-11-05
- User approved the pilot (Task 21) and asked for practice-mode feedback changes, which another agent is making.
- Applied the 7 fact-check fixes, including the `m2526-53` explanation (also in `work/past-answered/b08.json`).
- Added "Quality rules learned from the pilot" to `docs/content-brief.md`.
- Reworked the pilot chapter against those rules: multiple-answer questions with all 4 correct went from 0 to 16 of 55, and obviously wrong distractors were replaced with plausible ones.
- Check result: 96/96 unit tests pass, and the checker reports only `unknown section beyond-pending`.

### 2026-11-06: Bulk writing

- The user approved the pilot and asked for instant practice feedback and coloured item numbers, now done.
- Added Course 3 (11 topics), mapped its 63 past questions, and wrote all 30 Cloud subchapters.
- Hit the 5-hour usage limit a second time, and resumed the interrupted AI sections.

### 2026-11-12 to 13: Chapter files

- Wrote `cloud-5`, `cloud-6` and `ai-1` to `ai-6`, 40 questions each with no shortfalls. A third usage-limit stop interrupted six writers; all resumed and finished.
- Check result: 96/96 unit tests, checker at 0 errors.
- Started the course files and Course 3 subchapters.

### Nationals navigation fix
- Added all three Nationals questionnaire links directly to the Past Exams screen after the user could not find them there. Browser check confirmed the three links and successful opening of the 90-question 2023-24 paper.

