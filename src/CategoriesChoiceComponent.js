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

	static get observedAttributes()
	{
		return ['lang', 'categories', 'category-filter'];
	}

	emitFilter()
	{
		const filter = Array.from(this.selectedTagIds).join(',');
		if (typeof this.oncategorychange === 'function')
		{
			this.oncategorychange(filter);
		}
	}

	toggleTag(tagId, checked, categoryEl, selectedCountRef)
	{
		if (checked)
		{
			this.selectedTagIds.add(tagId);
			if (selectedCountRef.value === 0)
			{
				categoryEl.classList.add('selected');
			}
			selectedCountRef.value++;
		}
		else
		{
			this.selectedTagIds.delete(tagId);
			selectedCountRef.value = Math.max(0, selectedCountRef.value - 1);
			if (selectedCountRef.value === 0)
			{
				categoryEl.classList.remove('selected');
			}
		}
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

	setupCheckbox(input, label, tag, lang, categoryEl, selectedCountRef)
	{
		const checkboxId = 'tag-' + tag.Id.replace(/\s+/g, '-');
		input.id = checkboxId;
		input.name = tag.Id;
		input.value = tag.Id;
		label.setAttribute('for', checkboxId);
		label.textContent = tagLabel(tag, lang);

		const thiswebcomponent = this;
		input.addEventListener('change', function ()
		{
			thiswebcomponent.toggleTag(tag.Id, input.checked, categoryEl, selectedCountRef);
		});
	}

	renderTree(tree, categoryTemplate, categoryParent, lang, categoryFilter)
	{
		for (let i = 0; i < tree.length; i++)
		{
			const mainNode = tree[i];
			const mainTag = mainNode.tag;
			const level2Nodes = this.filterLevel2Nodes(mainNode.children || [], mainTag.Id, categoryFilter);

			if (level2Nodes.length === 0 && categoryFilter && categoryFilter.length > 0
				&& categoryFilter.indexOf(mainTag.Id) < 0)
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

			const selectedCountRef = { value: 0 };
			let renderedCount = 0;

			for (let j = 0; j < level2Nodes.length; j++)
			{
				const l2Node = level2Nodes[j];
				const l2Item = itemTemplate.cloneNode(true);
				const l2Input = l2Item.querySelector('input');
				const l2Label = l2Item.querySelector('label');
				const l3Container = l2Item.querySelector('.subCategoryLevel3');
				l3Container.textContent = '';

				this.setupCheckbox(l2Input, l2Label, l2Node.tag, lang, category, selectedCountRef);

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
					this.setupCheckbox(l3Input, l3Label, l3Tag, lang, category, selectedCountRef);
				}

				itemParent.appendChild(l2Item);
				renderedCount++;
			}

			// Main category with no L2 (e.g. rare): still show a checkbox for the main tag itself
			if (renderedCount === 0)
			{
				const mainItem = itemTemplate.cloneNode(true);
				const mainInput = mainItem.querySelector('input');
				const mainLabel = mainItem.querySelector('label');
				mainItem.querySelector('.subCategoryLevel3').remove();
				this.setupCheckbox(mainInput, mainLabel, mainTag, lang, category, selectedCountRef);
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
		if (name === 'lang' || name === 'categories' || name === 'category-filter')
		{
			await this.rebuild();
		}
	}

	async rebuild()
	{
		const rebuildToken = (this._rebuildToken = (this._rebuildToken || 0) + 1);
		const hadSelection = this.selectedTagIds && this.selectedTagIds.size > 0;

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

		try
		{
			const allTags = await fetchActivityPoiTags();
			// Drop result if a newer rebuild started meanwhile
			if (rebuildToken !== this._rebuildToken)
			{
				return;
			}
			const tree = buildCategoryTree(allTags, mainCategories);
			this.renderTree(tree, categoryTemplate, categoryParent, lang, categoryFilter);
		}
		catch (err)
		{
			console.error('Failed to build category menu from Tag API', err);
		}

		// Selection was cleared with the DOM rebuild — notify parent so map/list reset
		if (hadSelection && typeof this.oncategorychange === 'function')
		{
			this.oncategorychange('');
		}
	}
}

customElements.define('categories-choice', CategoriesChoiceComponent);
