// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import componentStyle from './static/scss/components/ActivityPOIComponent.scss'
import {
	DEFAULT_CATEGORIES,
	itemLatLon,
	tourismUrl,
	uniqueItemsById,
	withOrigin
} from './odhApi.js'

const activityPOI_template = document.createElement('template');

activityPOI_template.innerHTML = `
    <div id="webcomponentsContainer">
        <interactive-map></interactive-map>
        <div class="activity-poi__language_picker">
            <wc-languagepicker></wc-languagepicker>
            <button type="button" id="resetFiltersButton" class="activity-poi__reset_filters" aria-label="Reset Selection">
                <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" width="14" height="14">
                    <path fill="currentColor" d="M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.89l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.5 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.91 175.91 0 0 1 255.83 432z"/>
                </svg>
                <span id="resetFiltersTooltip" class="activity-poi__reset_filters_tooltip">Reset Selection</span>
            </button>
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

const LANGUAGE_STORAGE_KEY = 'odh-activity-poi.language';

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

function loadPersistedLanguage()
{
	try
	{
		if (typeof localStorage === 'undefined')
		{
			return '';
		}
		const raw = localStorage.getItem(LANGUAGE_STORAGE_KEY);
		if (!raw)
		{
			return '';
		}
		return normalizeLanguage(raw);
	}
	catch (err)
	{
		return '';
	}
}

function persistLanguage(lang)
{
	try
	{
		if (typeof localStorage === 'undefined')
		{
			return;
		}
		localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizeLanguage(lang));
	}
	catch (err)
	{
		// private mode / quota — ignore
	}
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

		this.last_search = '';
		this.last_subcategories = '';
		this._searchSeq = 0;
		// Avoid HTML language="en" overwriting localStorage during element upgrade
		this._languagePersistenceReady = false;

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

		let content = activityPOI_template.content.cloneNode(true)

		//
		// categories-choice
		//

		// Prefer last chosen language (localStorage) over HTML language="en" on refresh.
		// Must run before enabling persistence — upgrade already applied the HTML attr.
		const persistedLang = loadPersistedLanguage();
		const currentLang = persistedLang
			|| normalizeLanguage(this.getAttribute('language') || 'en');
		this._languagePersistenceReady = true;
		if (normalizeLanguage(this.getAttribute('language')) !== currentLang)
		{
			this.setAttribute('language', currentLang);
		}
		else
		{
			persistLanguage(currentLang);
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
		// Default: show L2/L3; only forward when host sets the attribute
		if (this.getAttribute('show-subcategories') !== null)
			categories_choice.setAttribute('show-subcategories', this.getAttribute('show-subcategories'))

		//
		// item-visualizer
		//

		let item_visualizer = content.querySelector('item-visualizer');
		// forward attributes
		item_visualizer.setAttribute('lang', currentLang)
		if (this.getAttribute('directions') !== null)
		{
			item_visualizer.setAttribute('directions', this.getAttribute('directions'))
		}
		this.item_visualizer = item_visualizer;
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

		const languagePickerHost = content.querySelector('.activity-poi__language_picker');

		function setDetailsChromeVisible(visible)
		{
			// On narrow embeds the language/reset controls sit over the detail panel.
			if (languagePickerHost)
			{
				languagePickerHost.classList.toggle('is-obscured-by-details', !!visible);
			}
		}

		function expandItemPanel()
		{
			itemContainer.classList.remove('minimized');
			itemContainer.style.display = 'block';
			restoreTab.hidden = true;
			setDetailsChromeVisible(true);
		}

		function minimizeItemPanel()
		{
			itemContainer.classList.add('minimized');
			itemContainer.style.display = 'none';
			updateRestoreLabel();
			restoreTab.hidden = false;
			setDetailsChromeVisible(false);
		}

		function show_item_visualizer(item)
		{
			const lang = normalizeLanguage(thiswebcomponent.getAttribute('language'));
			// Always sync UI language before loading details (prevents stuck German labels)
			if (typeof item_visualizer.setLanguage === 'function')
			{
				item_visualizer.setLanguage(lang);
			}
			else
			{
				item_visualizer.setAttribute('lang', lang);
			}

			const currentId = item_visualizer.getAttribute('apoiid');
			if (currentId === item.Id)
			{
				item_visualizer.loadItem(item.Id);
			}
			else
			{
				item_visualizer.setAttribute('apoiid', item.Id);
			}

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

		const resetFiltersButton = content.querySelector('#resetFiltersButton');
		const resetFiltersTooltip = content.querySelector('#resetFiltersTooltip');
		this.resetFiltersButton = resetFiltersButton;
		this.resetFiltersTooltip = resetFiltersTooltip;

		function updateResetFiltersLabel()
		{
			const lang = normalizeLanguage(thiswebcomponent.getAttribute('language'));
			const label = strings['reset-selection'][lang];
			resetFiltersButton.setAttribute('aria-label', label);
			if (resetFiltersTooltip)
			{
				resetFiltersTooltip.textContent = label;
			}
		}
		updateResetFiltersLabel();
		this.updateResetFiltersLabel = updateResetFiltersLabel;

		// Append first so child custom elements upgrade, then wire callbacks
		// (assigning callbacks before upgrade can be wiped by constructors).
		this.shadowRoot.appendChild(content)

		this.configureLanguagePicker(currentLang);

		categories_choice.oncategorychange = function(tagfilter)
		{
			thiswebcomponent.last_subcategories = tagfilter
			thiswebcomponent.doSearch()
		}
		// If selection was restored from storage before this callback was wired, sync now
		if (categories_choice.selectedTagIds && categories_choice.selectedTagIds.size > 0)
		{
			thiswebcomponent.last_subcategories = Array.from(categories_choice.selectedTagIds).join(',')
			thiswebcomponent.doSearch()
		}
		resetFiltersButton.addEventListener('click', function()
		{
			if (typeof categories_choice.clearSelection === 'function')
			{
				categories_choice.clearSelection();
			}
			else
			{
				thiswebcomponent.last_subcategories = '';
				thiswebcomponent.doSearch();
			}
		})
		item_visualizer.closebuttonfunction = function()
		{
			searchContainer.style.display = "block";
			itemContainer.classList.remove('minimized');
			itemContainer.style.display = "none";
			restoreTab.hidden = true;
			setDetailsChromeVisible(false);
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
			const latLon = itemLatLon(item)
			if (latLon)
			{
				thiswebcomponent.interactive_map.setAttribute(
					'lat-lon-zoom',
					JSON.stringify([latLon[0], latLon[1], 19])
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

		const applyLanguage = function (language)
		{
			const nextLang = normalizeLanguage(language);
			if (normalizeLanguage(thiswebcomponent.getAttribute('language')) === nextLang)
			{
				// Still push lang to children in case they drifted
				thiswebcomponent.applyLanguageToChildren(nextLang);
				return;
			}
			thiswebcomponent.setAttribute('language', nextLang);
		};

		this.languagePicker.changeLanguageAction = applyLanguage;

		if (!this._languageChangeBound)
		{
			this._languageChangeBound = true;
			this.languagePicker.addEventListener('language-change', function (event)
			{
				if (event && event.detail && event.detail.language)
				{
					applyLanguage(event.detail.language);
				}
			});
		}
	}

	applyLanguageToChildren(lang)
	{
		const safeLang = normalizeLanguage(lang);
		if (this.interactive_map)
		{
			this.interactive_map.setAttribute('lang', safeLang);
		}
		const categoriesChoice = this.shadowRoot && this.shadowRoot.querySelector('categories-choice');
		if (categoriesChoice)
		{
			categoriesChoice.setAttribute('lang', safeLang);
		}
		if (this.search_items)
		{
			this.search_items.setAttribute('lang', safeLang);
			const currentItems = this.search_items.getAttribute('items');
			if (currentItems)
			{
				this.search_items.setAttribute('items', currentItems);
			}
		}
		if (this.item_visualizer)
		{
			if (typeof this.item_visualizer.setLanguage === 'function')
			{
				this.item_visualizer.setLanguage(safeLang);
			}
			else
			{
				this.item_visualizer.setAttribute('lang', safeLang);
			}
		}
		if (this.loadingText)
		{
			this.loadingText.textContent = strings.loading[safeLang];
		}
		if (this.restoreLabel && this.restoreTab && !this.restoreTab.hidden)
		{
			this.restoreLabel.textContent = strings['expand-panel'][safeLang];
			this.restoreTab.setAttribute('aria-label', strings['expand-panel'][safeLang]);
			this.restoreTab.setAttribute('title', strings['expand-panel'][safeLang]);
		}
		if (typeof this.updateResetFiltersLabel === 'function')
		{
			this.updateResetFiltersLabel();
		}
		else if (this.resetFiltersButton)
		{
			const label = strings['reset-selection'][safeLang];
			this.resetFiltersButton.setAttribute('aria-label', label);
			if (this.resetFiltersTooltip)
			{
				this.resetFiltersTooltip.textContent = label;
			}
		}
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
			params.append('active', 'true')
			params.append('searchfilter', this.last_search)
			// Icons/labels resolve from Tags only
			params.append('fields', 'Id,Detail,GpsInfo,GpsTrack,Tags')
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
				list = uniqueItemsById(json.Items || []);
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

		list = uniqueItemsById(list)
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
	 * - show-subcategories: 'true' (default) show L2/L3; 'false' = L1 checkboxes only
	 * - directions, show-current-location, marker-color
	 */
	static get observedAttributes()
	{
		return ['lat', 'lon', 'radius', 'categories', 'category-filter', 'show-subcategories', 'directions', 'language', 'show-current-location', 'marker-color'];
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
			// Skip persist during upgrade: HTML language="en" must not wipe saved choice
			if (this._languagePersistenceReady)
			{
				persistLanguage(lang);
			}
			if (this.languagePicker)
			{
				this.languagePicker.language = lang;
			}
			if (this.isConnected)
			{
				this.applyLanguageToChildren(lang);
			}
		}
		if (name === 'directions' && this.item_visualizer)
		{
			if (newVal !== null)
			{
				this.item_visualizer.setAttribute('directions', newVal);
			}
			else
			{
				this.item_visualizer.removeAttribute('directions');
			}
		}
		if ((name === 'categories' || name === 'category-filter' || name === 'show-subcategories')
			&& this.shadowRoot)
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
				else if (name === 'show-subcategories')
				{
					if (newVal !== null)
					{
						categoriesChoice.setAttribute('show-subcategories', newVal)
					}
					else
					{
						categoriesChoice.removeAttribute('show-subcategories')
					}
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
