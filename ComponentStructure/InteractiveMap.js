const interactiveMap_template = document.createElement('template');

interactiveMap_template.innerHTML = `

    <h1>InteractiveMap</h1>
    <p id="elements"></p>
    <div id="marker">fake marker</div>
    
    <div id="mapid"></div>
`;



class InteractiveMap extends HTMLElement {

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(interactiveMap_template.content.cloneNode(true));
        //this.elementsOnMap = [{"elementID":1,"lat":45,"lon":45}];

        this.$area = this._shadowRoot.querySelector('#elements');

        this.$marker = this._shadowRoot.querySelector('#marker');

    }

    //TODO: not finding the div with id "mapid"
    async connectedCallback(){

        // initialize Leaflet
        var map = L.map('mapid').setView({
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
        this.innerHTML = `<h1>InteractiveMap</h1>`;
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
        this.$marker.addEventListener('click',value);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    render(){
        this.$area.innerHTML = this.elementsonmap; //TODO: draw on map the elements
    }
}

customElements.define('interactive-map', InteractiveMap);