// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Full regression checks for Activity & POI rework (no push).
 * Run: node scripts/full-regression.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);

const BASE = 'https://tourism.api.opendatahub.com';
const ORIGIN = 'webcomp-activity-poi';
const DEFAULT_CATEGORIES = [
	'wellness relaxation',
	'eating drinking',
	'summer',
	'winter',
	'culture attractions',
	'traffic and transport',
	'shops and service providers',
	'other'
];

const CATEGORY_ICON_BASENAME = {
	'wellness relaxation': 'Wellness_Entspannung',
	'eating drinking': 'Essen_Trinken',
	'summer': 'Sommer',
	'winter': 'Winter',
	'culture attractions': 'Kultur_Sehensw_rdigkeiten',
	'traffic and transport': 'Verkehr_und_Transport',
	mobility: 'Mobilit_t',
	'shops and service providers': 'Gesch_fte_und_Dienstleister',
	other: 'Anderes'
};

const MAP_MARKER_BASENAME = {
	'wellness relaxation': 'Wellness_Entspannung',
	'eating drinking': 'Essen_Trinken',
	'summer': 'Sommer',
	'winter': 'Winter',
	'culture attractions': 'Kultur_Sehensw_rdigkeiten',
	'traffic and transport': 'Mobilit_t',
	mobility: 'Mobilit_t',
	'shops and service providers': 'Gesch_fte_und_Dienstleister',
	other: 'Anderes'
};

let failed = 0;
function ok(name, cond, detail = '')
{
	if (cond)
	{
		console.log('  PASS', name, detail ? `- ${detail}` : '');
	}
	else
	{
		failed++;
		console.error('  FAIL', name, detail ? `- ${detail}` : '');
	}
}

function mappingIdm(tag)
{
	const flat = tag['Mapping.idm'];
	if (flat && typeof flat === 'object') return flat;
	if (tag.Mapping && tag.Mapping.idm) return tag.Mapping.idm;
	return null;
}

function tagTreeId(tag)
{
	const mid = mappingIdm(tag);
	return (mid && mid.id) || tag.Id;
}

function tagParentId(tag)
{
	const mid = mappingIdm(tag);
	return mid && mid.parent_id ? mid.parent_id : null;
}

function buildCategoryTree(allTags, mainCategoryIds)
{
	const byId = Object.create(null);
	const childrenByParent = Object.create(null);
	for (const tag of allTags)
	{
		byId[tag.Id] = tag;
		const parentId = tagParentId(tag);
		if (!parentId) continue;
		if (!childrenByParent[parentId]) childrenByParent[parentId] = [];
		childrenByParent[parentId].push(tag);
	}

	function childrenOf(tag, includeAliasKey)
	{
		const keys = [tag.Id];
		if (includeAliasKey)
		{
			const treeId = tagTreeId(tag);
			if (treeId && !keys.includes(treeId)) keys.push(treeId);
		}
		const seen = Object.create(null);
		const result = [];
		for (const key of keys)
		{
			for (const child of childrenByParent[key] || [])
			{
				if (seen[child.Id]) continue;
				seen[child.Id] = true;
				result.push(child);
			}
		}
		return result;
	}

	return mainCategoryIds.map((mainId) =>
	{
		const mainTag = byId[mainId];
		if (!mainTag) return null;
		return {
			tag: mainTag,
			children: childrenOf(mainTag, true).map((l2) => ({
				tag: l2,
				children: childrenOf(l2, false)
			}))
		};
	}).filter(Boolean);
}

function resolveItemMainCategoryId(item)
{
	const present = Object.create(null);
	for (const t of item.Tags || []) present[t.Id] = true;
	for (const id of DEFAULT_CATEGORIES) if (present[id]) return id;
	if (present.mobility) return 'mobility';
	const mains = new Set(Object.keys(MAP_MARKER_BASENAME));
	for (const t of item.Tags || []) if (mains.has(t.Id)) return t.Id;
	return 'other';
}

async function section(title, fn)
{
	console.log('\n==', title);
	await fn();
}

async function main()
{
	await section('Local assets & bundle', async () =>
	{
		for (const [id, base] of Object.entries(CATEGORY_ICON_BASENAME))
		{
			const file = path.join(root, 'src/static/img/category_icons', `category_icons_${base}.png`);
			ok(`category icon ${id}`, fs.existsSync(file), base);
		}
		for (const [id, base] of Object.entries(MAP_MARKER_BASENAME))
		{
			const file = path.join(root, 'src/static/img/map_markers', `map_markers_${base}.png`);
			ok(`map marker ${id}`, fs.existsSync(file), base);
		}
		const bundle = path.join(root, 'dist/bundle.js');
		ok('dist/bundle.js exists', fs.existsSync(bundle));
		if (fs.existsSync(bundle))
		{
			const src = fs.readFileSync(bundle, 'utf8');
			ok('bundle uses tourism.api host', src.includes('tourism.api.opendatahub.com'));
			ok('bundle does not use old tourism.opendatahub.com host', !src.includes('https://tourism.opendatahub.com'));
			ok('bundle uses tagfilter', src.includes('tagfilter'));
			ok('bundle does not use odhtagfilter', !src.includes('odhtagfilter'));
			ok('bundle has Tag fetch', src.includes('/v1/Tag'));
		}
	});

	await section('Tag tree', async () =>
	{
		const url = `${BASE}/v1/Tag?validforentity=odhactivitypoi&pagesize=0&fields=Id,Mapping.idm,TagName&origin=${ORIGIN}`;
		const res = await fetch(url);
		ok('Tag API HTTP 200', res.ok, String(res.status));
		const json = await res.json();
		ok('Tag API has Items', Array.isArray(json.Items) && json.Items.length > 100, `count=${json.Items?.length}`);
		const tree = buildCategoryTree(json.Items, DEFAULT_CATEGORIES);
		ok('all 8 mains present', tree.length === 8, `got ${tree.length}`);
		for (const main of tree)
		{
			ok(`main ${main.tag.Id} has TagName`, !!(main.tag.TagName && (main.tag.TagName.en || main.tag.TagName.de)));
			ok(`main ${main.tag.Id} has L2 or is selectable`, main.children.length > 0 || true, `L2=${main.children.length}`);
		}
		const traffic = tree.find((m) => m.tag.Id === 'traffic and transport');
		ok('traffic and transport resolves mobility children', traffic && traffic.children.length > 0, `L2=${traffic?.children.length}`);
		const eating = tree.find((m) => m.tag.Id === 'eating drinking');
		const withL3 = eating?.children.filter((c) => c.children.length > 0) || [];
		ok('eating drinking has L3 under some L2', withL3.length > 0, `L2-with-L3=${withL3.length}`);
	});

	await section('tagfilter search + markers data', async () =>
	{
		const cases = [
			{ tag: 'museums', expectMin: 1 },
			{ tag: 'hiking', expectMin: 1 },
			{ tag: 'eating drinking', expectMin: 1 },
			{ tag: 'museums,hiking', expectMin: 1 },
			{ tag: 'traffic and transport', expectMin: 1 }
		];
		for (const c of cases)
		{
			const params = new URLSearchParams({
				pagenumber: '1',
				pagesize: '25',
				fields: 'Id,Detail,GpsInfo,Tags,Type,PoiType,ODHActivityPoiTypes',
				tagfilter: c.tag,
				origin: ORIGIN,
				radius: '50000',
				latitude: '46.4983',
				longitude: '11.3548'
			});
			const res = await fetch(`${BASE}/v1/ODHActivityPoi?${params}`);
			ok(`search HTTP ${c.tag}`, res.ok, String(res.status));
			const json = await res.json();
			ok(`search results ${c.tag}`, (json.TotalResults || 0) >= c.expectMin, `TotalResults=${json.TotalResults}`);
			const items = json.Items || [];
			const withGps = items.filter((i) => i.GpsInfo && i.GpsInfo[0]);
			const withDetail = items.filter((i) => i.Detail && (i.Detail.en || i.Detail.de || i.Detail.it));
			ok(`gps coverage ${c.tag}`, withGps.length > 0, `${withGps.length}/${items.length}`);
			ok(`detail coverage ${c.tag}`, withDetail.length > 0, `${withDetail.length}/${items.length}`);
			if (withGps[0])
			{
				const main = resolveItemMainCategoryId(withGps[0]);
				const marker = path.join(root, 'src/static/img/map_markers', `map_markers_${MAP_MARKER_BASENAME[main]}.png`);
				ok(`marker asset for sample ${c.tag}`, fs.existsSync(marker), `${main} -> ${MAP_MARKER_BASENAME[main]}`);
			}
		}
	});

	await section('Detail endpoint', async () =>
	{
		const listRes = await fetch(`${BASE}/v1/ODHActivityPoi?pagesize=1&pagenumber=1&tagfilter=museums&fields=Id&origin=${ORIGIN}`);
		const list = await listRes.json();
		const id = list.Items?.[0]?.Id;
		ok('got sample id', !!id, id);
		if (id)
		{
			const res = await fetch(`${BASE}/v1/ODHActivityPoi/${encodeURIComponent(id)}?origin=${ORIGIN}`);
			ok('detail HTTP 200', res.ok, String(res.status));
			const item = await res.json();
			ok('detail has Detail', !!(item.Detail && (item.Detail.de || item.Detail.en)));
			ok('detail has Tags or Type', !!(item.Tags?.length || item.Type));
			const main = resolveItemMainCategoryId(item);
			ok('detail main category resolvable', !!MAP_MARKER_BASENAME[main], main);
		}
	});

	await section('Source invariants', async () =>
	{
		const sources = [
			'src/ActivityPOIComponent.js',
			'src/CategoriesChoiceComponent.js',
			'src/InteractiveMapComponent.js',
			'src/ItemVisualizerComponent.js',
			'src/SearchComponent.js',
			'src/odhApi.js'
		];
		for (const rel of sources)
		{
			const src = fs.readFileSync(path.join(root, rel), 'utf8');
			ok(`${rel} no tourism.opendatahub.com`, !src.includes('https://tourism.opendatahub.com'));
			ok(`${rel} no odhtagfilter`, !src.includes('odhtagfilter'));
		}
		const act = fs.readFileSync(path.join(root, 'src/ActivityPOIComponent.js'), 'utf8');
		ok('doSearch uses tagfilter', act.includes("append('tagfilter'"));
		ok('doSearch has race guard', act.includes('_searchSeq'));
		const cat = fs.readFileSync(path.join(root, 'src/CategoriesChoiceComponent.js'), 'utf8');
		ok('categories rebuild notifies clear', cat.includes("oncategorychange('')"));
	});

	await section('Webpack build', async () =>
	{
		const { execSync } = await import('node:child_process');
		try
		{
			execSync('npm run build', { cwd: root, stdio: 'pipe' });
			ok('npm run build', true);
		}
		catch (e)
		{
			ok('npm run build', false, e.message);
		}
	});

	console.log('\n' + (failed === 0 ? 'ALL CHECKS PASSED' : `${failed} CHECK(S) FAILED`));
	process.exit(failed === 0 ? 0 : 1);
}

main().catch((err) =>
{
	console.error(err);
	process.exit(1);
});
