# Complete curriculum coverage and past-exam mapping

Date: 2026-11-13

Status: Implementation in progress. Source extraction, draft exam reconciliation, initial resource views, mapping support, and the first objective-audited lesson are implemented. Full hierarchy review, exam verification/mapping, and curriculum authoring remain pending. See `docs/PROGRESS.md` for current counts and verification.

## Outcome

Expand the existing offline reviewer so every instructional lesson in the included study materials has detailed revision notes, pretests, post-tests, and summative assessments. Account for every provided past-exam question and connect it to a primary lesson and all relevant secondary lessons. Expose curriculum coverage, source references, and question mappings in the app.

## Confirmed user decisions

- Include `HuaweiCloudNationals(2324Answer)`, `HuaweiCloudNationals(2425)`, `HuaweiCloudNationals(2526)`, and `HUAWEI PAST EXAMS`. The repeated 2425 path meant 2526.
- Exclude lab guides for this phase.
- Keep each course's source hierarchy and link overlapping lessons across courses.
- Write detailed revision notes designed to accompany the PDFs.
- Give each unique past question one primary lesson and all relevant secondary lessons.
- Keep original questions in lesson past-exam sets and full papers. Write fresh questions for pretests, post-tests, and summatives.
- Determine assessment sizes from learning-objective coverage and lesson depth.
- Preserve supplied exam keys separately, verify against supplied materials, and flag unresolved conflicts.
- Include coverage, source-reference, and question-mapping views.
- Preserve offline file-based use, saved attempts, scoring, and existing test behavior.

## Verified baseline

The initial audit loaded the saved data files and ran the existing checks.

| Area | Observed state |
| --- | --- |
| Source PDFs | 22, comprising eight training PDFs, seven lab guides, two fundamentals PDFs, one pre-course PDF, and four version-instruction PDFs |
| Included PDFs after lab exclusion | 15 |
| Existing source-based courses | HCIA-AI Solution V1.0 and HCIA-Cloud Service V3.5 |
| Existing supplemental course | Beyond the Course Material |
| Structure | 79 nodes across three courses, 15 chapters, and 61 subchapters |
| Saved section files | 75 |
| Generated questions | 1,795 |
| Past questions | 180 occurrences, 173 canonical questions under the existing seven merges |
| Past answers labelled inferred | 96 occurrences |
| New screenshot files | 90 in 2324Answer, 90 in 2425, 149 in 2526 |
| Original exam photographs | 190 HEIC files in HUAWEI PAST EXAMS |
| Unit tests | 96 passing |
| Content validation | Four errors and 18 warnings |

The four errors are empty post-tests and summatives in the `ai` and `cloud` course files. The four absent sections are `beyond`, `beyond-1`, `beyond-2`, and `beyond-3`. Seven tests have documented count shortfalls. Seven warnings request review of merged questions with differing option wording.

The two PDFs in HUAWEI PAST EXAMS match their HuaweiStudyMaterial counterparts byte for byte. Screenshot counts are file counts. Their distinct questions, answer keys, and relationships to existing papers require reconciliation.

Existing documentation describes an earlier production state. The current audit is the starting point for this expansion. Full source-page coverage and factual accuracy have not yet been audited.

## Included study sources

| Source | PDF pages | Planning treatment |
| --- | --- | --- |
| AI-Fundamentals-at-a-glance-1.pdf | 49 | Inventory instructional hierarchy and objectives |
| AI-Fundamentals-at-a-glance-2.pdf | 77 | Inventory instructional hierarchy and objectives |
| HCIA-AI Solution V1.0 Training Material.pdf | 387 | Audit and expand existing course |
| HCIA-AI V4.0 Training Material.pdf | 473 | Add source-based course hierarchy |
| HCIA-Cloud Computing V5.5 Pre-Course.pdf | 236 | Inventory prerequisite lessons and source relationships |
| HCIA-Cloud Computing V5.5 Training Material.pdf | 493 | Add source-based course hierarchy |
| HCIA-Cloud Service V3.5 Training Material.pdf | 404 | Audit and expand existing course |
| HCIP-AI-EI Developer V2.5 Training Material.pdf | 637 | Add source-based course hierarchy |
| HCIP-Cloud Computing Solution Architect V1.0 Training Material.pdf | 779 | Add source-based course hierarchy |
| HCIP-Cloud Computing V5.0 Training Material.pdf | 895 | Add source-based course hierarchy |
| HCIP-Cloud Service Solutions Architect V3.0 Training Material.pdf | 604 | Add source-based course hierarchy |
| HCIA-AI Solution V1.0 Version Instructions.pdf | 2 | Read and account for instructional content and edition context |
| HCIA-AI V4.0 Version Instruction.pdf | 2 | Read and account for instructional content and edition context |
| HCIP-AI EI Developer V2.5 Version Instructions.pdf | 3 | Read and account for instructional content and edition context |
| HCIP-Cloud Computing Solution Architect V1.0 Version Instructions.pdf | 3 | Read and account for instructional content and edition context |

Version documents and front matter must be inspected before deciding whether they contain teachable objectives. Record metadata-only sections explicitly in the source inventory. Extract the actual lesson structure from contents and pages. Repeated contents slides require reconciliation. Final lesson counts and the placement of standalone fundamentals and pre-course materials depend on that evidence.

## Phase 1 — Reconcile sources and inventory lessons

1. Register every included document and exam image with a stable source ID, exact relative path, edition/year where evidenced, file hash, and page or image count.
2. Extract all included PDFs into per-page text under the existing scratch area. Preserve physical one-based PDF pagination. Inspect diagrams or tables visually whenever extraction loses instructional content.
3. Read contents, bookmarks, and actual pages to build each source's hierarchy. Record full titles, page ranges, prerequisite relationships, and learning objectives.
4. Account for every page with an instructional lesson or a recorded reason such as front matter, repeated contents, recap, or edition metadata. Record unreadable pages as unresolved coverage.
5. Compare each existing lesson's notes and questions against its objectives. Mark coverage by objective, with separate statuses for inventoried, drafted, source-verified, and app-verified.
6. Group overlapping lessons with explicit links while retaining their source-specific scope, ordering, terminology, and editions.

Deliverables are a source register, a complete lesson/objective inventory, and an existing-content gap report. The inventory establishes the actual work volume and batch sequence.

## Phase 2 — Reconcile the complete exam pool

1. Compare all 329 screenshots, the 190 original photographs, and the existing 180 transcriptions. Match paper identity and question numbers using visible evidence.
2. Record original text, options, question type, image references, paper/year, original question number, supplied answer markings, and transcription confidence for every occurrence.
3. Distinguish an answer key from a participant's selected answer using the visible UI or document evidence. Record ambiguous markings without asserting key authority.
4. Review the seven existing merges. Deduplicate only when wording, option meaning, type, and answer interpretation support the same canonical question. Keep occurrence records for all papers.
5. Preserve the supplied key and the verified grading answer in separate fields. Record the supporting sources and the exact conflict when they disagree.
6. Recheck all 96 currently inferred past-answer occurrences against the expanded supplied materials. Retain explicit unresolved status where the materials do not settle an answer.
7. Produce a reconciliation report listing missing numbers, extra questions, duplicate captures, uncertain transcriptions, and key conflicts. Do not infer completeness from screenshot counts.

Deliverables are the reconciled occurrence register, canonical question bank, and answer-verification report.

## Phase 3 — Map questions and define assessment coverage

1. Assign each canonical past question one primary lesson and every relevant secondary lesson. Each link identifies the tested objective and explains the relationship.
2. Include a question in each directly mapped lesson's past set. Aggregate ancestor sets using canonical question IDs so a question appears once per set even when several descendants match it.
3. Preserve full papers through occurrence records in original paper order, including repeated occurrences. Keep original option order for first attempts under existing behavior.
4. Reassess the supplementary course against the expanded inventory. Link its existing lessons to matching source lessons and add verified source references where supported. Retain stable IDs and navigation for existing history. Record any topics still beyond the supplied sources.
5. Create an assessment blueprint per lesson, chapter, and course. List the objectives, question types, reasoning demand, and planned item counts for each test.
6. Choose counts from the objective inventory and depth. Pretests diagnose prerequisites and misconceptions, post-tests cover the taught objectives, and summatives integrate the scope of their node. Every child lesson must be represented in its parent's summative.
7. Preserve single-choice, multiple-response, and true/false formats. Derive their distribution from the assessment blueprint. Record the reason for each chosen size and any outstanding objective gap.

Deliverables are a complete mapping matrix and an assessment blueprint. Exact question totals become available after this phase.

## Phase 4 — Extend data and validation support

Implement additive changes around the existing classic-script HR namespace and on-demand data loading.

| Existing component | Required change |
| --- | --- |
| Source metadata and extraction tooling | Support all included PDFs, page references, exam images, and evidence records |
| data/structure.js | Register source-derived courses and lesson hierarchies with overlap links |
| Section data | Connect note blocks and questions to objectives and verified source references |
| Past data and tools/write-past.js | Preserve occurrences and keys, support primary/secondary mappings, and make rebuilds retain corrections |
| js/core/loader.js | Resolve lesson and ancestor past sets across all mappings with canonical deduplication |
| tools/build-manifest.js | Derive accurate counts from the expanded mapping and objective data |
| tools/check-content.js | Validate declared assessment blueprints, objective coverage, mappings, provenance, and source paths |
| Existing structural tests | Replace hard-coded curriculum totals with source-inventory invariants |
| Documentation | Update the content brief, writer instructions, design scope, and progress record to reflect the approved decisions |

Keep existing question IDs, section IDs, and test keys stable. Add IDs for new material. Historical results must remain interpretable when questions are revised. Inspect the stored attempt schema before implementing revision references or a compatible snapshot strategy. Test old backups and active sessions against the actual changes.

Maintain existing raw-point scoring of 16/18/16 for single/multiple/true-false questions, exact-set multiple-response grading, the 60% pass rule, existing feedback modes, timers, retakes, retry behavior, and persistence. Assessment totals follow their selected items and weights.

Coverage validation must distinguish an existing file from verified instructional coverage. Validate foreign keys, source-page bounds, complete source accounting, objective links, canonical references, primary mapping cardinality, secondary mapping uniqueness, and ancestor deduplication. Require verified source support before a generated answer is marked source-verified.

## Phase 5 — Author and review content in complete batches

Use course/chapter batches derived from the inventory. Start by auditing existing AI and Cloud Service content and resolving incomplete assessments within their approved blueprints. Continue with prerequisite and additional course batches according to documented dependencies.

For each batch complete this sequence.

1. Verify all source objectives and supporting pages.
2. Write detailed revision notes covering definitions, mechanisms, meaningful comparisons, formulas, processes, misconceptions, and brief examples where useful.
3. Link overlapping lessons, source references, and past questions to the relevant explanations. A linked overlap supplements the course-specific notes.
4. Write fresh pretest, post-test, and summative questions from the blueprint. Check against the existing question bank and original exams for substantive duplication.
5. Verify each answer and explanation against the cited pages, including option-level reasoning for multiple-response items.
6. Review plausible distractors, misleading absolutes, answer-length cues, answer-position patterns, technical conditions, and edition conflicts.
7. Validate saved files, regenerate the manifest, and exercise the completed lessons through the app.
8. Update coverage statuses and the remaining-work ledger with exact counts and unresolved issues.

Read the quiz-writer skill before assessment authoring and apply its relevant question-quality guidance alongside the user's chosen app behavior and assessment sizing. The approved app and source hierarchy determine the delivery format.

## Phase 6 — Add the three app views

| View | Required information and actions |
| --- | --- |
| Coverage | Course-to-lesson navigation, objective coverage for notes/pre/post/summative, source-verification status, mapped past-question counts, and links to incomplete or unresolved areas |
| Sources | Document title, edition, exact local reference, physical PDF page numbers, and navigation from notes/questions to their supporting references |
| Question mappings | Search/filter by paper, topic, course, and verification status; display primary and secondary lesson links, original occurrences, supplied key, verified answer, evidence, and conflict flags |

Make objective coverage and learner completion visibly distinct. Existing read marks and attempt history continue to drive learner progress. The mapping view must respect existing answer-reveal behavior when reached during an assessment. Answer and key details belong in review contexts.

Verify local PDF/image reference behavior in the target browser from file://. All new app data must load through the existing offline-compatible mechanism. Source file access and missing-file messages must be tested with the actual project paths.

## Phase 7 — Verify the completed reviewer

Run focused regression checks for multiple lesson mappings, canonical deduplication, occurrence preservation, old-data fallback, revised-question history, variable assessment sizes, source references, and coverage calculations. Reuse existing tests and add tests for the new behaviors they cannot currently exercise.

Run the content checker in strict mode against the approved inventory and blueprints. Perform a complete content review of included lessons, generated answer evidence, and exam mappings. Sampling may supplement that review but cannot establish complete coverage.

Run browser checks from file:// for the expanded curriculum and all three new views. Exercise notes, assessment entry points, answer revelation, refresh/resume, timers, retakes, retry sets, scoring, history, backup/restore, and old saved state. Check a question mapped to several children and courses for duplicate display and correct counts.

## Acceptance criteria

- All 15 included PDFs have been read and accounted for through instructional lessons or explicit non-instructional classifications.
- Every included lesson/sublesson has detailed revision notes and pre/post/summative tests under its blueprint. Chapter and course tests integrate their corresponding scope.
- Every instructional objective has verified note and post-test coverage plus traceable summative coverage. Pretests have explicit prerequisite/diagnostic coverage appropriate to the lesson.
- Every exam image is reconciled to occurrence records or a documented duplicate/unresolved record.
- Every legible unique past question has one verified primary mapping and all supported secondary mappings. Unreadable questions remain explicit unresolved records until resolved.
- Original paper occurrences, supplied keys, verified answers, and evidence remain traceable.
- Every generated question has a checked answer, explanation, objective link, and supporting source reference. Any source gap is visible and prevents a complete verified-coverage claim.
- Lesson and ancestor past sets contain each matching canonical question once. Full papers preserve all original occurrences.
- The coverage, source-reference, and question-mapping views work offline through normal navigation.
- Existing attempts, backups, active sessions, scoring, and test behavior pass compatibility checks.
- Strict content validation and relevant automated/browser checks pass. The final report lists actual source, lesson, objective, question, and mapping counts and every unresolved item.

## Execution dependencies and remaining evidence

The user's preferences are resolved for this plan. Inventory work must establish the final lesson counts, the instructional role of each version document, standalone fundamentals/pre-course placement, screenshot-to-paper correspondence, and exact assessment sizes. These are evidence-dependent outputs. Record any additional preference decision only if inspection reveals a material choice that cannot be resolved from the confirmed scope.

Planning does not claim that the current questions or mappings are factually verified. The first implementation milestone is the source inventory and reconciliation report. Subsequent work proceeds through the dependency order above, with exact remaining work recorded after each batch.
