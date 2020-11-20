//ActivityPOI properties
var displayedElements = [];


//functions

function showPOIActivityFromMap(){
    alert("an element in the map has been clicked");
}

function searchPOIActivitiesByName(){
    alert("search function");
}

function searchPOIActivitiesByCategories(){
    alert("search by categories");
}

function showPOIActivityFromList(){
    alert("an item from the result list has been clicked");
}


/**
 * ItemVisualizer component
 * */

const itemVisualizer = document.querySelector('item-visualizer');
itemVisualizer.elementid = 999;

/**
 * InteractiveMap component
 * */

const interactiveMap = document.querySelector('interactive-map');
interactiveMap.elementsonmap = [{"elementID":1,"lat":45,"lon":45}];
interactiveMap.elementonclick = showPOIActivityFromMap;

/**
 * CategoriesChoice component
 * */

const categoriesChoice = document.querySelector('categories-choice');
categoriesChoice.categoriesinformation = [{"categoryID":1,"category-name":{"EN":"museum","IT":"museo"},"category-icon":"directory","category-color":"#ff8360"}];
categoriesChoice.activecategories = {1:false};
categoriesChoice.onchangeselectedcategories = searchPOIActivitiesByCategories;


/**
 * SearchItems component
 * */
const searchItems = document.querySelector('search-items');
searchItems.search = searchPOIActivitiesByName;
searchItems.resultonclick = showPOIActivityFromList;