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
    </div>
    
    
    <style>
    
    :host {
        display: block;
        height: 100%;
    }
    
    @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
    
    html, body, #webcomponentsContainer {
        height: 100%;
        margin: 0px;
        padding; 0px;
        overflow: hidden;
    }
    
    #categoriesContainer {
        position: absolute;
        top: 0;
        right: 35vw;
        width: 420px;
        margin-right: -210px;
    }
    
    #itemContainer {
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        height: 100vh;
        box-sizing: border-box;
        z-index: 999;
    }
    
    #searchContainer {
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        z-index: 9999;
        height: 100vh;
        box-sizing: border-box;
    }
    </style>
`;

class ActivityPOIComponent extends HTMLElement{
    constructor(){
        super();
        
        let thiswebcomponent = this

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(activityPOI_template.content.cloneNode(true));

        /**
         * ItemVisualizer component
         * */

        this.$itemVisualizer = this._shadowRoot.querySelector('item-visualizer');
        this.$itemContainer = this._shadowRoot.querySelector('#itemContainer');

        /**
         * SearchItems component
         * */
        this.$searchItems = this._shadowRoot.querySelector('search-items');
        this.$searchContainer = this._shadowRoot.querySelector('#searchContainer');
        // this.$searchItems.search = searchPOIActivitiesByName;
        // this.$searchItems.resultonclick = showPOIActivityFromList;

        /**
         * InteractiveMap component
         * */

        this.$interactiveMap = this._shadowRoot.querySelector('interactive-map');
        //here the onclick function of the map markers' is set
        this.$interactiveMap.markerclick = function(id) {
      	  // alert('hei: ' + id)
      	  thiswebcomponent.$itemVisualizer.setAttribute('apoiid',id);
      	  thiswebcomponent.$searchContainer.style.zIndex = 9999;
      	  thiswebcomponent.$itemContainer.style.zIndex = 99999;
        };

        /**
         * CategoriesChoice component
         * */

        this.$categoriesChoice = this._shadowRoot.querySelector('categories-choice');
        this.$categoriesChoice.oncategorychange = function(type_bitmask, subtype_bitmask, isenabled)
        {
      	  thiswebcomponent.$interactiveMap.setAttribute("mask", type_bitmask)
        }
        // this.$categoriesChoice.activecategories = {1:false};
        // this.$categoriesChoice.onchangeselectedcategories = searchPOIActivitiesByCategories;
    }

    async connectedCallback(){
        
    }



}

customElements.define('activity-poi', ActivityPOIComponent);

