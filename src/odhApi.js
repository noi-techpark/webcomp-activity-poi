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

/** CSS theme class names used by item visualizer. */
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

/**
 * First GpsInfo point of an item as [lat, lon], or null when coordinates
 * are not set. Treated as not set: missing GpsInfo, empty/non-numeric
 * values, latitude out of range, and 0/0 (source placeholder, would put a
 * marker off West Africa and stretch fitBounds).
 * Longitude is wrapped into [-180, 180]: some records carry values like
 * 371.78 (= 11.78 + 360), which would stretch fitBounds around the globe.
 */
export function itemLatLon(item)
{
	const gps = item && item.GpsInfo && item.GpsInfo[0];
	if (!gps || gps.Latitude == null || gps.Longitude == null
		|| gps.Latitude === '' || gps.Longitude === '')
	{
		return null;
	}
	const lat = Number(gps.Latitude);
	let lon = Number(gps.Longitude);
	if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90)
	{
		return null;
	}
	if (lat === 0 && lon === 0)
	{
		return null;
	}
	lon = ((lon + 180) % 360 + 360) % 360 - 180;
	return [lat, lon];
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

/**
 * Deduplicate Activity/POI items by Id (first occurrence wins).
 */
export function uniqueItemsById(items)
{
	if (!items || !items.length)
	{
		return [];
	}
	const seen = Object.create(null);
	const result = [];
	for (let i = 0; i < items.length; i++)
	{
		const item = items[i];
		const id = item && item.Id != null ? String(item.Id) : '';
		if (!id || seen[id])
		{
			continue;
		}
		seen[id] = true;
		result.push(item);
	}
	return result;
}

export function resolveMainCategories(categoriesAttr)
{
	const parsed = parseCommaList(categoriesAttr);
	return parsed.length > 0 ? parsed : DEFAULT_CATEGORIES.slice();
}

/**
 * Display fixes for Tag API labels (typos / wrong-language strings).
 * Applied after resolving the localized TagName.
 */
const TAG_LABEL_TEXT_OVERRIDES = {
	en: {
		'Tattoos und Piercing': 'Tattoos and Piercing'
	}
};

export function tagLabel(tag, lang)
{
	const normalized = (lang || 'en').toLowerCase();
	const id = tag && tag.Id != null ? String(tag.Id) : '';
	const names = tag && tag.TagName ? tag.TagName : null;
	let label = '';
	if (names)
	{
		label = names[normalized] || names.en || names.de || names.it || id;
	}
	else
	{
		label = id;
	}
	const fixes = TAG_LABEL_TEXT_OVERRIDES[normalized];
	if (fixes && fixes[label])
	{
		return fixes[label];
	}
	return label;
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
/** Full Tag objects by Id (for localized labels after the one Tag fetch) */
let tagsById = null;

function rememberTagParents(allTags)
{
	const parents = Object.create(null);
	const byId = Object.create(null);
	for (let i = 0; i < allTags.length; i++)
	{
		const tag = allTags[i];
		byId[tag.Id] = tag;
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
		if (treeId && !byId[treeId])
		{
			byId[treeId] = tag;
		}
	}
	// traffic and transport children live under mobility
	parents.mobility = 'traffic and transport';
	tagParentById = parents;
	tagsById = byId;
}

/** Localized TagName for a Tag Id from the cached Tag fetch. */
export function tagLabelById(tagId, lang)
{
	if (!tagId || !tagsById)
	{
		return '';
	}
	const tag = tagsById[tagId];
	return tag ? tagLabel(tag, lang) : '';
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
 * Intentionally no rawfilter on parent_id: main categories have null parent_id
 * and must be included to build L1 → L2 → L3.
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
 * True when `plural` looks like the plural form of `singular` (Id or label).
 * Used to merge near-duplicate tags like "indoor pool" / "indoor pools".
 */
function isPluralForm(singular, plural)
{
	const s = String(singular || '').toLowerCase().replace(/\s+/g, ' ').trim();
	const p = String(plural || '').toLowerCase().replace(/\s+/g, ' ').trim();
	if (!s || !p || s === p)
	{
		return false;
	}
	return p === s + 's' || p === s + 'es' || p === s.replace(/y$/, 'ies');
}

function tagsAreSingularPluralPair(a, b)
{
	if (isPluralForm(a.Id, b.Id) || isPluralForm(b.Id, a.Id))
	{
		return true;
	}
	const an = (a.TagName && (a.TagName.en || a.TagName.de)) || '';
	const bn = (b.TagName && (b.TagName.en || b.TagName.de)) || '';
	return isPluralForm(an, bn) || isPluralForm(bn, an);
}

/**
 * Merge sibling tags that share the same IDM id and are singular/plural variants
 * (e.g. Indoor pool + Indoor pools under Spa & Water Worlds).
 * The kept tag exposes `_filterIds` with every merged Id for tagfilter.
 */
export function mergeSingularPluralSiblings(tags)
{
	if (!tags || tags.length < 2)
	{
		return tags || [];
	}
	const used = Object.create(null);
	const merged = [];
	for (let i = 0; i < tags.length; i++)
	{
		if (used[i])
		{
			continue;
		}
		const group = [tags[i]];
		const treeI = tagTreeId(tags[i]);
		for (let j = i + 1; j < tags.length; j++)
		{
			if (used[j])
			{
				continue;
			}
			if (treeI && tagTreeId(tags[j]) === treeI && tagsAreSingularPluralPair(tags[i], tags[j]))
			{
				group.push(tags[j]);
				used[j] = true;
			}
		}
		used[i] = true;
		if (group.length === 1)
		{
			merged.push(group[0]);
			continue;
		}
		// Prefer plural Id/label for display
		group.sort(function (a, b)
		{
			return String(b.Id).length - String(a.Id).length;
		});
		const primary = group[0];
		const filterIds = [];
		const seenId = Object.create(null);
		for (let g = 0; g < group.length; g++)
		{
			const id = group[g].Id;
			if (!seenId[id])
			{
				seenId[id] = true;
				filterIds.push(id);
			}
		}
		merged.push(Object.assign({}, primary, { _filterIds: filterIds }));
	}
	return merged;
}

/** Tag Ids to send in tagfilter for a menu tag (includes merged aliases). */
export function filterIdsForTag(tag)
{
	if (tag && tag._filterIds && tag._filterIds.length)
	{
		return tag._filterIds.slice();
	}
	return tag && tag.Id != null ? [tag.Id] : [];
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
		const collapsed = mergeSingularPluralSiblings(result);
		collapsed.sort(function (a, b)
		{
			const an = (a.TagName && (a.TagName.en || a.TagName.de)) || a.Id;
			const bn = (b.TagName && (b.TagName.en || b.TagName.de)) || b.Id;
			return an.localeCompare(bn);
		});
		return collapsed;
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
