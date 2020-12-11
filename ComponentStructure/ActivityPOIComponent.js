const activityPOI_template = document.createElement('template');

activityPOI_template.innerHTML = `
    <div id="webcomponentsContainer">
        <div id="mapContainer">
            <interactive-map></interactive-map>
        </div>
        <div id="categoriesContainer">
            <categories-choice></categories-choice>
        </div>
        <div id="itemContainer">
            <item-visualizer></item-visualizer>
        </div>
        <div id="searchContainer">
            <search-items></search-items>
        </div>
    </div>
    
    
    <style>
    @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
    
    html, body, #webcomponentsContainer {
        height: 100%;
        margin: 0px;
        padding; 0px;
        overflow: hidden;
    }
    
    #mapContainer {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    
    #categoriesContainer {
        position: absolute;
        top: 0;
        left: 50%;
    }
    
    #itemContainer {
        position: absolute;
        top: 0;
        left: 0;
    }
    
    #searchContainer {
        position: absolute;
        top: 0;
        left: 0;
    }
    </style>
`;

class ActivityPOIComponent extends HTMLElement{
    constructor(){
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(activityPOI_template.content.cloneNode(true));

        /**
         * ItemVisualizer component
         * */

        this.$itemVisualizer = this._shadowRoot.querySelector('item-visualizer');

        /**
         * InteractiveMap component
         * */

        this.$interactiveMap = this._shadowRoot.querySelector('interactive-map');
        //here the onclick function of the map markers' is set
        this.$interactiveMap.elementonclick = showPOIActivityFromMap;

        /**
         * CategoriesChoice component
         * */

        this.$categoriesChoice = this._shadowRoot.querySelector('categories-choice');
        this.$categoriesChoice.activecategories = {1:false};
        this.$categoriesChoice.onchangeselectedcategories = searchPOIActivitiesByCategories;


        /**
         * SearchItems component
         * */
        this.$searchItems = this._shadowRoot.querySelector('search-items');
        this.$searchItems.search = searchPOIActivitiesByName;
        this.$searchItems.resultonclick = showPOIActivityFromList;
    }

    async connectedCallback(){
        let response_1 = await fetch('map.json')
        let json = await response_1.json()

        let items = json.Items;

        this.$itemVisualizer.elementid = "smgpoi107";
        this.$interactiveMap.elementsonmap = {items};

        let response_2 = await fetch('poi-types.json')
        let types = await response_2.json();

        let category_types = [];

        for(var i = 0; i < types.length; i++){
            let type = types[i]

            if (type.Type != 'Type')
                continue;

            category_types.push(type);

            for (let j = 0; j < types.length; j++)
            {
                let subtype = types[j]
                if (subtype.Type != 'SubType' || subtype.Parent != type.Key)
                    continue;

                category_types.push(subtype);
            }
        }

        this.$categoriesChoice.categoriesinformation = {category_types};
    }



}

/**
 * @param: elementID
 * @what: based on the element clicked on the map, it shows
 * the details of the element in the ItemVisualizer
 * @returns: null
 * */
function showPOIActivityFromMap(){
    alert("an element in the map has been clicked");

    //displayedElements = [elementID]
    //itemVisualizer.elementid = elementID;
    //itemVisualizer.style.zindex = 99999;
    //searchItems.style.zindex = 0;
}

/**
 * @param: search input
 * @what: it makes an API call to have the list of item results,
 * and it displays them
 * @returns: null
 * */
function searchPOIActivitiesByName(){
    alert("search function");

    //results = API call to get results
    //searchItems.resultsitems = results
    //set elements on map
}

/**
 * @param: {"categoryID":boolean} -> true if selected, false otherwise
 * @what:
 * @returns: null
 * */
function searchPOIActivitiesByCategories(){
    alert("search by categories");

    //update categoriesChoice.activecategories
    //elementsID = search elements with the categories = true
    //displayedElements = elementsID
    //update interactiveMap.elementsonmap
    //update searchItems.resultonclick
    //searchItems.style.zindex = 99999;
    //itemVisualizer.style.zindex = 0;
}

/**
 * @param: elementID
 * @what: based on the element clicked on the list, it shows
 * the details of the element in the ItemVisualizer
 * @returns: null
 * */
function showPOIActivityFromList(){
    alert("an item from the result list has been clicked");

    //displayedElements = [elementID]
    //itemVisualizer.elementid = elementID;
    //itemVisualizer.style.zindex = 99999;
    //searchItems.style.zindex = 0;
}

customElements.define('activity-poi', ActivityPOIComponent);

