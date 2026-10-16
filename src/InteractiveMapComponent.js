// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
	itemLatLon,
	mapMarkerIconUrl,
	resolveItemMainCategoryId,
	tourismUrl
} from './odhApi.js'

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
          width: 100%;
       }
       :host {
        display: block;
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow: hidden;
    	}
       /* Keep zoom / attribution clear of the mobile category bar */
       @media only screen and (max-width: 768px) {
         .leaflet-bottom {
           bottom: calc(88px + env(safe-area-inset-bottom, 0px));
         }
         .leaflet-control-attribution {
           max-width: calc(100vw - 72px);
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
         }
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
		this.currentLocationMarker = null
		this.currentLocationCircle = null
		this.pendingItemsJson = null
	}

	/**
	 * the Leaflet map is created by setting the map center based on the attributes lon and lat
	 * */
	async connectedCallback()
	{
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
				// Fix Leaflet default icon paths
				delete L.Icon.Default.prototype._getIconUrl;
				L.Icon.Default.mergeOptions({
					iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
					iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
					shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
				});

				// Keep zoom from going so far out that world tiles repeat endlessly
				// Lower = more zoomed out. Floor keeps world tiles from repeating endlessly.
				const MIN_ZOOM = 5;
				const maxZoom = 19;
				const requestedZoom = Number(lat_lon_zoom[2]);
				const initialZoom = Number.isFinite(requestedZoom)
					? Math.max(MIN_ZOOM, Math.min(maxZoom, requestedZoom))
					: 10;

				let map = L.map(mapdiv, {
					zoomControl: false,
					minZoom: MIN_ZOOM,
					maxZoom: maxZoom,
					maxBounds: [[-85, -180], [85, 180]],
					maxBoundsViscosity: 1.0,
					worldCopyJump: false
				})
				thiswebcomponent.map = map

				L.control.zoom({
					position:'bottomright'
				}).addTo(map);

				map.setView(
				{
					lon: lat_lon_zoom[1],
					lat: lat_lon_zoom[0]
				}, initialZoom);

				L.tileLayer(
					'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
					{
						minZoom: MIN_ZOOM,
						maxZoom: maxZoom,
						noWrap: true,
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

				if (thiswebcomponent.pendingItemsJson !== null)
				{
					thiswebcomponent.renderItems(thiswebcomponent.pendingItemsJson)
					thiswebcomponent.pendingItemsJson = null
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
		return ['lat-lon-zoom', 'items', 'gpx', 'show-current-location', 'marker-color', 'lang'];
	}

	async attributeChangedCallback(name, oldVal, newVal)
	{
		let thiswebcomponent = this

		if (name == 'items')
		{
			if (!this.markerClusterGroup)
			{
				this.pendingItemsJson = newVal
				return;
			}
			this.renderItems(newVal)
		}

		if (name == 'lat-lon-zoom' && thiswebcomponent.map !== null)
		{
			let json = JSON.parse(newVal)
			let lat = json[0]
			let lon = json[1]
			let zoom = json[2]
			thiswebcomponent.map.setView(new L.LatLng(lat, lon), zoom);
			
			// Update current location marker if it's enabled
			if (thiswebcomponent.getAttribute('show-current-location'))
			{
				thiswebcomponent.handleCurrentLocationChange(thiswebcomponent.getAttribute('show-current-location'))
			}
		}

		if (name == 'gpx' && thiswebcomponent.map !== null)
		{
			if (this.gpx_layer != null)
				this.map.removeLayer(this.gpx_layer)
			this.gpx_layer = null
			if (newVal !== null)
			{
				let gpxurl = newVal
				gpxurl = gpxurl.replace(
					'https://lcs.lts.it/downloads/gpx/',
					tourismUrl('/v1/Activity/Gpx?origin=webcomp-activity-poi')
				)
				this.gpx_layer = omnivore.gpx(gpxurl).addTo(this.map);
			}
		}

		if (name == 'show-current-location' && thiswebcomponent.map !== null)
		{
			thiswebcomponent.handleCurrentLocationChange(newVal)
		}

		if (name == 'marker-color' && thiswebcomponent.map !== null)
		{
			// Update marker color if current location is enabled
			if (thiswebcomponent.getAttribute('show-current-location'))
			{
				thiswebcomponent.handleCurrentLocationChange(thiswebcomponent.getAttribute('show-current-location'))
			}
		}

	}

	/**
	 * Render activity/POI markers from a JSON attribute payload.
	 * @param {string} itemsJson
	 */
	renderItems(itemsJson)
	{
		const thiswebcomponent = this
		this.markerClusterGroup.clearLayers();
		let items = JSON.parse(itemsJson || '[]')
		let marker_arr = []

		for (let i = 0; i < items.length; i++)
		{
			let item = items[i]

			const latLon = itemLatLon(item)
			if (!latLon)
			{
				continue;
			}

			const mainCategoryId = resolveItemMainCategoryId(item)
			var markerIcon = L.icon(
			{
				iconUrl: mapMarkerIconUrl(mainCategoryId),
				iconSize: [60 / 2, 99 / 2]
			});

			let marker = L.marker(latLon,
			{
				icon: markerIcon
			}).on('click', (function(clickedItem)
			{
				return function()
				{
					thiswebcomponent.markerclick(clickedItem);
				}

			})(item));

			marker_arr.push(marker)

			this.markerClusterGroup.addLayer(marker);
		}

		if (marker_arr.length >= 2 && this.map)
		{
			let group = new L.featureGroup(marker_arr);
			this.map.fitBounds(group.getBounds(),
			{
				maxZoom: 14
			});
		}
	}

	/**
	 * Generate SVG HTML for teardrop/pin marker
	 * @param {string} color - Color for the marker
	 * @returns {string} SVG HTML string
	 */
	markerHtml(color)
	{
		// Teardrop/pin shape marker
		return `
			<svg width="24" height="36" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path d="M12 0C5.373 0 0 5.373 0 12c0 8 12 24 12 24s12-16 12-24C24 5.373 18.627 0 12 0z" fill="${color}" stroke="white" stroke-width="2"/>
				<circle cx="12" cy="12" r="4" fill="white"/>
			</svg>
		`;
	}

	/**
	 * Create Leaflet divIcon with custom marker
	 * @param {string} color - Color for the marker
	 * @returns {L.DivIcon} Leaflet divIcon
	 */
	createDivIcon(color)
	{
		return L.divIcon({
			className: 'wcmc-div-icon',
			html: this.markerHtml(color),
			iconSize: [24, 36],
			iconAnchor: [12, 36],
			popupAnchor: [0, -36],
		});
	}

	/**
	 * Handle enabling/disabling current location marker
	 * Uses the lat/lon from the lat-lon-zoom attribute instead of browser geolocation
	 * @param {string|null} newVal - Attribute value (truthy to enable, null/empty to disable)
	 */
	handleCurrentLocationChange(newVal)
	{
		// Disable if attribute is removed or falsy
		if (!newVal || newVal === 'false')
		{
			this.removeCurrentLocationMarker()
			return
		}

		// Get coordinates from lat-lon-zoom attribute
		let latLonZoomAttr = this.getAttribute('lat-lon-zoom')
		if (!latLonZoomAttr)
		{
			console.warn('Cannot show current location: lat-lon-zoom attribute not set')
			return
		}

		let latLonZoom = JSON.parse(latLonZoomAttr)
		let lat = latLonZoom[0]
		let lon = latLonZoom[1]

		// Get marker color from attribute, default to '#3388ff' (blue)
		let markerColor = this.getAttribute('marker-color') || '#3388ff'

		// Remove existing marker and circle if they exist
		this.removeCurrentLocationMarker()

		// Create marker for current location with custom icon
		let customIcon = this.createDivIcon(markerColor)
		this.currentLocationMarker = L.marker([lat, lon], {
			icon: customIcon
		})
		this.currentLocationMarker.addTo(this.map)
	}

	/**
	 * Remove current location marker and circle
	 */
	removeCurrentLocationMarker()
	{
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

}

customElements.define('interactive-map', InteractiveMapComponent);
