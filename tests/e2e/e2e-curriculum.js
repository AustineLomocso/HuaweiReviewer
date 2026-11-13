// Offline browser checks for inventory navigation and draft/answer presentation.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('path');
const { pathToFileURL } = require('url');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  try {
    const page = await browser.newPage();
    const failures = [];
    page.on('pageerror', (error) => failures.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') failures.push(message.text()); });
    const base = pathToFileURL(path.resolve(__dirname, '../../index.html')).href;
    await page.goto(base);
    await page.getByRole('link', { name: 'Coverage', exact: true }).click();
    await page.getByRole('heading', { name: 'Curriculum coverage' }).waitFor();
    assert.match(await page.locator('#view').innerText(), /15 included PDFs, 5044 pages/);
    assert.match(await page.locator('#view').innerText(), /Objective-by-objective verification is pending/);
    await page.getByRole('link', { name: 'Sources', exact: true }).click();
    await page.getByRole('heading', { name: 'Study sources' }).waitFor();
    assert.equal(await page.getByRole('link', { name: 'Open PDF', exact: true }).count(), 15);
    const firstPdf = page.getByRole('link', { name: 'Open PDF', exact: true }).first();
    const href = await firstPdf.getAttribute('href');
    assert.match(href, /HuaweiStudyMaterial\/.*\.pdf#page=1$/);
    const pdfTabPromise = page.waitForEvent('popup');
    await firstPdf.click();
    const pdfTab = await pdfTabPromise;
    await pdfTab.waitForLoadState('load');
    assert.ok(pdfTab.url().startsWith('file:///'));
    await pdfTab.close();
    await page.getByRole('link', { name: 'Question mappings', exact: true }).click();
    await page.getByRole('heading', { name: 'Question mappings' }).waitFor();
    assert.match(await page.locator('#view').innerText(), /177 existing canonical questions and 329 national-stage captures/);
    await page.getByLabel('Filter paper').selectOption('n2324');
    await page.getByLabel('Search questions').fill('not a good match for Spark SQL');
    assert.equal(await page.locator('article').count(), 1);
    const draft = page.locator('article');
    const details = draft.locator('details');
    assert.equal(await details.getAttribute('open'), null);
    assert.equal(await draft.getByText('Supplied key as extracted — D').isVisible(), false);
    await details.locator('summary').click();
    assert.equal(await draft.getByText('Supplied key as extracted — D').isVisible(), true);
    assert.match(await draft.getByRole('link', { name: 'Open source screenshot' }).getAttribute('href'), /HuaweiCloudNationals/);
    await page.getByLabel('Filter course').selectOption('cloud');
    assert.equal(await page.locator('article').count(), 0);
    await page.getByLabel('Filter paper').selectOption('');
    await page.getByLabel('Search questions').fill('');
    assert.ok(await page.locator('article').count() > 0);
    assert.equal(await page.getByRole('button', { name: 'Show more' }).isVisible(), true);
    await page.getByRole('button', { name: 'Show more' }).click();
    assert.ok(await page.locator('article').count() > 25);
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.deepEqual(failures, []);
    console.log('PASS offline coverage, sources, PDF opening, mappings, filters, pagination, collapsed keys, and mobile layout');
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
