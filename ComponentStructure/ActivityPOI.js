//ActivityPOI properties
var displayedElements = [];


//FUNCTIONS

/**
 * @param: elementID
 * @what: based on the element clicked on the map, it shows
 * the details of the element in the ItemVisualizer
 * @returns: null
 * */
function showPOIActivityFromMap(id){
	console.log('itemVisualizer')
   console.log(itemVisualizer)
   
   //displayedElements = [elementID]
   // itemVisualizer.elementid = id;
   itemVisualizer.setAttribute('elementid', id);
   // itemVisualizer.elementid = id
   //itemVisualizer.style.zindex = 99999;
   //searchItems.style.zindex = 0;

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
function showPOIActivityFromList(id){
    alert("an item from the result list has been clicked2");

    console.log('itemVisualizer')
    console.log(itemVisualizer)
    
    //displayedElements = [elementID]
    // itemVisualizer.elementid = id;
    itemVisualizer.setAttribute('elementid', id);
    //itemVisualizer.style.zindex = 99999;
    //searchItems.style.zindex = 0;
}


/**
 * ItemVisualizer component
 * */

const itemVisualizer = document.querySelector('item-visualizer');
// itemVisualizer.elementid = 999;

/**
 * InteractiveMap component
 * */

const interactiveMap = document.querySelector('interactive-map');
// interactiveMap.elementsonmap = [{"elementID":1,"lat":45,"lon":45}];
//here the onclick function of the map markers' is set
// interactiveMap.elementonclick = showPOIActivityFromMap;

/**
 * CategoriesChoice component
 * */

const categoriesChoice = document.querySelector('categories-choice');
// categoriesChoice.categoriesinformation = [{"categoryID":1,"category-name":{"EN":"museum","IT":"museo"},"category-icon":"directory","category-color":"#ff8360"}];
// categoriesChoice.activecategories = {1:false};
// categoriesChoice.onchangeselectedcategories = searchPOIActivitiesByCategories;


/**
 * SearchItems component
 * */
const searchItems = document.querySelector('search-items');
// searchItems.search = searchPOIActivitiesByName;
// searchItems.resultonclick = showPOIActivityFromList;
