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

        this.lat = 46.6;
        this.lon = 11.4;

        console.log(this.lat);
    }
    
    connectedCallback()
    {
   	 
   	 // super.connectedCallback();
   	 let mapdiv = this._shadowRoot.querySelector('#mapid')

		let thiswebcomponent = this
			

   	 setTimeout(async function(){
   	 
       
	  		// initialize Leaflet
		    thiswebcomponent.map = L.map(mapdiv).setView({
	  			lon : thiswebcomponent.lon,
	  			lat : thiswebcomponent.lat
	  		}, 9);
	
	  		// add the OpenStreetMap tiles
	  		L.tileLayer(
	  						'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	  						{
	  							maxZoom : 19,
	  							attribution : '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
	  						}).addTo(thiswebcomponent.map);
	
	  		// show the scale bar on the lower left corner
	  		L.control.scale().addTo(thiswebcomponent.map);
	  		
	  		thiswebcomponent.markerClusterGroup = L.markerClusterGroup();

		    thiswebcomponent.map.addLayer(thiswebcomponent.markerClusterGroup);
	  		
   	 },0);
    }
    
    static get observedAttributes() {
       return ['mask','lat','lon','radius', 'apoiid'];
    }

	get lat() {
		return this.getAttribute('lat');
	}

	set lat(val) {
		this.setAttribute('lat', val);
	}

	get lon() {
		return this.getAttribute('lon');
	}

	set lon(val) {
		this.setAttribute('lon', val);
	}

    
    async attributeChangedCallback(name, oldVal, newVal) {
   	 // alert(name + ': ' + newVal)
   	 
   	 let thiswebcomponent = this
   	 
   	 // alert(this.getAttribute('apoiid'))
   	 
   	 let params = new URLSearchParams()
 	    params.append('pagesize','100')
 	    if (this.getAttribute('mask') != null)
 	   	 params.append('type', this.getAttribute('mask'))
 	    if (this.getAttribute('apoiid') != null)
 	   	 params.append('idlist', this.getAttribute('apoiid'))
   	 
   	 this.markerClusterGroup.clearLayers();
   	 
   	   let response = await fetch('https://tourism.opendatahub.bz.it/api/ODHActivityPoi?' + params.toString())
			let json = await response.json()
			
			let items = json.Items;
			
			for (let i = 0; i < items.length; i++)
			{
				let item = items[i]
				

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
				
				this.markerClusterGroup.addLayer(marker);

				// show a marker on the map
				// .bindPopup('The center of the world').addTo(map);
			}

		if (name == 'lat'){
			thiswebcomponent.map.setView(new L.LatLng(newVal, this.lon), 9);
		}
		if(name == "lon")
			thiswebcomponent.map.setView(new L.LatLng(this.lat, newVal), 9);

    }



}

customElements.define('interactive-map', InteractiveMap);