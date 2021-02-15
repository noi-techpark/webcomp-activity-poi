const activityPOI_template = document.createElement('template');

activityPOI_template.innerHTML = `
    <div id="webcomponentsContainer">
        <interactive-map></interactive-map>
        <div id="categoriesContainer">
            <categories-choice></categories-choice>
        </div>
        <div id="itemContainer">
            <item-visualizer></item-visualizer>
        </div>
        <div id="searchContainer">
            <search-items></search-items>
        </div>
        
        <div id="loading" style="display:none">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        <p>LOADING</p>
        </div>
    </div>
    
    
    <style>
    
    @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
    @import "` + paths.css_components + `ActivityPOIComponent.css";
    
    </style>
`;

class ActivityPOIComponent extends HTMLElement
{


	
	constructor()
	{
		super();

		console.log('activity poi constructor')

		this.attachShadow({ mode: 'open' });

		this.last_search = '';
		this.last_subcategories = '';

		this.search_items = null
		this.interactive_map = null

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
		
		let categories_choice = content.querySelector('categories-choice')
		// forward attributes
		categories_choice.setAttribute('lang', this.getAttribute('lang'))
		// Set attribute with null convert to null string, this i because I put an if :-(
		if (this.getAttribute('category-filter'))
			categories_choice.setAttribute('category-filter', this.getAttribute('category-filter'))
		categories_choice.oncategorychange = function(odhtagfilter)
		{
			thiswebcomponent.last_subcategories = odhtagfilter
			thiswebcomponent.doSearch()
		}

		//
		// item-visualizer
		// 
		
		let item_visualizer = content.querySelector('item-visualizer');
		// forward attributes
		item_visualizer.setAttribute('lang', this.getAttribute('lang'))
		let itemContainer = content.querySelector('#itemContainer');
		let searchContainer = content.querySelector('#searchContainer');
		itemContainer.style.display = "none";
		item_visualizer.closebuttonfunction = function()
		{
			searchContainer.style.display = "block";
			itemContainer.style.display = "none";
		}
		
		//
		// interactive-map
		// 
		
		this.interactive_map = content.querySelector('interactive-map');
		// forward attributes
		this.interactive_map.setAttribute('lat-lon-zoom', this.getAttribute('lat-lon-zoom'))
		this.interactive_map.setAttribute('radius', this.getAttribute('radius'))
		this.interactive_map.setAttribute('showradius', this.getAttribute('showradius'))
		this.interactive_map.markerclick = function(id)
		{
			item_visualizer.setAttribute('apoiid', id);
			searchContainer.style.display = "none";
			itemContainer.style.display = "block";
		};

		//
		// interactive-map
		// 
		
		this.search_items = content.querySelector('search-items');
		// forward attributes
		this.search_items.setAttribute('lang', this.getAttribute('lang'))
		this.search_items.search_text_changed = function(new_text)
		{
			thiswebcomponent.last_search = new_text
			thiswebcomponent.doSearch()
		}
		this.search_items.onresultclick = function(item)
		{
			console.log(item.GpsInfo[0].Latitude)
			console.log(item.GpsInfo[0].Longitude)
			thiswebcomponent.interactive_map.setAttribute('lat-lon-zoom', JSON.stringify([item.GpsInfo[0].Latitude, item.GpsInfo[0].Longitude, 19]));
			item_visualizer.setAttribute('apoiid', item.Id);
			searchContainer.style.display = "none";
			itemContainer.style.display = "block";
		}

		
		this.shadowRoot.appendChild(content)
		
}


	/**
	 * The search of POI and Activities is done in this function (doSearch) by getting the
	 * selected categories in CategoriesChoice (this.last_subcategories) and the search input of SearchComponent
	 * (this.last_search) and using them as parameters for the API call to ODH .
	 *
	 * As a result of the search, the list of results of the SearchComponent component and the displayed markers
	 * on the map are updated
	 * */
	async doSearch()
	{
		console.log('dosearch')
		console.log(this.last_search)
		console.log(this.last_subcategories)

		let list = []
		
		let loading = this.shadowRoot.querySelector('#loading');

		loading.style.display = "block";
		
		let lat_lon_zoom = JSON.parse(this.getAttribute('lat-lon-zoom'))
		
		let radius = this.getAttribute('radius')

		if (this.last_search.length > 0 || this.last_subcategories.length > 0)
		{
			let params = new URLSearchParams()
			params.append('pagenumber', '1')
			params.append('pagesize', '10000')
			params.append('searchfilter', this.last_search)
			params.append('odhtagfilter', this.last_subcategories)
			params.append('latitude', lat_lon_zoom[0])
			params.append('longitude', lat_lon_zoom[1])
			if (radius !== null)
				params.append('radius', radius)

			let response = await fetch('https://tourism.opendatahub.bz.it/api/ODHActivityPoi?' + params.toString())
			let json = await response.json();
			list = json.Items;
		}
		this.search_items.setAttribute('items', JSON.stringify(list))
		this.interactive_map.setAttribute('items', JSON.stringify(list))

		loading.style.display = "none";

	}

	/**
	 * The changes to the attributes of the ActivityPOIComponent are managed in these functions (observedAttributes, attributeChangedCallback).
	 *
	 * The attributes are the following:
	 * - lat (double): the latitude of the map center
	 * - lon (double): the longitude of the map center
	 * - radius (double): the radius of the map to show from the coordinates of the map center
	 * - language ('it','de','en'): the preferred language of the webcomponent
	 * - categories:
	 * - directions (boolean): if true, in the details of the POI/Activity a button that links to Google Maps is displayed
	 * */
	static get observedAttributes()
	{
		return ['lat', 'lon', 'radius', 'categories', 'directions'];
	}

	async attributeChangedCallback(name, oldVal, newVal)
	{

//		if (name === 'lat')
//		{
//			this.$interactiveMap.lat = newVal
//		}
//		else if (name === 'lon')
//		{
//			this.$interactiveMap.lon = newVal
//		}
//		else if (name === 'radius')
//		{
//			this.$interactiveMap.radius = newVal
//		}
//		else if (name === 'categories')
//		{
//
//		}
//		else if (name === 'directions')
//		{
//			this.$itemVisualizer.directions = newVal
//		}

	}

}

customElements.define('activity-poi', ActivityPOIComponent);