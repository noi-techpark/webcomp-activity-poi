// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Full headless UX smoke for Activity & POI rework.
 * Serves dist/ on :3456 (or uses PORT env).
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const PORT = Number(process.env.SMOKE_PORT || 3456);

function contentType(file)
{
	if (file.endsWith('.js')) return 'application/javascript';
	if (file.endsWith('.css')) return 'text/css';
	if (file.endsWith('.png')) return 'image/png';
	if (file.endsWith('.svg')) return 'image/svg+xml';
	if (file.endsWith('.json')) return 'application/json';
	return 'text/html';
}

function startStaticServer()
{
	const dist = path.join(root, 'dist');
	const server = http.createServer((req, res) =>
	{
		const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
		const rel = urlPath === '/' ? '/index.html' : urlPath;
		const file = path.join(dist, rel);
		if (!file.startsWith(dist) || !fs.existsSync(file) || fs.statSync(file).isDirectory())
		{
			res.writeHead(404);
			res.end('not found');
			return;
		}
		res.writeHead(200, { 'Content-Type': contentType(file) });
		fs.createReadStream(file).pipe(res);
	});
	return new Promise((resolve) =>
	{
		server.listen(PORT, '127.0.0.1', () => resolve(server));
	});
}

function findChrome()
{
	const candidates = [
		process.env.CHROME_PATH,
		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		'/Applications/Chromium.app/Contents/MacOS/Chromium',
		'/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
		'/usr/bin/google-chrome',
		'/usr/bin/chromium-browser'
	].filter(Boolean);
	for (const c of candidates)
	{
		if (fs.existsSync(c)) return c;
	}
	return null;
}

async function main()
{
	const chrome = findChrome();
	if (!chrome)
	{
		console.error('No Chrome/Chromium found — skip browser smoke');
		process.exit(2);
	}

	const server = await startStaticServer();
	const browser = await chromium.launch({ executablePath: chrome, headless: true });
	const page = await browser.newPage();
	const errors = [];
	page.on('pageerror', (err) => errors.push(String(err)));
	page.on('console', (msg) =>
	{
		if (msg.type() === 'error') errors.push('console: ' + msg.text());
	});

	await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle', timeout: 60000 });

	await page.waitForFunction(() => !!document.querySelector('odh-activity-poi')?.shadowRoot, null, { timeout: 30000 });

	const result = await page.evaluate(async () =>
	{
		const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
		const host = document.querySelector('odh-activity-poi');
		const root = host.shadowRoot;
		const categories = root.querySelector('categories-choice');
		const search = root.querySelector('search-items');
		const map = root.querySelector('interactive-map');
		const picker = root.querySelector('wc-languagepicker');

		const deadline = Date.now() + 25000;
		while (Date.now() < deadline)
		{
			const n = categories.shadowRoot?.querySelectorAll('div.dropdownCategory').length || 0;
			if (n >= 8) break;
			await sleep(200);
		}

		const catCount = categories.shadowRoot.querySelectorAll('div.dropdownCategory').length;
		const l2 = categories.shadowRoot.querySelectorAll('.subCategoryItem:not(.nested)').length;
		const l3 = categories.shadowRoot.querySelectorAll('.subCategoryItem.nested').length;

		// Language picker (shared wc-languagepicker)
		const langBtn = picker?.shadowRoot?.querySelector('wc-button');
		langBtn?.click();
		await sleep(250);
		const langMenu = picker?.shadowRoot?.querySelector('.languagePicker__menu');
		const langItems = [...(langMenu?.querySelectorAll('.languagePicker__menu__element') || [])].map((el) => el.textContent.trim());
		// choose IT
		langMenu?.querySelectorAll('.languagePicker__menu__element')?.[0]?.click();
		await sleep(800);

		// Select museums
		const checkbox = categories.shadowRoot.querySelector('input[value="museums"]')
			|| categories.shadowRoot.querySelector('input[type="checkbox"]');
		if (!checkbox)
		{
			return { ok: false, reason: 'no checkbox', catCount };
		}
		checkbox.click();
		await sleep(4000);

		let items = [];
		let mapList = [];
		try { items = JSON.parse(search.getAttribute('items') || '[]'); } catch (e) {}
		try { mapList = JSON.parse(map.getAttribute('items') || '[]'); } catch (e) {}

		let detailOpened = false;
		let detailMinimized = false;
		let detailRestored = false;
		let detailClosed = false;
		let title = '';

		const resultRow = search.shadowRoot.querySelector('.searchInstance');
		if (resultRow)
		{
			resultRow.click();
			await sleep(2500);
			const itemContainer = root.querySelector('#itemContainer');
			detailOpened = itemContainer && itemContainer.style.display !== 'none' && !itemContainer.classList.contains('minimized');
			title = root.querySelector('item-visualizer')?.shadowRoot?.querySelector('#Title p')?.textContent || '';

			const minimizeBtn = root.querySelector('item-visualizer')?.shadowRoot?.querySelector('#minimizebutton');
			minimizeBtn?.click();
			await sleep(300);
			const restoreTab = root.querySelector('#itemRestoreTab');
			detailMinimized = itemContainer.style.display === 'none' && restoreTab && !restoreTab.hidden;
			restoreTab?.click();
			await sleep(300);
			detailRestored = itemContainer.style.display !== 'none' && restoreTab.hidden;

			const closeBtn = root.querySelector('item-visualizer')?.shadowRoot?.querySelector('#closebutton');
			closeBtn?.click();
			await sleep(300);
			detailClosed = itemContainer.style.display === 'none' && restoreTab.hidden;
		}

		// Deselect → clear
		checkbox.click();
		await sleep(1500);
		let afterClear = [];
		try { afterClear = JSON.parse(search.getAttribute('items') || '[]'); } catch (e) {}

		// Text search
		await search.on_search_text_changed('Museum');
		await sleep(3500);
		let textSearch = [];
		try { textSearch = JSON.parse(search.getAttribute('items') || '[]'); } catch (e) {}

		const oddRequestsOk = typeof categories.oncategorychange === 'function';

		return {
			ok: catCount >= 8
				&& l2 > 0
				&& l3 > 0
				&& items.length > 0
				&& mapList.length > 0
				&& detailOpened
				&& detailMinimized
				&& detailRestored
				&& detailClosed
				&& afterClear.length === 0
				&& textSearch.length > 0
				&& !!picker
				&& langItems.length >= 3
				&& host.getAttribute('language') === 'it'
				&& oddRequestsOk,
			catCount,
			l2,
			l3,
			items: items.length,
			mapItems: mapList.length,
			detailOpened,
			detailMinimized,
			detailRestored,
			detailClosed,
			clearedAfterDeselect: afterClear.length === 0,
			textSearch: textSearch.length,
			title: title.slice(0, 80),
			tagValue: checkbox.value,
			langItems,
			language: host.getAttribute('language'),
			callbackWired: oddRequestsOk
		};
	});

	console.log(JSON.stringify(result, null, 2));
	const critical = errors.filter((e) =>
		!/favicon/i.test(e)
		&& !/Failed to load resource/i.test(e)
	);
	if (critical.length)
	{
		console.log('page errors:', critical.slice(0, 20));
	}

	await browser.close();
	server.close();

	if (!result.ok || critical.length)
	{
		console.error('BROWSER SMOKE FAILED');
		process.exit(1);
	}
	console.log('BROWSER SMOKE PASSED');
}

main().catch((err) =>
{
	console.error(err);
	process.exit(1);
});
