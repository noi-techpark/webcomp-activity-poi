const interactiveMap_template = document.createElement('template');

interactiveMap_template.innerHTML = `
    <div id="mapid"></div>
    
    <style>
    #mapid{
    height: 100vh;
    }
</style>
`;


// https://github.com/leaflet-extras/leaflet-map/blob/master/leaflet-core.html

// https://stackoverflow.com/questions/45545456/event-when-web-component-has-loaded

// when you define a custom element, you can have a connectedCallback which is called when you attach an element to your DOM

class InteractiveMap extends HTMLElement {

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(interactiveMap_template.content.cloneNode(true));
        //this.elementsOnMap = [{"elementID":1,"lat":45,"lon":45}];

        //this.$area = this._shadowRoot.querySelector('#elements');

        //this.$marker = this._shadowRoot.querySelector('#marker');

        //this.$marker = this._shadowRoot.querySelector('#marker');
        
       
    }
    
    connectedCallback()
    {
   	 
   	 // super.connectedCallback();
   	 let mapdiv = this._shadowRoot.querySelector('#mapid')
       console.log(mapdiv);
       
   	 console.log(this.elementonclick)
   	 
   	 setTimeout(async function(){
   	 
       
       let oThis = this;
       
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
						return function() { showPOIActivityFromMap(Id); }
				
				})(item.Id));
				
				cluster.addLayer(marker);

				// show a marker on the map
				// .bindPopup('The center of the world').addTo(map);
			}
			
			map.addLayer(cluster);
	  		
   	 },0);
    }

    //TODO: not finding the div with id "mapid"
    async connectedCallback(){
        console.log(document.getElementById("mapid"));

        // initialize Leaflet
        var map = L.map(this._shadowRoot.getElementById("mapid")).setView({
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

        //let items = this.elementsonmap;

        let response = await fetch('map.json')
        let json = await response.json()
        console.log(json)

        let items = json.Items;

        var cluster = L.markerClusterGroup();

        for (let i = 0; i < items.length; i++)
        {
            let item = items[i]

            console.log(item.Type)

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

            cluster.addLayer(L.marker([item.GpsInfo[0].Latitude, item.GpsInfo[0].Longitude], {
                icon: markerIcon
            }));

            // show a marker on the map
            // .bindPopup('The center of the world').addTo(map);
        }

        map.addLayer(cluster);
    }

    render() {

    }

    static get observedAttributes() {
        return ['elementsonmap','elementonclick'];
    }

    get elementsonmap(){
        return this.getAttribute('elementsonmap');
    }

    set elementsonmap(value){
        this.setAttribute('elementsonmap', value);
        this.render();
    }

    get elementonclick(){
        return this.getAttribute('elementonclick');
    }

    set elementonclick(value){
        this.setAttribute('elementonclick', value);
        //this.$marker.addEventListener('click',value);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    render(){
        //TODO: draw on map the elements
        //this.$area.innerHTML = this.elementsonmap;
    }
    */
}

customElements.define('interactive-map', InteractiveMap);