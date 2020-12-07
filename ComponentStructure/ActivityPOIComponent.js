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

        const itemVisualizer = this._shadowRoot.querySelector('item-visualizer');
        itemVisualizer.elementid = 999;

        /**
         * InteractiveMap component
         * */

        const interactiveMap = this._shadowRoot.querySelector('interactive-map');
        interactiveMap.elementsonmap = [{"elementID":1,"lat":45,"lon":45}];
        //here the onclick function of the map markers' is set
        interactiveMap.elementonclick = showPOIActivityFromMap;

        /**
         * CategoriesChoice component
         * */

        const categoriesChoice = this._shadowRoot.querySelector('categories-choice');
        categoriesChoice.categoriesinformation = [{"categoryID":1,"category-name":{"EN":"museum","IT":"museo"},"category-icon":"directory","category-color":"#ff8360"}];
        categoriesChoice.activecategories = {1:false};
        categoriesChoice.onchangeselectedcategories = searchPOIActivitiesByCategories;


        /**
         * SearchItems component
         * */
        const searchItems = this._shadowRoot.querySelector('search-items');
        searchItems.search = searchPOIActivitiesByName;
        searchItems.resultonclick = showPOIActivityFromList;
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

