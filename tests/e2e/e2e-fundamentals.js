const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('url');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const base = pathToFileURL(path.resolve(__dirname, '../../index.html')).href;
    await page.goto(base + '#/course/fundamentals1');
    await page.getByRole('heading', { name: 'AI Fundamentals — Chapter 1: AI at First Glance', exact: true }).waitFor();
    await page.getByRole('link', { name: '1.5 Ethics and Security in AI', exact: true }).count().then(async (count) => {
      // Chapter headings are summaries; their notes links lead into the nested hierarchy.
      if (count) await page.getByRole('link', { name: '1.5 Ethics and Security in AI', exact: true }).click();
      else await page.goto(base + '#/s/fundamentals1-5');
    });
    await page.getByRole('link', { name: '1.5 (3) Survivorship bias and missing populations', exact: true }).click();
    await page.getByRole('heading', { name: '1.5 (3) Survivorship bias and missing populations', exact: true }).waitFor();
    const sourceLink = page.locator('a[href*="AI-Fundamentals-at-a-glance-1.pdf#page=34"]').first();
    assert.equal(await sourceLink.count(), 1);
    assert.match(await page.locator('#view').innerText(), /Ask whose examples are missing/);
    await page.setViewportSize({ width: 390, height: 844 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: 'work/e2e/fundamentals-nested-mobile.png', fullPage: true });
    const result = await page.evaluate(async () => {
      const nodes = HR.progress.allNodes(HR.data.structure).filter(({ path }) => path[0].id === 'fundamentals1');
      await Promise.all(nodes.map(({ node }) => HR.loader.loadSection(node.id)));
      return nodes.map(({ node }) => {
        const s = HR.data.sections[node.id];
        return { id: node.id, notes: s.notes.length, tests: Object.values(s.tests).map((qs) => qs.length) };
      });
    });
    assert.equal(result.length, 23);
    for (const section of result) {
      assert.ok(section.notes > 0, section.id);
      assert.ok(section.tests.every((count) => count > 0), section.id);
    }
    await page.goto(base + '#/s/fundamentals1-3-2');
    await page.getByText('Training versus use of a learned network', { exact: true }).waitFor();
    assert.match(await page.locator('#view').innerText(), /Past Exam Set/);
    const citation = await page.evaluate(() => HR.ui.sourceBadge(HR.data.sections['fundamentals1-3-2'].tests.post[0]).outerHTML);
    assert.match(citation, /AI-Fundamentals-at-a-glance-1\.pdf#page=26/);
    assert.deepEqual(errors, []);
    console.log('PASS fundamentals hierarchy, all 23 section loads, PDF page links, mapped past set, and mobile layout');
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
