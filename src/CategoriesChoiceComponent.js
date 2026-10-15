// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import categoriesStyle from './static/scss/components/categories.scss';
import themeStyle from './static/scss/theme.scss';
import atomsStyle from './static/scss/atoms.scss';
import {
	buildCategoryTree,
	categoryIconUrl,
	fetchActivityPoiTags,
	filterIdsForTag,
	parseCommaList,
	resolveMainCategories,
	tagLabel
} from './odhApi.js';

const categoriesChoice_template = document.createElement('template');

categoriesChoice_template.innerHTML = `
	<div class="categoriesContainer">
		<div class="dropdownCategory">
			<div class="category">
				<img class="categoryImage" src="" alt="">
			</div>
			<div class="subCategory">
				<p class="subCategoryTitle"></p>
				<div class="subCategoryItem">
					<input type="checkbox">
					<label></label>
					<div class="subCategoryLevel3"></div>
				</div>
			</div>
		</div>
	</div>

	<style>
		${categoriesStyle}
		${themeStyle}
		${atomsStyle}
	</style>
`;

const SELECTION_STORAGE_KEY = 'odh-activity-poi.selected-tags';

class CategoriesChoiceComponent extends HTMLElement
{
	constructor()
	{
		super();
		this.attachShadow({ mode: 'open' });
		this.selectedTagIds = new Set();
		// Do not initialize oncategorychange here: the host may assign the
		// callback before upgrade, and a null write in the constructor would wipe it.
	}

	persistSelection()
	{
		try
		{
			if (typeof localStorage === 'undefined')
			{
				return;
			}
			localStorage.setItem(
				SELECTION_STORAGE_KEY,
				JSON.stringify(Array.from(this.selectedTagIds))
			);
		}
		catch (err)
		{
			// private mode / quota — ignore
		}
	}

	loadPersistedSelection()
	{
		try
		{
			if (typeof localStorage === 'undefined')
			{
				return [];
			}
			const raw = localStorage.getItem(SELECTION_STORAGE_KEY);
			if (!raw)
			{
				return [];
			}
			const parsed = JSON.parse(raw);
			if (!Array.isArray(parsed))
			{
				return [];
			}
			return parsed.map(function (id)
			{
				return String(id).trim();
			}).filter(Boolean);
		}
		catch (err)
		{
			return [];
		}
	}

	clearPersistedSelection()
	{
		try
		{
			if (typeof localStorage === 'undefined')
			{
				return;
			}
			localStorage.removeItem(SELECTION_STORAGE_KEY);
		}
		catch (err)
		{
			// ignore
		}
	}

	static get observedAttributes()
	{
		return ['lang', 'categories', 'category-filter', 'show-subcategories'];
	}

	/**
	 * Level 2/3 submenu entries are shown unless explicitly disabled.
	 * Default: enabled (attribute missing, empty, or anything other than "false").
	 */
	showSubcategoriesEnabled()
	{
		const value = this.getAttribute('show-subcategories');
		return value === null || String(value).trim().toLowerCase() !== 'false';
	}

	emitFilter()
	{
		this.persistSelection();
		const filter = Array.from(this.selectedTagIds).join(',');
		if (typeof this.oncategorychange === 'function')
		{
			this.oncategorychange(filter);
		}
	}

	/**
	 * Uncheck every category checkbox and notify the host (empty tagfilter).
	 */
	clearSelection()
	{
		this.selectedTagIds = new Set();
		this.clearPersistedSelection();
		const root = this.shadowRoot;
		if (root)
		{
			const inputs = root.querySelectorAll('input[type="checkbox"]');
			for (let i = 0; i < inputs.length; i++)
			{
				inputs[i].checked = false;
				inputs[i].indeterminate = false;
			}
			const selected = root.querySelectorAll('.dropdownCategory.selected');
			for (let j = 0; j < selected.length; j++)
			{
				selected[j].classList.remove('selected');
			}
		}
		this.emitFilter();
	}

	inputMatchesSelection(input, selected)
	{
		const ids = this.filterIdsFromInput(input);
		for (let i = 0; i < ids.length; i++)
		{
			if (selected.has(ids[i]))
			{
				return true;
			}
		}
		return false;
	}

	/**
	 * Re-check boxes and badges after a DOM rebuild (language change / refresh).
	 */
	applySelection(tagIds)
	{
		const selected = new Set(tagIds || []);
		this.selectedTagIds = new Set(selected);
		const root = this.shadowRoot;
		if (!root)
		{
			return;
		}

		const categories = root.querySelectorAll('div.dropdownCategory');
		for (let c = 0; c < categories.length; c++)
		{
			const categoryEl = categories[c];
			const l2Items = categoryEl.querySelectorAll('.subCategory > .subCategoryItem');
			for (let i = 0; i < l2Items.length; i++)
			{
				const l2Item = l2Items[i];
				const l2Input = l2Item.querySelector(':scope > input[type="checkbox"]');
				if (!l2Input)
				{
					continue;
				}
				const l3Inputs = l2Item.querySelectorAll('.subCategoryLevel3 input[type="checkbox"]');
				if (l3Inputs.length > 0)
				{
					if (this.inputMatchesSelection(l2Input, selected))
					{
						l2Input.checked = true;
						l2Input.indeterminate = false;
						for (let k = 0; k < l3Inputs.length; k++)
						{
							l3Inputs[k].checked = true;
						}
					}
					else
					{
						let checkedCount = 0;
						for (let k = 0; k < l3Inputs.length; k++)
						{
							const on = this.inputMatchesSelection(l3Inputs[k], selected);
							l3Inputs[k].checked = on;
							if (on)
							{
								checkedCount++;
							}
						}
						if (checkedCount === 0)
						{
							l2Input.checked = false;
							l2Input.indeterminate = false;
						}
						else if (checkedCount === l3Inputs.length)
						{
							l2Input.checked = true;
							l2Input.indeterminate = false;
						}
						else
						{
							l2Input.checked = false;
							l2Input.indeterminate = true;
						}
					}
				}
				else
				{
					l2Input.checked = this.inputMatchesSelection(l2Input, selected);
					l2Input.indeterminate = false;
				}
			}
			this.syncMainCategoryBadge(categoryEl);
		}
		this.persistSelection();
	}

	setTagSelected(tagId, checked)
	{
		if (checked)
		{
			this.selectedTagIds.add(tagId);
		}
		else
		{
			this.selectedTagIds.delete(tagId);
		}
	}

	filterIdsFromInput(input)
	{
		const raw = input.getAttribute('data-filter-ids');
		if (raw && String(raw).trim() !== '')
		{
			return String(raw).split(',').map(function (part)
			{
				return part.trim();
			}).filter(Boolean);
		}
		return input.value ? [input.value] : [];
	}

	setInputFilterSelected(input, checked)
	{
		const ids = this.filterIdsFromInput(input);
		for (let i = 0; i < ids.length; i++)
		{
			this.setTagSelected(ids[i], checked);
		}
	}

	/**
	 * Marker on the L1 icon: on while this category contributes any filter
	 * (checked or partially-checked parent). Off when nothing under it is selected.
	 */
	syncMainCategoryBadge(categoryEl)
	{
		if (!categoryEl)
		{
			return;
		}
		const inputs = categoryEl.querySelectorAll('input[type="checkbox"]');
		let anyActive = false;
		for (let i = 0; i < inputs.length; i++)
		{
			if (inputs[i].checked || inputs[i].indeterminate)
			{
				anyActive = true;
				break;
			}
		}
		categoryEl.classList.toggle('selected', anyActive);
	}

	/**
	 * Keep an L2 parent checkbox in sync with its L3 children:
	 * all checked → parent checked (filter = parent only, no child Ids);
	 * none → unchecked; some → indeterminate (filter = checked children only).
	 * Avoids sending parent+children together (duplicate coverage in results).
	 */
	syncParentFromChildren(l2Input, l3Inputs)
	{
		let checkedCount = 0;
		for (let i = 0; i < l3Inputs.length; i++)
		{
			if (l3Inputs[i].checked)
			{
				checkedCount++;
			}
		}
		if (checkedCount === 0)
		{
			l2Input.checked = false;
			l2Input.indeterminate = false;
			this.setInputFilterSelected(l2Input, false);
			for (let i = 0; i < l3Inputs.length; i++)
			{
				this.setInputFilterSelected(l3Inputs[i], false);
			}
		}
		else if (checkedCount === l3Inputs.length)
		{
			l2Input.checked = true;
			l2Input.indeterminate = false;
			// Fully selected group → only the parent Id(s) in the filter
			this.setInputFilterSelected(l2Input, true);
			for (let i = 0; i < l3Inputs.length; i++)
			{
				this.setInputFilterSelected(l3Inputs[i], false);
			}
		}
		else
		{
			l2Input.checked = false;
			l2Input.indeterminate = true;
			this.setInputFilterSelected(l2Input, false);
			for (let i = 0; i < l3Inputs.length; i++)
			{
				this.setInputFilterSelected(l3Inputs[i], l3Inputs[i].checked);
			}
		}
	}

	/**
	 * Selecting an L2 with children selects all children in the UI;
	 * the filter stores only the parent Id (not every child) to avoid duplicates.
	 */
	applyParentToChildren(l2Input, l3Inputs, checked)
	{
		l2Input.checked = checked;
		l2Input.indeterminate = false;
		this.setInputFilterSelected(l2Input, checked);
		for (let i = 0; i < l3Inputs.length; i++)
		{
			l3Inputs[i].checked = checked;
			// Children are shown checked but not added to the filter when parent is on
			this.setInputFilterSelected(l3Inputs[i], false);
		}
	}

	toggleTag(input, checked, categoryEl)
	{
		this.setInputFilterSelected(input, checked);
		this.syncMainCategoryBadge(categoryEl);
		this.emitFilter();
	}

	isAllowedByFilter(tagId, categoryFilter)
	{
		if (!categoryFilter || categoryFilter.length === 0)
		{
			return true;
		}
		return categoryFilter.indexOf(tagId) >= 0;
	}

	/**
	 * True when category-filter matches this main or any of its L2/L3 descendants.
	 * Used in L1-only mode so a filter like "health" still shows the parent main.
	 */
	mainHasFilteredDescendant(mainNode, categoryFilter)
	{
		if (!categoryFilter || categoryFilter.length === 0)
		{
			return true;
		}
		const level2 = mainNode.children || [];
		for (let i = 0; i < level2.length; i++)
		{
			const node = level2[i];
			if (categoryFilter.indexOf(node.tag.Id) >= 0)
			{
				return true;
			}
			const l3 = node.children || [];
			for (let j = 0; j < l3.length; j++)
			{
				if (categoryFilter.indexOf(l3[j].Id) >= 0)
				{
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * A L2 node is shown if it or any of its L3 children is allowed,
	 * or if its parent main category id is listed in category-filter.
	 */
	filterLevel2Nodes(level2Nodes, mainId, categoryFilter)
	{
		if (!categoryFilter || categoryFilter.length === 0)
		{
			return level2Nodes;
		}
		if (categoryFilter.indexOf(mainId) >= 0)
		{
			return level2Nodes;
		}
		const result = [];
		for (let i = 0; i < level2Nodes.length; i++)
		{
			const node = level2Nodes[i];
			const l2Id = node.tag.Id;
			const allowedL3 = (node.children || []).filter(function (child)
			{
				return categoryFilter.indexOf(child.Id) >= 0;
			});
			if (categoryFilter.indexOf(l2Id) >= 0)
			{
				result.push({
					tag: node.tag,
					children: node.children
				});
			}
			else if (allowedL3.length > 0)
			{
				result.push({
					tag: node.tag,
					children: allowedL3
				});
			}
		}
		return result;
	}

	bindCheckboxLabel(input, label, tag, lang)
	{
		const checkboxId = 'tag-' + tag.Id.replace(/\s+/g, '-');
		const filterIds = filterIdsForTag(tag);
		input.id = checkboxId;
		input.name = tag.Id;
		input.value = tag.Id;
		input.setAttribute('data-filter-ids', filterIds.join(','));
		label.setAttribute('for', checkboxId);
		label.textContent = tagLabel(tag, lang);
	}

	setupCheckbox(input, label, tag, lang, categoryEl)
	{
		this.bindCheckboxLabel(input, label, tag, lang);
		const thiswebcomponent = this;
		input.addEventListener('change', function ()
		{
			thiswebcomponent.toggleTag(input, input.checked, categoryEl);
		});
	}

	/**
	 * L2 + L3 group: parent selects/deselects all children; any child change
	 * updates the parent checked / indeterminate state.
	 */
	setupParentChildGroup(l2Input, l2Label, l2Tag, l3Inputs, lang, categoryEl)
	{
		this.bindCheckboxLabel(l2Input, l2Label, l2Tag, lang);
		const thiswebcomponent = this;

		l2Input.addEventListener('change', function ()
		{
			thiswebcomponent.applyParentToChildren(l2Input, l3Inputs, l2Input.checked);
			thiswebcomponent.syncMainCategoryBadge(categoryEl);
			thiswebcomponent.emitFilter();
		});

		for (let i = 0; i < l3Inputs.length; i++)
		{
			l3Inputs[i].addEventListener('change', function ()
			{
				thiswebcomponent.setInputFilterSelected(l3Inputs[i], l3Inputs[i].checked);
				thiswebcomponent.syncParentFromChildren(l2Input, l3Inputs);
				thiswebcomponent.syncMainCategoryBadge(categoryEl);
				thiswebcomponent.emitFilter();
			});
		}
	}

	renderTree(tree, categoryTemplate, categoryParent, lang, categoryFilter, showSubcategories)
	{
		for (let i = 0; i < tree.length; i++)
		{
			const mainNode = tree[i];
			const mainTag = mainNode.tag;
			const level2Nodes = showSubcategories
				? this.filterLevel2Nodes(mainNode.children || [], mainTag.Id, categoryFilter)
				: [];

			if (showSubcategories
				&& level2Nodes.length === 0
				&& categoryFilter && categoryFilter.length > 0
				&& categoryFilter.indexOf(mainTag.Id) < 0)
			{
				continue;
			}
			// L1-only: show main if it is whitelisted, or any of its L2/L3 children are
			if (!showSubcategories
				&& categoryFilter && categoryFilter.length > 0
				&& categoryFilter.indexOf(mainTag.Id) < 0
				&& !this.mainHasFilteredDescendant(mainNode, categoryFilter))
			{
				continue;
			}

			const category = categoryTemplate.cloneNode(true);
			const titleEl = category.querySelector('.subCategoryTitle');
			titleEl.textContent = tagLabel(mainTag, lang);
			titleEl.classList.add('subCategoryTitle-' + mainTag.Id.replace(/\s+/g, '-'));

			const img = category.querySelector('img.categoryImage');
			img.alt = tagLabel(mainTag, lang);
			img.src = categoryIconUrl(mainTag.Id);

			const itemTemplate = category.querySelector('div.subCategoryItem');
			const itemParent = itemTemplate.parentElement;
			itemTemplate.remove();

			let renderedCount = 0;

			for (let j = 0; j < level2Nodes.length; j++)
			{
				const l2Node = level2Nodes[j];
				const l2Item = itemTemplate.cloneNode(true);
				const l2Input = l2Item.querySelector('input');
				const l2Label = l2Item.querySelector('label');
				const l3Container = l2Item.querySelector('.subCategoryLevel3');
				l3Container.textContent = '';

				const l3Inputs = [];
				const l3Children = l2Node.children || [];
				for (let k = 0; k < l3Children.length; k++)
				{
					const l3Tag = l3Children[k];
					if (categoryFilter && categoryFilter.length > 0
						&& categoryFilter.indexOf(mainTag.Id) < 0
						&& categoryFilter.indexOf(l2Node.tag.Id) < 0
						&& categoryFilter.indexOf(l3Tag.Id) < 0)
					{
						continue;
					}
					const l3Item = document.createElement('div');
					l3Item.className = 'subCategoryItem nested';
					const l3Input = document.createElement('input');
					l3Input.type = 'checkbox';
					const l3Label = document.createElement('label');
					l3Item.appendChild(l3Input);
					l3Item.appendChild(l3Label);
					l3Container.appendChild(l3Item);
					this.bindCheckboxLabel(l3Input, l3Label, l3Tag, lang);
					l3Inputs.push(l3Input);
				}

				if (l3Inputs.length > 0)
				{
					this.setupParentChildGroup(l2Input, l2Label, l2Node.tag, l3Inputs, lang, category);
				}
				else
				{
					this.setupCheckbox(l2Input, l2Label, l2Node.tag, lang, category);
				}

				itemParent.appendChild(l2Item);
				renderedCount++;
			}

			// L1-only mode, or main category with no L2: checkbox for the main tag itself
			if (renderedCount === 0)
			{
				const mainItem = itemTemplate.cloneNode(true);
				const mainInput = mainItem.querySelector('input');
				const mainLabel = mainItem.querySelector('label');
				mainItem.querySelector('.subCategoryLevel3').remove();
				this.setupCheckbox(mainInput, mainLabel, mainTag, lang, category);
				itemParent.appendChild(mainItem);
				renderedCount++;
			}

			if (renderedCount > 0)
			{
				categoryParent.appendChild(category);
			}
		}

		// Position left/right flyouts
		const subCats = categoryParent.querySelectorAll('div.subCategory');
		const half = Math.ceil(subCats.length / 2);
		for (let j = 0; j < subCats.length; j++)
		{
			subCats[j].classList.add(j < half ? 'subCategoryLeft' : 'subCategoryRight');
		}

		this.setupStickyCategoryMenus(categoryParent);
	}

	/**
	 * Keep a category submenu open while the user moves to it (important on
	 * small screens where the panel is position:fixed away from the icon).
	 * Close only when another category icon is hovered/tapped, or on outside click.
	 */
	setupStickyCategoryMenus(categoryParent)
	{
		const thiswebcomponent = this;
		const categories = categoryParent.querySelectorAll('div.dropdownCategory');

		function openCategory(categoryEl)
		{
			for (let i = 0; i < categories.length; i++)
			{
				categories[i].classList.toggle('is-open', categories[i] === categoryEl);
			}
		}

		function closeAll()
		{
			for (let i = 0; i < categories.length; i++)
			{
				categories[i].classList.remove('is-open');
			}
		}

		thiswebcomponent._closeAllCategoryMenus = closeAll;

		for (let i = 0; i < categories.length; i++)
		{
			const categoryEl = categories[i];
			const trigger = categoryEl.querySelector('div.category');
			const submenu = categoryEl.querySelector('div.subCategory');

			if (trigger)
			{
				trigger.addEventListener('mouseenter', function ()
				{
					openCategory(categoryEl);
				});
				trigger.addEventListener('click', function (event)
				{
					// Touch / small screens: tap icon to open and keep open
					event.stopPropagation();
					openCategory(categoryEl);
				});
			}

			if (submenu)
			{
				submenu.addEventListener('mouseenter', function ()
				{
					openCategory(categoryEl);
				});
				submenu.addEventListener('click', function (event)
				{
					event.stopPropagation();
				});
			}
		}

		if (!thiswebcomponent._categoryOutsideClickBound)
		{
			thiswebcomponent._categoryOutsideClickBound = function (event)
			{
				const path = event.composedPath ? event.composedPath() : [];
				for (let i = 0; i < path.length; i++)
				{
					const node = path[i];
					if (node && node.classList && node.classList.contains('dropdownCategory'))
					{
						return;
					}
				}
				if (typeof thiswebcomponent._closeAllCategoryMenus === 'function')
				{
					thiswebcomponent._closeAllCategoryMenus();
				}
			};
			document.addEventListener('click', thiswebcomponent._categoryOutsideClickBound);
		}
	}

	disconnectedCallback()
	{
		if (this._categoryOutsideClickBound)
		{
			document.removeEventListener('click', this._categoryOutsideClickBound);
			this._categoryOutsideClickBound = null;
		}
	}

	async connectedCallback()
	{
		await this.rebuild();
	}

	async attributeChangedCallback(name, oldVal, newVal)
	{
		if (oldVal === newVal || !this.isConnected)
		{
			return;
		}
		if (name === 'lang' || name === 'categories' || name === 'category-filter'
			|| name === 'show-subcategories')
		{
			await this.rebuild();
		}
	}

	async rebuild()
	{
		const rebuildToken = (this._rebuildToken = (this._rebuildToken || 0) + 1);
		const hadInMemory = this.selectedTagIds && this.selectedTagIds.size > 0;
		const preserved = hadInMemory
			? Array.from(this.selectedTagIds)
			: this.loadPersistedSelection();

		const content = categoriesChoice_template.content.cloneNode(true);
		const categoryTemplate = content.querySelector('div.dropdownCategory');
		const categoryParent = categoryTemplate.parentElement;
		categoryTemplate.remove();

		this.shadowRoot.innerHTML = '';
		this.shadowRoot.appendChild(content);

		this.selectedTagIds = new Set();

		const lang = this.getAttribute('lang') || 'en';
		const mainCategories = resolveMainCategories(this.getAttribute('categories'));
		const categoryFilter = parseCommaList(this.getAttribute('category-filter'));
		const showSubcategories = this.showSubcategoriesEnabled();

		try
		{
			const allTags = await fetchActivityPoiTags();
			// Drop result if a newer rebuild started meanwhile
			if (rebuildToken !== this._rebuildToken)
			{
				return;
			}
			const tree = buildCategoryTree(allTags, mainCategories);
			this.renderTree(tree, categoryTemplate, categoryParent, lang, categoryFilter, showSubcategories);
		}
		catch (err)
		{
			console.error('Failed to build category menu from Tag API', err);
		}

		if (rebuildToken !== this._rebuildToken)
		{
			return;
		}

		// Keep selection across language changes and hard refresh (localStorage)
		if (preserved.length > 0)
		{
			this.applySelection(preserved);
			if (!hadInMemory)
			{
				// Restored after page load — notify host to run search
				this.emitFilter();
			}
		}
	}
}

customElements.define('categories-choice', CategoriesChoiceComponent);
