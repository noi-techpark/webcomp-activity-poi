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


// https://github.com/leaflet-extras/leaflet-map/blob/master/leaflet-core.html

// https://stackoverflow.com/questions/45545456/event-when-web-component-has-loaded

// when you define a custom element, you can have a connectedCallback which is called when you attach an element to your DOM

class InteractiveMap extends HTMLElement {

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(interactiveMap_template.content.cloneNode(true));
    }
    
    connectedCallback()
    {
   	 
   	 // super.connectedCallback();
   	 let mapdiv = this._shadowRoot.querySelector('#mapid')

		let thiswebcomponent = this
			

   	 setTimeout(async function(){
   	 
       
	  		// initialize Leaflet
	  		var map = L.map(mapdiv).setView({
	  			lon : 11.4,
	  			lat : 46.6
	  		}, 9);
	
	  		// add the OpenStreetMap tiles
	  		L.tileLayer(
	  						'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	  						{
	  							maxZoom : 19,
	  							attribution : '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
	  						}).addTo(map);
	
	  		// show the scale bar on the lower left corner
	  		L.control.scale().addTo(map);
	  		
	  		let response = await fetch('map.json')
			let json = await response.json()
			console.log(json)
			
			let items = json.Items;
			
			console.log(items)
			
			var cluster = L.markerClusterGroup();
			
			for (let i = 0; i < items.length; i++)
			{
				let item = items[i]
				
				console.log(item)
				

				var markerIcon = L.icon(
				{
					iconUrl : 'img/map_markers/' + item.Type +'.png',
					// shadowUrl : 'leaf-shadow.png',

					iconSize : [ 60/2, 99/2 ], // size of the icon
					// shadowSize : [ 50, 64 ], // size of the shadow
					// iconAnchor : [ 22, 94 ], // point of the icon which will
														// correspond to marker's location
					// shadowAnchor : [ 4, 62 ], // the same for the shadow
					// popupAnchor : [ -3, -76 ]
					// point from which the popup should open relative to the iconAnchor
				});
				
				let marker = L.marker([item.GpsInfo[0].Latitude, item.GpsInfo[0].Longitude], {
					icon: markerIcon
				}).on('click', (function(Id) {
						return function() { thiswebcomponent.markerclick(Id); }
				
				})(item.Id));
				
				cluster.addLayer(marker);

				// show a marker on the map
				// .bindPopup('The center of the world').addTo(map);
			}
			
			map.addLayer(cluster);
	  		
   	 },0);
    }

}

customElements.define('interactive-map', InteractiveMap);