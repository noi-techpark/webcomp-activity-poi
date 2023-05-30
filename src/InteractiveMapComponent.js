// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const interactiveMap_template = document.createElement('template');

interactiveMap_template.innerHTML = `

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossorigin="" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css"/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css"/>
    
    <style>
       #mapid{
          height: 100%;
       }
       :host {
        display: block;
        height: 100%;
    	}
    </style>
    <div id="mapid"></div>
`;


class InteractiveMapComponent extends HTMLElement
{

	constructor()
	{
		super();
		this.attachShadow({ mode: 'open' });
		this.map = null
		this.markerClusterGroup = null
		this.gpx_layer = null
	}

	/**
	 * the Leaflet map is created by setting the map center based on the attributes lon and lat
	 * */
	async connectedCallback()
	{

		console.log('map connected')
		
		// dinamically load scripts, if not already added
		
		let leaflet_js = document.querySelector('script[data-activity-poi-webcomponent-loaded]')
		
		if (leaflet_js == null)
		{
			leaflet_js = document.createElement('script')
			leaflet_js.setAttribute('data-activity-poi-webcomponent-loaded', '')
			leaflet_js.setAttribute('src', 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js')
			leaflet_js.setAttribute('integrity', 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==')
			leaflet_js.setAttribute('crossorigin', '')
			
			let semaphore = new Promise(function(success, error)
			{
				leaflet_js.onload = success
			})
			
			document.head.appendChild(leaflet_js)
			await semaphore
			
			let leaflet_cluster_js = document.createElement('script')
			leaflet_cluster_js.setAttribute('src', 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster-src.js')
	
			semaphore = new Promise(function(success, error)
			{
				leaflet_cluster_js.onload = success
			})
			document.head.appendChild(leaflet_cluster_js)
			await semaphore
			
			let leaflet_omnivore_gpx_js = document.createElement('script')
			leaflet_omnivore_gpx_js.setAttribute('src', 'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.3.1/leaflet-omnivore.min.js')
	
			semaphore = new Promise(function(success, error)
			{
				leaflet_omnivore_gpx_js.onload = success
			})
			document.head.appendChild(leaflet_omnivore_gpx_js)
			await semaphore
		}

		// setup map
		
		let content = interactiveMap_template.content.cloneNode(true)

		this.shadowRoot.appendChild(content)

		let mapdiv = this.shadowRoot.querySelector('#mapid');

		let lat_lon_zoom = JSON.parse(this.getAttribute('lat-lon-zoom'))
		
		let radius = this.getAttribute('radius')
		let showradius = this.getAttribute('showradius')

		let thiswebcomponent = this

		setTimeout(function()
			{
				let map = L.map(mapdiv, { zoomControl: false })
				thiswebcomponent.map = map

				L.control.zoom({
					position:'bottomright'
				}).addTo(map);
				
				map.setView(
				{
					lon: lat_lon_zoom[1],
					lat: lat_lon_zoom[0]
				}, lat_lon_zoom[2]);

				L.tileLayer(
					'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
					{
						maxZoom: 19,
						attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
					}).addTo(map);

				L.control.scale().addTo(map);

				thiswebcomponent.markerClusterGroup = L.markerClusterGroup();
				map.addLayer(thiswebcomponent.markerClusterGroup);
				
				if (radius != null && radius != 'null' && showradius != null && showradius == 'true')
					L.circle([lat_lon_zoom[0], lat_lon_zoom[1]], {"radius": parseInt(radius)}).addTo(map);

			},
			500)
	}

	/**
	 * The functions responsible for updating the map when the attributes are changed are get observedAttributes()
	 * and attributeChangedCallback(name, oldVal, newVal).
	 *
	 * The attributes that are observed are the following:
	 * - lat-lon-zoom: latitude, longitude and zoom of the map center
	 * - items (json): list of the elements to show on the map
	 *
	 * 
	 */
	static get observedAttributes()
	{
		return ['lat-lon-zoom', 'items', 'gpx'];
	}

	async attributeChangedCallback(name, oldVal, newVal)
	{
		let thiswebcomponent = this

		if (name == 'items')
		{
			this.markerClusterGroup.clearLayers();
			let items = JSON.parse(newVal)
			let marker_arr = []

			for (let i = 0; i < items.length; i++)
			{
				let item = items[i]
				var markerIcon = L.icon(
				{
					iconUrl: paths.img_map_markers + "map_markers_" + item.ODHActivityPoiTypes[0].Id.trim().replace(/[^a-z]/gi,'_') + '.png',
					iconSize: [60 / 2, 99 / 2]
				});

				if (item.GpsInfo != undefined && item.GpsInfo[0] != undefined)
				{
					let marker = L.marker([item.GpsInfo[0].Latitude, item.GpsInfo[0].Longitude],
					{
						icon: markerIcon
					}).on('click', (function(item)
					{
						return function()
						{
							thiswebcomponent.markerclick(item);
						}

					})(item));

					marker_arr.push(marker)

					this.markerClusterGroup.addLayer(marker);
				}
			}

			if (marker_arr.length >= 2)
			{
				let group = new L.featureGroup(marker_arr);
				this.map.fitBounds(group.getBounds(),
				{
					maxZoom: 14
				});
			}

		}

		if (name == 'lat-lon-zoom' && thiswebcomponent.map !== null)
		{
			let json = JSON.parse(newVal)
			let lat = json[0]
			let lon = json[1]
			let zoom = json[2]
			thiswebcomponent.map.setView(new L.LatLng(lat, lon), zoom);
		}
		
		if (name == 'gpx' && thiswebcomponent.map !== null)
		{
			if (this.gpx_layer != null)
				this.map.removeLayer(this.gpx_layer)
			this.gpx_layer = null
			if (newVal !== null)
			{
				let gpxurl = newVal
				gpxurl = gpxurl.replace('https://lcs.lts.it/downloads/gpx/','https://tourism.opendatahub.bz.it/v1/Activity/Gpx?origin=webcomp-activity-poi')
				this.gpx_layer = omnivore.gpx(gpxurl).addTo(this.map);
			}
		}

	}

}

customElements.define('interactive-map', InteractiveMapComponent);
