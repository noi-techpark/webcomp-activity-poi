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
		html, body, #webcomponentsContainer {
			height: 100%;
			margin: 0px;
			padding: 0px;
			overflow: hidden;
		}
	  
		:host {
			display: block;
			height: 100%;
		}
	  
		#categoriesContainer {
			position: absolute;
			top: 0;
			right: 35vw;
			width: 40vw;
			margin-right: -20vw;
		}

		@media only screen and (max-width: 768px) {
			#categoriesContainer {
				bottom: 0;
				top: auto;
				width: 100vw;
				margin-right: 0;
				right: 0;
				z-index: 9999; 
			}
		}
	  
		#itemContainer {
			position: absolute;
			top: 0;
			left: 0;
			overflow: hidden;
			height: 100vh;
			box-sizing: border-box;
			z-index: 9999;
		}

		@media only screen and (max-width: 768px) {
			#itemContainer {
				z-index: 99999 !important;
			} 
		}
	  
		#searchContainer {
			position: absolute;
			top: 0;
			left: 0;
			overflow: hidden;
			z-index: 9999;
			box-sizing: border-box;
		}
	  
		#loading {
			position: fixed;
			z-index: 999999999;
			bottom: 0;
			width: 100vw;
			height: 100vh;
			background: rgba(55, 55, 55, 0.7); 
		}

		#loading .lds-ring {
			display: block;
			width: 80px;
			height: 80px;
			margin-left: auto;
			margin-right: auto;
			margin-top: 45vh;
		}

		#loading .lds-ring div {
			box-sizing: border-box;
			display: block;
			position: absolute;
			width: 64px;
			height: 64px;
			margin: 8px;
			border: 8px solid #ffffff;
			border-radius: 50%;
			animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
			border-color: #ffffff transparent transparent transparent;
		}

		#loading .lds-ring div:nth-child(1) {
			  animation-delay: -0.45s;
		}

		#loading .lds-ring div:nth-child(2) {
		  	animation-delay: -0.3s;
		}

		#loading .lds-ring div:nth-child(3) {
		  animation-delay: -0.15s;
		}

		@keyframes lds-ring {
			0% {
				transform: rotate(0deg); 
			}
			100% {
				transform: rotate(360deg); 
			}
		}

		#loading p {
		  text-align: center;
		  font-family: calibri, verdana, arial;
		  color: #ffffff;
		}

    </style>
`;

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
		categories_choice.setAttribute('lang', this.getAttribute('language'))
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

		function show_item_visualizer(item)
		{
			item_visualizer.setAttribute('apoiid', item.Id);
			searchContainer.style.display = "none";
			itemContainer.style.display = "block";

			if (item.GpsTrack && item.GpsTrack[1].GpxTrackUrl)
			{
				thiswebcomponent.interactive_map.setAttribute('gpx', item.GpsTrack[1].GpxTrackUrl)
			}

		}

		let item_visualizer = content.querySelector('item-visualizer');
		// forward attributes
		item_visualizer.setAttribute('lang', this.getAttribute('language'))
		let itemContainer = content.querySelector('#itemContainer');
		let searchContainer = content.querySelector('#searchContainer');
		itemContainer.style.display = "none";
		item_visualizer.closebuttonfunction = function()
		{
			searchContainer.style.display = "block";
			itemContainer.style.display = "none";
			thiswebcomponent.interactive_map.removeAttribute('gpx')
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
		this.interactive_map.markerclick = function(item)
		{
			show_item_visualizer(item)
		};

		//
		// search-items
		//

		this.search_items = content.querySelector('search-items');
		// forward attributes
		this.search_items.setAttribute('lang', this.getAttribute('language'))
		this.search_items.search_text_changed = function(new_text)
		{
			thiswebcomponent.last_search = new_text
			thiswebcomponent.doSearch()
		}
		this.search_items.onresultclick = function(item)
		{
			thiswebcomponent.interactive_map.setAttribute('lat-lon-zoom', JSON.stringify([item.GpsInfo[0].Latitude, item.GpsInfo[0].Longitude, 19]));
			show_item_visualizer(item)

		}

		//loading
    this.loadingText = content.querySelector("#loading p");
    this.loadingText.textContent = strings["loading"][this.getAttribute('language')]


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

		// let lat_lon_zoom = JSON.parse(this.getAttribute('lat-lon-zoom'))

		let lat = parseFloat(this.getAttribute('lat'))
		let lon = parseFloat(this.getAttribute('lon'))

		let radius = this.getAttribute('radius')

		if (this.last_search.length > 0 || this.last_subcategories.length > 0)
		{
			let params = new URLSearchParams()
			params.append('pagenumber', '1')
			params.append('pagesize', '10000')
			params.append('searchfilter', this.last_search)
			params.append('origin', 'webcomp-activity-poi')


			// if no subcategory was selected but exists a filter, then use filter
			if (this.last_subcategories == '' && this.getAttribute('category-filter'))
			{
				let cat_filter = this.getAttribute('category-filter');
				// remove category if subcategory is also specified in two step (at beginning and in the midle (lookbehind is not supported by iOS))
				cat_filter = cat_filter.replace(new RegExp('^[^/,]+/',''),'')
				cat_filter = cat_filter.replace(new RegExp(',[^/,]+/','g'),',')
				params.append('odhtagfilter', cat_filter)
			}
			else
				params.append('odhtagfilter', this.last_subcategories)
			if (radius !== null && radius !== '')
			{
				params.append('radius', radius)
				params.append('latitude', lat)
				params.append('longitude', lon)
			}

			let response = await fetch('https://tourism.opendatahub.bz.it/v1/ODHActivityPoi?' + params.toString())
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
		return ['lat', 'lon', 'radius', 'categories', 'directions','language'];
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

customElements.define('odh-activity-poi', ActivityPOIComponent);
