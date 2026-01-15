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
		this.geolocationWatchId = null
		this.currentLocationMarker = null
		this.currentLocationCircle = null
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
						attribution:'<a target="_blank" href="https://opendatahub.com">OpenDataHub.com</a> | &copy; <a target="_blank" href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',

					}).addTo(map);

				L.control.scale().addTo(map);

				thiswebcomponent.markerClusterGroup = L.markerClusterGroup();
				map.addLayer(thiswebcomponent.markerClusterGroup);

				if (radius != null && radius != 'null' && showradius != null && showradius == 'true')
					L.circle([lat_lon_zoom[0], lat_lon_zoom[1]], {"radius": parseInt(radius)}).addTo(map);

				// Check if show-current-location attribute is set and handle it
				let showCurrentLocation = thiswebcomponent.getAttribute('show-current-location')
				if (showCurrentLocation)
				{
					thiswebcomponent.handleCurrentLocationChange(showCurrentLocation)
				}

			},
			500)
	}

	/**
	 * Translation helper function that normalizes language and falls back to "en"
	 * @param {string} key - Translation key from strings object
	 * @returns {string} Translated string
	 */
	t(key)
	{
		let lang = this.getAttribute('lang');
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

	/**
	 * The functions responsible for updating the map when the attributes are changed are get observedAttributes()
	 * and attributeChangedCallback(name, oldVal, newVal).
	 *
	 * The attributes that are observed are the following:
	 * - lat-lon-zoom: latitude, longitude and zoom of the map center
	 * - items (json): list of the elements to show on the map
	 * - gpx: GPX track URL
	 * - show-current-location: boolean to enable/disable current location marker
	 * - lang: language for translations
	 *
	 *
	 */
	static get observedAttributes()
	{
		return ['lat-lon-zoom', 'items', 'gpx', 'show-current-location', 'lang'];
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
				
				// Skip items without ODHActivityPoiTypes or GpsInfo
				if (!item.ODHActivityPoiTypes || !item.ODHActivityPoiTypes[0] || !item.GpsInfo || !item.GpsInfo[0])
				{
					continue;
				}
				
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
				gpxurl = gpxurl.replace('https://lcs.lts.it/downloads/gpx/','https://tourism.opendatahub.com/v1/Activity/Gpx?origin=webcomp-activity-poi')
				this.gpx_layer = omnivore.gpx(gpxurl).addTo(this.map);
			}
		}

		if (name == 'show-current-location' && thiswebcomponent.map !== null)
		{
			thiswebcomponent.handleCurrentLocationChange(newVal)
		}

	}

	/**
	 * Handle enabling/disabling current location tracking
	 * @param {string|null} newVal - Attribute value (truthy to enable, null/empty to disable)
	 */
	handleCurrentLocationChange(newVal)
	{
		// Disable if attribute is removed or falsy
		if (!newVal || newVal === 'false')
		{
			this.stopGeolocation()
			return
		}

		// Enable geolocation
		if (!navigator.geolocation)
		{
			console.warn(this.t('geolocation-not-supported'))
			return
		}

		// If already watching, don't start again
		if (this.geolocationWatchId !== null)
		{
			return
		}

		let thiswebcomponent = this

		// Success handler
		function onGeolocationSuccess(position)
		{
			let lat = position.coords.latitude
			let lon = position.coords.longitude
			let accuracy = position.coords.accuracy

			// Remove existing marker and circle if they exist
			if (thiswebcomponent.currentLocationMarker)
			{
				thiswebcomponent.map.removeLayer(thiswebcomponent.currentLocationMarker)
			}
			if (thiswebcomponent.currentLocationCircle)
			{
				thiswebcomponent.map.removeLayer(thiswebcomponent.currentLocationCircle)
			}

			// Create marker for current location
			thiswebcomponent.currentLocationMarker = L.marker([lat, lon], {
				title: thiswebcomponent.t('current-location-label')
			})
			thiswebcomponent.currentLocationMarker.bindPopup(thiswebcomponent.t('current-location-label'))
			thiswebcomponent.currentLocationMarker.addTo(thiswebcomponent.map)

			// Add accuracy circle
			thiswebcomponent.currentLocationCircle = L.circle([lat, lon], {
				radius: accuracy,
				fillColor: '#3388ff',
				fillOpacity: 0.2,
				color: '#3388ff',
				weight: 1
			})
			thiswebcomponent.currentLocationCircle.addTo(thiswebcomponent.map)
		}

		// Error handler
		function onGeolocationError(error)
		{
			let errorMessage = ''
			switch(error.code)
			{
				case error.PERMISSION_DENIED:
					errorMessage = thiswebcomponent.t('geolocation-permission-denied')
					break
				case error.POSITION_UNAVAILABLE:
					errorMessage = thiswebcomponent.t('geolocation-unavailable')
					break
				case error.TIMEOUT:
					errorMessage = thiswebcomponent.t('geolocation-unavailable')
					break
				default:
					errorMessage = thiswebcomponent.t('geolocation-unavailable')
					break
			}
			console.warn(errorMessage)
			// Clean up on error
			thiswebcomponent.stopGeolocation()
		}

		// Start watching position
		this.geolocationWatchId = navigator.geolocation.watchPosition(
			onGeolocationSuccess,
			onGeolocationError,
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0
			}
		)
	}

	/**
	 * Stop geolocation tracking and remove marker/circle
	 */
	stopGeolocation()
	{
		if (this.geolocationWatchId !== null)
		{
			navigator.geolocation.clearWatch(this.geolocationWatchId)
			this.geolocationWatchId = null
		}

		if (this.currentLocationMarker && this.map)
		{
			this.map.removeLayer(this.currentLocationMarker)
			this.currentLocationMarker = null
		}

		if (this.currentLocationCircle && this.map)
		{
			this.map.removeLayer(this.currentLocationCircle)
			this.currentLocationCircle = null
		}
	}

	/**
	 * Clean up geolocation when component is disconnected
	 */
	disconnectedCallback()
	{
		this.stopGeolocation()
	}

}

customElements.define('interactive-map', InteractiveMapComponent);
