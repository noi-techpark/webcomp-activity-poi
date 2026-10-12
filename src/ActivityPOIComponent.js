// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import componentStyle from './static/scss/components/ActivityPOIComponent.scss'
import {
	DEFAULT_CATEGORIES,
	tourismUrl,
	withOrigin
} from './odhApi.js'

const activityPOI_template = document.createElement('template');

activityPOI_template.innerHTML = `
    <div id="webcomponentsContainer">
        <interactive-map></interactive-map>
        <div class="activity-poi__language_picker">
            <wc-languagepicker></wc-languagepicker>
        </div>
        <div id="categoriesContainer">
            <categories-choice></categories-choice>
        </div>
        <div id="itemContainer">
            <item-visualizer></item-visualizer>
        </div>
        <button type="button" id="itemRestoreTab" hidden>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 320 512" width="14" height="14"><path fill="currentColor" d="M285.5 273L34.9 472.6C19.5 484.9-4 473.9-4 454V58c0-19.9 23.5-30.9 38.9-18.6L285.5 239c11.9 9.5 11.9 28.5 0 34z"/></svg>
            <span id="itemRestoreLabel">Show details</span>
        </button>
        <div id="searchContainer">
            <search-items></search-items>
        </div>

        <div id="loading" style="display:none">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        <p>LOADING</p>
        </div>
    </div>


    <style>
		${componentStyle}
    </style>
`;

const SUPPORTED_LANGS = ['en', 'it', 'de'];

const LANGUAGES = {
	EN: 'en',
	DE: 'de',
	IT: 'it'
};

function normalizeLanguage(value)
{
	let lang = (value || 'en').toLowerCase().trim();
	// Accept common aliases (e.g. "du" typed for Deutsch)
	if (lang === 'du' || lang === 'ger' || lang === 'ge')
	{
		lang = 'de';
	}
	if (SUPPORTED_LANGS.indexOf(lang) < 0)
	{
		lang = 'en';
	}
	return lang;
}

class ActivityPOIComponent extends HTMLElement
{



	constructor()
	{
		super();

    this._shadowRoot = this.attachShadow(
      {
        mode: 'open'
      });

		console.log('activity poi constructor')

		this.last_search = '';
		this.last_subcategories = '';
		this._searchSeq = 0;

		this.search_items = null
		this.interactive_map = null

	}

	/**
	 * Translation helper function that normalizes language and falls back to "en"
	 * @param {string} key - Translation key from strings object
	 * @returns {string} Translated string
	 */
	t(key)
	{
		let lang = this.getAttribute('language');
		if (lang)
		{
			lang = lang.toLowerCase().trim();
		}
		if (!lang || !['it', 'de', 'en'].includes(lang))
		{
			lang = 'en';
		}
		return strings[key] && strings[key][lang] ? strings[key][lang] : '';
	}


	connectedCallback()
	{
		let thiswebcomponent = this

		console.log('activity poi connect')
		console.log(this.shadowRoot)

		let content = activityPOI_template.content.cloneNode(true)
		console.log(content)

		//
		// categories-choice
		//

		const currentLang = normalizeLanguage(this.getAttribute('language'));
		if ((this.getAttribute('language') || '').toLowerCase() !== currentLang)
		{
			this.setAttribute('language', currentLang);
		}

		let categories_choice = content.querySelector('categories-choice')
		// forward attributes
		categories_choice.setAttribute('lang', currentLang)
		const categoriesAttr = this.getAttribute('categories')
		categories_choice.setAttribute(
			'categories',
			categoriesAttr && categoriesAttr.trim() !== ''
				? categoriesAttr
				: DEFAULT_CATEGORIES.join(',')
		)
		if (this.getAttribute('category-filter'))
			categories_choice.setAttribute('category-filter', this.getAttribute('category-filter'))

		//
		// item-visualizer
		//

		let item_visualizer = content.querySelector('item-visualizer');
		// forward attributes
		item_visualizer.setAttribute('lang', currentLang)
		let itemContainer = content.querySelector('#itemContainer');
		let searchContainer = content.querySelector('#searchContainer');
		let restoreTab = content.querySelector('#itemRestoreTab');
		let restoreLabel = content.querySelector('#itemRestoreLabel');
		itemContainer.style.display = "none";
		this.itemContainer = itemContainer;
		this.restoreTab = restoreTab;
		this.restoreLabel = restoreLabel;

		function updateRestoreLabel()
		{
			const lang = normalizeLanguage(thiswebcomponent.getAttribute('language'));
			restoreLabel.textContent = strings['expand-panel'][lang];
			restoreTab.setAttribute('aria-label', strings['expand-panel'][lang]);
			restoreTab.setAttribute('title', strings['expand-panel'][lang]);
		}

		function expandItemPanel()
		{
			itemContainer.classList.remove('minimized');
			itemContainer.style.display = 'block';
			restoreTab.hidden = true;
		}

		function minimizeItemPanel()
		{
			itemContainer.classList.add('minimized');
			itemContainer.style.display = 'none';
			updateRestoreLabel();
			restoreTab.hidden = false;
		}

		function show_item_visualizer(item)
		{
			item_visualizer.setAttribute('apoiid', item.Id);
			searchContainer.style.display = "none";
			expandItemPanel();

			if (item.GpsTrack && item.GpsTrack[1] && item.GpsTrack[1].GpxTrackUrl)
			{
				thiswebcomponent.interactive_map.setAttribute('gpx', item.GpsTrack[1].GpxTrackUrl)
			}

		}

		//
		// interactive-map
		//

		this.interactive_map = content.querySelector('interactive-map');
		// forward attributes
		let lat = parseFloat(this.getAttribute('lat'))
		let lon = parseFloat(this.getAttribute('lon'))
		let zoom = parseInt(this.getAttribute('zoom'))

		this.interactive_map.setAttribute('lat-lon-zoom', JSON.stringify([lat,lon,zoom]))
		this.interactive_map.setAttribute('radius', this.getAttribute('radius'))
		this.interactive_map.setAttribute('showradius', this.getAttribute('showradius'))
		// Forward show-current-location attribute if present
		if (this.getAttribute('show-current-location'))
		{
			this.interactive_map.setAttribute('show-current-location', this.getAttribute('show-current-location'))
		}
		// Forward marker-color attribute if present
		if (this.getAttribute('marker-color'))
		{
			this.interactive_map.setAttribute('marker-color', this.getAttribute('marker-color'))
		}
		// Forward language for translations
		this.interactive_map.setAttribute('lang', currentLang)

		//
		// search-items
		//

		this.search_items = content.querySelector('search-items');
		// forward attributes
		this.search_items.setAttribute('lang', currentLang)

		//loading
		this.loadingText = content.querySelector("#loading p");
		this.loadingText.textContent = strings.loading[currentLang];

		const languagePicker = content.querySelector('wc-languagepicker');
		this.languagePicker = languagePicker;

		// Append first so child custom elements upgrade, then wire callbacks
		// (assigning callbacks before upgrade can be wiped by constructors).
		this.shadowRoot.appendChild(content)

		this.configureLanguagePicker(currentLang);

		categories_choice.oncategorychange = function(tagfilter)
		{
			thiswebcomponent.last_subcategories = tagfilter
			thiswebcomponent.doSearch()
		}
		item_visualizer.closebuttonfunction = function()
		{
			searchContainer.style.display = "block";
			itemContainer.classList.remove('minimized');
			itemContainer.style.display = "none";
			restoreTab.hidden = true;
			thiswebcomponent.interactive_map.removeAttribute('gpx')
		}
		item_visualizer.minimizebuttonfunction = function()
		{
			minimizeItemPanel();
		}
		restoreTab.addEventListener('click', function()
		{
			expandItemPanel();
		})
		this.interactive_map.markerclick = function(item)
		{
			show_item_visualizer(item)
		};
		this.search_items.search_text_changed = function(new_text)
		{
			thiswebcomponent.last_search = new_text
			thiswebcomponent.doSearch()
		}
		this.search_items.onresultclick = function(item)
		{
			if (item.GpsInfo && item.GpsInfo[0])
			{
				thiswebcomponent.interactive_map.setAttribute(
					'lat-lon-zoom',
					JSON.stringify([item.GpsInfo[0].Latitude, item.GpsInfo[0].Longitude, 19])
				);
			}
			show_item_visualizer(item)
		}

}

	configureLanguagePicker(lang)
	{
		if (!this.languagePicker)
		{
			return;
		}
		const thiswebcomponent = this;
		const active = normalizeLanguage(lang);
		this.languagePicker.supportedLanguages = LANGUAGES;
		this.languagePicker.language = active;
		this.languagePicker.changeLanguageAction = function (language)
		{
			const nextLang = normalizeLanguage(language);
			if (normalizeLanguage(thiswebcomponent.getAttribute('language')) === nextLang)
			{
				return;
			}
			thiswebcomponent.setAttribute('language', nextLang);
		};
	}


	/**
	 * Search POIs/Activities using selected Tag Ids (tagfilter) and optional text search.
	 * Updates the result list and map markers.
	 */
	async doSearch()
	{
		const seq = ++this._searchSeq
		let list = []

		let loading = this.shadowRoot.querySelector('#loading');

		loading.style.display = "block";

		let lat = parseFloat(this.getAttribute('lat'))
		let lon = parseFloat(this.getAttribute('lon'))

		let radius = this.getAttribute('radius')

		// Active checkbox selection wins; category-filter is only a fallback
		// when the host wants a fixed filter without UI selection.
		const tagfilter = this.last_subcategories
			|| (this.getAttribute('category-filter') || '').trim()

		if (this.last_search.length > 0 || tagfilter.length > 0)
		{
			let params = withOrigin(new URLSearchParams())
			params.append('pagenumber', '1')
			params.append('pagesize', '10000')
			params.append('searchfilter', this.last_search)
			params.append('fields', 'Id,Detail,GpsInfo,GpsTrack,Tags,Type,PoiType,ODHActivityPoiTypes')
			if (tagfilter.length > 0)
			{
				params.append('tagfilter', tagfilter)
			}

			if (radius !== null && radius !== '')
			{
				params.append('radius', radius)
				params.append('latitude', String(lat))
				params.append('longitude', String(lon))
			}

			try
			{
				let response = await fetch(tourismUrl('/v1/ODHActivityPoi?' + params.toString()))
				if (!response.ok)
				{
					throw new Error('ODHActivityPoi HTTP ' + response.status)
				}
				let json = await response.json();
				list = json.Items || [];
			}
			catch (err)
			{
				console.error('Activity/POI search failed', err)
				list = []
			}
		}

		// Ignore stale responses from older overlapping searches
		if (seq !== this._searchSeq)
		{
			return
		}

		this.search_items.setAttribute('items', JSON.stringify(list))
		this.interactive_map.setAttribute('items', JSON.stringify(list))

		loading.style.display = "none";

	}

	/**
	 * Observed attributes:
	 * - lat / lon / zoom / radius / showradius
	 * - language ('it','de','en')
	 * - categories: comma-separated main Tag Ids for the picker (defaults to DEFAULT_CATEGORIES)
	 * - category-filter: optional whitelist of Tag Ids for menu entries
	 * - directions, show-current-location, marker-color
	 */
	static get observedAttributes()
	{
		return ['lat', 'lon', 'radius', 'categories', 'category-filter', 'directions', 'language', 'show-current-location', 'marker-color'];
	}

	async attributeChangedCallback(name, oldVal, newVal)
	{
		if (name === 'show-current-location' && this.interactive_map)
		{
			if (newVal !== null)
			{
				this.interactive_map.setAttribute('show-current-location', newVal)
			}
			else
			{
				this.interactive_map.removeAttribute('show-current-location')
			}
		}
		if (name === 'marker-color' && this.interactive_map)
		{
			if (newVal !== null)
			{
				this.interactive_map.setAttribute('marker-color', newVal)
			}
			else
			{
				this.interactive_map.removeAttribute('marker-color')
			}
		}
		if (name === 'language')
		{
			const lang = normalizeLanguage(newVal);
			if (this.languagePicker)
			{
				this.languagePicker.language = lang;
			}

			if (this.interactive_map)
			{
				this.interactive_map.setAttribute('lang', lang)
			}
			const categoriesChoice = this.shadowRoot && this.shadowRoot.querySelector('categories-choice')
			if (categoriesChoice)
			{
				categoriesChoice.setAttribute('lang', lang)
			}
			if (this.search_items)
			{
				this.search_items.setAttribute('lang', lang)
				// Re-apply items so titles refresh in the new language
				const currentItems = this.search_items.getAttribute('items')
				if (currentItems)
				{
					this.search_items.setAttribute('items', currentItems)
				}
			}
			const itemVisualizer = this.shadowRoot && this.shadowRoot.querySelector('item-visualizer')
			if (itemVisualizer)
			{
				itemVisualizer.setAttribute('lang', lang)
			}
			if (this.loadingText)
			{
				this.loadingText.textContent = strings.loading[lang];
			}
			if (this.restoreLabel && this.restoreTab && !this.restoreTab.hidden)
			{
				this.restoreLabel.textContent = strings['expand-panel'][lang];
				this.restoreTab.setAttribute('aria-label', strings['expand-panel'][lang]);
				this.restoreTab.setAttribute('title', strings['expand-panel'][lang]);
			}
		}
		if ((name === 'categories' || name === 'category-filter') && this.shadowRoot)
		{
			const categoriesChoice = this.shadowRoot.querySelector('categories-choice')
			if (categoriesChoice)
			{
				if (name === 'categories')
				{
					categoriesChoice.setAttribute(
						'categories',
						newVal && String(newVal).trim() !== ''
							? newVal
							: DEFAULT_CATEGORIES.join(',')
					)
				}
				else if (newVal !== null)
				{
					categoriesChoice.setAttribute('category-filter', newVal)
				}
				else
				{
					categoriesChoice.removeAttribute('category-filter')
				}
			}
		}
	}

}

customElements.define('odh-activity-poi', ActivityPOIComponent);
