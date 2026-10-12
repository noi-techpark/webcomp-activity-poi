// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/** Tourism Content API base (canonical host). */
export const TOURISM_API_BASE = 'https://tourism.api.opendatahub.com';

export const API_ORIGIN = 'webcomp-activity-poi';

/**
 * Default main categories shown in the category picker.
 * Override with the `categories` attribute (comma-separated Tag Ids).
 */
export const DEFAULT_CATEGORIES = [
	'wellness relaxation',
	'eating drinking',
	'summer',
	'winter',
	'culture attractions',
	'traffic and transport',
	'shops and service providers',
	'other'
];

/**
 * Map main Tag Ids to existing category / marker icon basenames
 * (files under src/static/img/category_icons and map_markers).
 */
/** Basenames for category picker icons (category_icons_*.png). */
export const CATEGORY_ICON_BASENAME = {
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

/**
 * Basenames for map markers (map_markers_*.png).
 * Note: there is no Verkehr_und_Transport marker asset — use Mobilit_t.
 */
export const MAP_MARKER_BASENAME = {
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

/** CSS theme class names used by item visualizer (legacy German Type first word). */
export const CATEGORY_THEME_CLASS = {
	'wellness relaxation': 'Wellness',
	'eating drinking': 'Essen',
	'summer': 'Sommer',
	'winter': 'Winter',
	'culture attractions': 'Kultur',
	'traffic and transport': 'Verkehr',
	mobility: 'Verkehr',
	'shops and service providers': 'Geschäfte',
	other: 'Anderes'
};

export const MAIN_CATEGORY_IDS = new Set(Object.keys(CATEGORY_ICON_BASENAME));

export function tourismUrl(pathAndQuery)
{
	if (pathAndQuery.startsWith('http'))
	{
		return pathAndQuery;
	}
	return TOURISM_API_BASE + pathAndQuery;
}

export function withOrigin(params)
{
	params.set('origin', API_ORIGIN);
	return params;
}

export function parseCommaList(value)
{
	if (value == null || value === '')
	{
		return [];
	}
	return String(value)
		.split(',')
		.map(function (part)
		{
			return part.trim();
		})
		.filter(Boolean);
}

export function resolveMainCategories(categoriesAttr)
{
	const parsed = parseCommaList(categoriesAttr);
	return parsed.length > 0 ? parsed : DEFAULT_CATEGORIES.slice();
}

export function tagLabel(tag, lang)
{
	const names = tag && tag.TagName ? tag.TagName : null;
	if (!names)
	{
		return tag && tag.Id ? tag.Id : '';
	}
	const normalized = (lang || 'en').toLowerCase();
	return names[normalized] || names.en || names.de || names.it || tag.Id;
}

function mappingIdm(tag)
{
	if (!tag)
	{
		return null;
	}
	// fields=Mapping.idm returns a flattened key; full Tag objects use Mapping.idm
	const flat = tag['Mapping.idm'];
	if (flat && typeof flat === 'object')
	{
		return flat;
	}
	if (tag.Mapping && tag.Mapping.idm && typeof tag.Mapping.idm === 'object')
	{
		return tag.Mapping.idm;
	}
	return null;
}

/** Canonical IDM id used as parent_id by child tags. */
export function tagTreeId(tag)
{
	const mid = mappingIdm(tag);
	if (mid && mid.id)
	{
		return mid.id;
	}
	return tag.Id;
}

export function tagParentId(tag)
{
	const mid = mappingIdm(tag);
	return mid && mid.parent_id ? mid.parent_id : null;
}

/** parent_id lookup used to resolve L2/L3 tags back to a main category icon */
let tagParentById = null;

function rememberTagParents(allTags)
{
	const parents = Object.create(null);
	for (let i = 0; i < allTags.length; i++)
	{
		const tag = allTags[i];
		const parentId = tagParentId(tag);
		if (parentId)
		{
			parents[tag.Id] = parentId;
		}
		// Alias Mapping.idm.id → same parent, so lookups by either id work
		const treeId = tagTreeId(tag);
		if (treeId && treeId !== tag.Id && parentId)
		{
			parents[treeId] = parentId;
		}
	}
	// traffic and transport children live under mobility
	parents.mobility = 'traffic and transport';
	tagParentById = parents;
}

/**
 * Walk parent associations until a main category (or mobility) is found.
 */
function mainCategoryFromTagId(tagId)
{
	if (!tagId)
	{
		return null;
	}
	if (MAIN_CATEGORY_IDS.has(tagId))
	{
		return tagId === 'mobility' ? 'traffic and transport' : tagId;
	}
	if (!tagParentById)
	{
		return null;
	}
	let current = tagId;
	const seen = Object.create(null);
	for (let depth = 0; depth < 8; depth++)
	{
		if (seen[current])
		{
			break;
		}
		seen[current] = true;
		const parent = tagParentById[current];
		if (!parent)
		{
			break;
		}
		if (MAIN_CATEGORY_IDS.has(parent))
		{
			return parent === 'mobility' ? 'traffic and transport' : parent;
		}
		current = parent;
	}
	return null;
}

/**
 * Fetch all odhactivitypoi tags needed to build the category tree (one request).
 */
export async function fetchActivityPoiTags()
{
	const params = withOrigin(new URLSearchParams({
		validforentity: 'odhactivitypoi',
		pagesize: '0',
		fields: 'Id,Mapping.idm,TagName'
	}));
	const response = await fetch(tourismUrl('/v1/Tag?' + params.toString()));
	if (!response.ok)
	{
		throw new Error('Failed to load tags: HTTP ' + response.status);
	}
	const json = await response.json();
	const items = json.Items || [];
	rememberTagParents(items);
	return items;
}

/**
 * Build L1 → L2 → L3 tree for the given main category Ids.
 * Resolves IDM aliases (e.g. traffic and transport ↔ mobility).
 */
export function buildCategoryTree(allTags, mainCategoryIds)
{
	const byId = Object.create(null);
	const childrenByParent = Object.create(null);

	for (let i = 0; i < allTags.length; i++)
	{
		const tag = allTags[i];
		byId[tag.Id] = tag;
		const parentId = tagParentId(tag);
		if (!parentId)
		{
			continue;
		}
		if (!childrenByParent[parentId])
		{
			childrenByParent[parentId] = [];
		}
		childrenByParent[parentId].push(tag);
	}

	/**
	 * @param {object} tag
	 * @param {boolean} includeAliasKey - also match Mapping.idm.id as parent
	 *   (needed for main categories like traffic and transport → mobility).
	 *   Leave false for L3 so alias L2 nodes do not inherit each other's children.
	 */
	function childrenOf(tag, includeAliasKey)
	{
		const keys = [];
		keys.push(tag.Id);
		if (includeAliasKey)
		{
			const treeId = tagTreeId(tag);
			if (treeId && keys.indexOf(treeId) < 0)
			{
				keys.push(treeId);
			}
		}
		const seen = Object.create(null);
		const result = [];
		for (let k = 0; k < keys.length; k++)
		{
			const list = childrenByParent[keys[k]] || [];
			for (let i = 0; i < list.length; i++)
			{
				const child = list[i];
				if (seen[child.Id])
				{
					continue;
				}
				seen[child.Id] = true;
				result.push(child);
			}
		}
		result.sort(function (a, b)
		{
			const an = (a.TagName && (a.TagName.en || a.TagName.de)) || a.Id;
			const bn = (b.TagName && (b.TagName.en || b.TagName.de)) || b.Id;
			return an.localeCompare(bn);
		});
		return result;
	}

	const tree = [];
	for (let i = 0; i < mainCategoryIds.length; i++)
	{
		const mainId = mainCategoryIds[i];
		const mainTag = byId[mainId];
		if (!mainTag)
		{
			continue;
		}
		const level2 = childrenOf(mainTag, true).map(function (l2)
		{
			return {
				tag: l2,
				children: childrenOf(l2, false)
			};
		});
		tree.push({
			tag: mainTag,
			children: level2
		});
	}
	return tree;
}

/**
 * Pick the main category Tag Id for an Activity/POI item (for icons / theme).
 * Prefer DEFAULT_CATEGORIES order, then walk Tag parent links (L2/L3 → main).
 */
export function resolveItemMainCategoryId(item)
{
	const tags = item && item.Tags ? item.Tags : [];
	const present = Object.create(null);
	for (let i = 0; i < tags.length; i++)
	{
		present[tags[i].Id] = true;
	}
	for (let i = 0; i < DEFAULT_CATEGORIES.length; i++)
	{
		const id = DEFAULT_CATEGORIES[i];
		if (present[id])
		{
			return id;
		}
	}
	if (present.mobility)
	{
		return 'traffic and transport';
	}

	// Walk parents for L2/L3 tags (e.g. hiking → summer)
	const walked = [];
	for (let i = 0; i < tags.length; i++)
	{
		const main = mainCategoryFromTagId(tags[i].Id);
		if (main)
		{
			walked.push(main);
		}
	}
	for (let i = 0; i < DEFAULT_CATEGORIES.length; i++)
	{
		if (walked.indexOf(DEFAULT_CATEGORIES[i]) >= 0)
		{
			return DEFAULT_CATEGORIES[i];
		}
	}
	if (walked.length > 0)
	{
		return walked[0];
	}

	// Legacy Type field (German), map back to Tag Id when possible
	const type = item && item.Type ? String(item.Type) : '';
	const legacy = {
		Sommer: 'summer',
		Winter: 'winter',
		Anderes: 'other',
		'Essen Trinken': 'eating drinking',
		'Wellness Entspannung': 'wellness relaxation',
		'Kultur Sehenswürdigkeiten': 'culture attractions',
		'Geschäfte und Dienstleister': 'shops and service providers',
		'Verkehr und Transport': 'traffic and transport',
		Mobilität: 'traffic and transport'
	};
	if (legacy[type])
	{
		return legacy[type];
	}
	if (item && item.ODHActivityPoiTypes && item.ODHActivityPoiTypes[0])
	{
		const odhId = item.ODHActivityPoiTypes[0].Id;
		if (legacy[odhId])
		{
			return legacy[odhId];
		}
	}
	return 'other';
}

export function categoryIconUrl(mainCategoryId)
{
	const base = CATEGORY_ICON_BASENAME[mainCategoryId] || CATEGORY_ICON_BASENAME.other;
	return paths.img_category_icons + 'category_icons_' + base + '.png';
}

export function mapMarkerIconUrl(mainCategoryId)
{
	const base = MAP_MARKER_BASENAME[mainCategoryId] || MAP_MARKER_BASENAME.other;
	return paths.img_map_markers + 'map_markers_' + base + '.png';
}

export function categoryThemeClass(mainCategoryId)
{
	return CATEGORY_THEME_CLASS[mainCategoryId] || CATEGORY_THEME_CLASS.other;
}
