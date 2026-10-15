// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Smoke-checks Tag tree building and tagfilter search against the live Content API.
 * Run: node scripts/verify-tag-flow.mjs
 */

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
		const level2 = childrenOf(mainTag, true).map((l2) => ({
			tag: l2,
			children: childrenOf(l2, false)
		}));
		return { tag: mainTag, children: level2 };
	}).filter(Boolean);
}

async function main()
{
	const tagUrl = `${BASE}/v1/Tag?validforentity=odhactivitypoi&pagesize=0&fields=Id,Mapping.idm,TagName&origin=${ORIGIN}`;
	const tagRes = await fetch(tagUrl);
	if (!tagRes.ok) throw new Error('Tag fetch failed ' + tagRes.status);
	const tagJson = await tagRes.json();
	const tree = buildCategoryTree(tagJson.Items, DEFAULT_CATEGORIES);

	console.log('Main categories in tree:', tree.length);
	for (const main of tree)
	{
		const l2 = main.children.length;
		const l3 = main.children.reduce((n, c) => n + c.children.length, 0);
		console.log(`  ${main.tag.Id}: L2=${l2} L3=${l3}`);
		if (main.tag.Id === 'traffic and transport' && l2 === 0)
		{
			throw new Error('traffic and transport should resolve children via mobility alias');
		}
	}

	const sampleL2 = tree.find((m) => m.tag.Id === 'eating drinking').children[0].tag.Id;
	const searchUrl = `${BASE}/v1/ODHActivityPoi?pagenumber=1&pagesize=5&active=true&tagfilter=${encodeURIComponent(sampleL2)}&fields=Id,Tags,GpsInfo,Detail&origin=${ORIGIN}`;
	const searchRes = await fetch(searchUrl);
	if (!searchRes.ok) throw new Error('Search failed ' + searchRes.status);
	const searchJson = await searchRes.json();
	if (!searchJson.Items || searchJson.Items.length === 0)
	{
		throw new Error('tagfilter returned no items for ' + sampleL2);
	}
	console.log(`tagfilter="${sampleL2}" -> ${searchJson.TotalResults} results (sample ok)`);
	console.log('verify-tag-flow: OK');
}

main().catch((err) =>
{
	console.error(err);
	process.exit(1);
});
