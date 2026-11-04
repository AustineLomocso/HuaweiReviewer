# Browser checks

Run against `file:///C:/Users/austi/HuaweiReviewer/index.html`, with no console errors throughout.

1. Dashboard shows courses, Past Exams, Weak topics and Backup.
2. Section: mark notes read, reload, still marked.
3. Pre-Test: answer 2 questions, reload, answers and position are restored.
4. Timer: start a timed test, set the deadline a few seconds ahead through `localStorage`, reload, test submits automatically at zero.
5. Submit: results show points, percent, pass/fail, type breakdown and full review. Source labels appear.
6. Multi-answer: partly correct selection earns 0.
7. Retake: question or option order changes, and attempt count rises.
8. Past set in Practice: no timer option, Check answer shows feedback and locks the question. Practice does not change Best.
9. Full mock: first attempt is in original order, 25/20/15, 1000 points.
10. Retry set: wrong answers appear on the dashboard, and a correct retry removes them.
11. Weak topics: a score below 60% lists the section. A newer passing score removes it.
12. Backup: download, clear `localStorage`, reload, restore, progress returns. Restoring an invalid file shows an error and changes nothing.
13. Storage blocked: override `localStorage` to throw, reload, warning banner appears.
14. Width 390px: no sideways page scroll, test screen is usable.
