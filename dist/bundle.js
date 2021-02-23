/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 851:
/***/ (() => {



let bundle_script_src = document.currentScript.src

// remove bundle.js
bundle_script_src = bundle_script_src.substring(0, bundle_script_src.length - 'bundle.js'.length)

// alert('>' + bundle_script_src + '<')

window.paths = {
    css: bundle_script_src,
    css_components: bundle_script_src,
    img: bundle_script_src,
    img_category_icons: bundle_script_src,
    img_map_markers: bundle_script_src,
    img_fa_icons: bundle_script_src,
    data: bundle_script_src
};


/***/ }),

/***/ 286:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html, body, #webcomponentsContainer {\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n  overflow: hidden; }\n\n:host {\n  display: block;\n  height: 100%; }\n\n#categoriesContainer {\n  position: absolute;\n  top: 0;\n  right: 35vw;\n  width: 40vw;\n  margin-right: -20vw; }\n  @media only screen and (max-width: 768px) {\n    #categoriesContainer {\n      bottom: 0;\n      top: auto;\n      width: 100vw;\n      margin-right: 0;\n      right: 0;\n      z-index: 9999; } }\n\n#itemContainer {\n  position: absolute;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  height: 100vh;\n  box-sizing: border-box;\n  z-index: 9999; }\n  @media only screen and (max-width: 768px) {\n    #itemContainer {\n      z-index: 99999 !important; } }\n\n#searchContainer {\n  position: absolute;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  z-index: 9999;\n  box-sizing: border-box; }\n\n#loading {\n  position: fixed;\n  z-index: 999999999;\n  bottom: 0;\n  width: 100vw;\n  height: 100vh;\n  background: rgba(55, 55, 55, 0.7); }\n  #loading .lds-ring {\n    display: block;\n    width: 80px;\n    height: 80px;\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 45vh; }\n  #loading .lds-ring div {\n    box-sizing: border-box;\n    display: block;\n    position: absolute;\n    width: 64px;\n    height: 64px;\n    margin: 8px;\n    border: 8px solid #ffffff;\n    border-radius: 50%;\n    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n    border-color: #ffffff transparent transparent transparent; }\n  #loading .lds-ring div:nth-child(1) {\n    animation-delay: -0.45s; }\n  #loading .lds-ring div:nth-child(2) {\n    animation-delay: -0.3s; }\n  #loading .lds-ring div:nth-child(3) {\n    animation-delay: -0.15s; }\n@keyframes lds-ring {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(360deg); } }\n  #loading p {\n    text-align: center;\n    font-family: calibri, verdana, arial;\n    color: #ffffff; }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 369:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.categoriesContainer {\n  text-align: center;\n  width: auto !important; }\n  @media screen and (max-width: 768px) {\n    .categoriesContainer {\n      background: white;\n      padding: 10px; } }\n\n.dropdownCategory {\n  display: inline-block;\n  width: 10vw;\n  height: 10vw;\n  max-height: 65px;\n  max-width: 65px;\n  min-height: 35px;\n  min-width: 35px;\n  text-align: left;\n  position: relative; }\n  .dropdownCategory.selected .category::before {\n    content: '';\n    display: inline-block;\n    width: 15px;\n    height: 15px;\n    -moz-border-radius: 7.5px;\n    -webkit-border-radius: 7.5px;\n    border-radius: 7.5px;\n    background-color: #dc5d3a;\n    position: absolute;\n    z-index: 99999999999999999999;\n    bottom: 5px;\n    right: 5px; }\n    @media screen and (max-width: 768px) {\n      .dropdownCategory.selected .category::before {\n        width: 10px;\n        height: 10px;\n        -moz-border-radius: 5px;\n        -webkit-border-radius: 5px;\n        border-radius: 5px;\n        bottom: 2px;\n        right: 2px; } }\n\n.dropdownCategory:hover .subCategory {\n  display: block; }\n\n.category {\n  display: inline-block;\n  width: 10vw;\n  height: 10vw;\n  max-height: 65px;\n  max-width: 65px;\n  min-height: 35px;\n  min-width: 35px;\n  overflow: hidden; }\n\n.categoryImage {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0; }\n\n.subCategory {\n  padding: 20px;\n  text-align: left;\n  display: none;\n  background-color: white;\n  border-radius: 7px;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);\n  position: absolute;\n  white-space: nowrap;\n  width: auto;\n  z-index: 1; }\n  @media only screen and (max-width: 768px) {\n    .subCategory {\n      position: fixed;\n      right: 10vw;\n      left: 10vw;\n      bottom: 20vh; } }\n  .subCategory::before {\n    content: \"\";\n    position: absolute;\n    border-style: solid;\n    border-width: 0 10px 8px 1px;\n    border-color: transparent transparent #ccc transparent;\n    top: -8px; }\n    @media only screen and (max-width: 1024px) {\n      .subCategory::before {\n        content: none; } }\n  .subCategory::after {\n    content: \"\";\n    position: absolute;\n    border-style: solid;\n    border-width: 0 9px 7px 0;\n    border-color: transparent transparent #fff transparent;\n    top: -7px; }\n    @media only screen and (max-width: 768px) {\n      .subCategory::after {\n        content: none; } }\n\n.subcategory:hover {\n  display: block; }\n\n.subCategoryLeft {\n  left: 10px; }\n\n.subCategoryLeft::before {\n  left: 15px; }\n\n.subCategoryLeft::after {\n  left: 16px; }\n\n.subCategoryRight {\n  right: 0px; }\n\n.subCategoryRight::before {\n  right: 15px; }\n\n.subCategoryRight::after {\n  right: 16px; }\n\n.subCategoryTitleAnderes {\n  color: #6554B7; }\n\n.subCategoryTitleEssen {\n  color: #7fCC86; }\n\n.subCategoryTitleGeschäfte {\n  color: #E37454; }\n\n.subCategoryTitleKultur {\n  color: #FB8464; }\n\n.subCategoryTitleVerkehr {\n  color: #846CEC; }\n\n.subCategoryTitleSommer {\n  color: #3DDCD4; }\n\n.subCategoryTitleWellness {\n  color: #E9E28C; }\n\n.subCategoryTitleWinter {\n  color: #3D8CC4; }\n\n.subCategoryItem {\n  margin-top: 10px; }\n\n@media only screen and (min-width: 768px) {\n  .categoriesContainer {\n    width: fit-content;\n    height: fit-content;\n    top: 20px;\n    position: relative;\n    z-index: 9999; }\n\n  .dropdownCategory {\n    width: 5vw;\n    height: 5vw; }\n\n  .category {\n    width: 5vw;\n    height: 5vw; } }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 765:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.mainContainer {\n  width: 100vw;\n  z-index: 9999;\n  background: white;\n  height: 100vh;\n  padding: 20px;\n  box-sizing: border-box;\n  overflow: auto; }\n\n.mainContainer.Anderes .titleParagraph {\n  color: #6554B7; }\n.mainContainer.Anderes .fas, .mainContainer.Anderes svg {\n  color: #6554B7; }\n.mainContainer.Anderes .button {\n  background: #6554B7; }\n\n.mainContainer.Essen .titleParagraph {\n  color: #7fCC86; }\n.mainContainer.Essen .fas, .mainContainer.Essen svg {\n  color: #7fCC86; }\n.mainContainer.Essen .button {\n  background: #7fCC86; }\n\n.mainContainer.Geschäfte .titleParagraph {\n  color: #E37454; }\n.mainContainer.Geschäfte .fas, .mainContainer.Geschäfte svg {\n  color: #E37454; }\n.mainContainer.Geschäfte .button {\n  background: #E37454; }\n\n.mainContainer.Kultur .titleParagraph {\n  color: #FB8464; }\n.mainContainer.Kultur .fas, .mainContainer.Kultur svg {\n  color: #FB8464; }\n.mainContainer.Kultur .button {\n  background: #FB8464; }\n\n.mainContainer.Verkehr .titleParagraph {\n  color: #846CEC; }\n.mainContainer.Verkehr .fas, .mainContainer.Verkehr svg {\n  color: #846CEC; }\n.mainContainer.Verkehr .button {\n  background: #846CEC; }\n\n.mainContainer.Sommer .titleParagraph {\n  color: #3DDCD4; }\n.mainContainer.Sommer .fas, .mainContainer.Sommer svg {\n  color: #3DDCD4; }\n.mainContainer.Sommer .button {\n  background: #3DDCD4; }\n\n.mainContainer.Wellness .titleParagraph {\n  color: #E9E28C; }\n.mainContainer.Wellness .fas, .mainContainer.Wellness svg {\n  color: #E9E28C; }\n.mainContainer.Wellness .button {\n  background: #E9E28C; }\n\n.mainContainer.Winter .titleParagraph {\n  color: #3D8CC4; }\n.mainContainer.Winter .fas, .mainContainer.Winter svg {\n  color: #3D8CC4; }\n.mainContainer.Winter .button {\n  background: #3D8CC4; }\n\n#closebutton {\n  float: right; }\n\n.title {\n  clear: both;\n  display: flex;\n  padding: 20px;\n  border-bottom: solid 1px #aaa; }\n\n.titleDiv {\n  flex: 1;\n  text-align: center; }\n\n.resultContainer {\n  /*height: calc(100%-titleDivHeight) ???*/\n  width: 100%;\n  overflow-y: hidden;\n  font-size: 14px;\n  color: #70757A; }\n\n.infoTitle {\n  box-shadow: 0 4px 6px -2px #0000002b;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  overflow: auto; }\n  .infoTitle .fas, .infoTitle svg {\n    float: left;\n    height: 18px;\n    margin-right: 10px; }\n  .infoTitle .infoTitleParagraph {\n    width: calc(100% - 80px);\n    float: left; }\n\n.fas, svg {\n  float: left;\n  height: 18px;\n  margin-right: 10px; }\n\n.info {\n  width: auto;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 20px; }\n\n.image {\n  width: 90vw;\n  display: block;\n  margin-left: auto;\n  margin-right: auto; }\n\n#directions {\n  margin-top: 10px; }\n\n.titleArrowDiv {\n  display: none; }\n\n[class$=\"Label\"] {\n  font-weight: 600; }\n\n@media only screen and (min-width: 768px) {\n  .mainContainer {\n    width: 30vw;\n    height: 100vh;\n    overflow: auto;\n    background: #fff;\n    box-shadow: 0 0 6px #0000001c;\n    padding: 20px; }\n\n  .itemInfo {\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 10px; }\n\n  .info {\n    padding: 20px;\n    width: calc(100% - 40px); }\n\n  .image {\n    width: 26vw; } }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 897:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#mapid {\n  height: 100%; }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 708:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".mainContainer {\n  width: 30vw;\n  padding: 10px;\n  background: #fff;\n  height: 100vh;\n  overflow: scroll;\n  box-shadow: 0 0 6px #0000001c;\n  padding: 20px;\n  transition: 0.5s;\n  z-index: 99999;\n  box-sizing: border-box; }\n  @media only screen and (max-width: 768px) {\n    .mainContainer {\n      width: 100vw;\n      box-sizing: border-box;\n      max-height: 78px !important; } }\n  .mainContainer .title {\n    display: none; }\n\n#closebutton:hover {\n  cursor: pointer; }\n\n.warning {\n  position: absolute;\n  bottom: 0;\n  background: #fffbc1;\n  left: 0;\n  padding: 20px; }\n  .warning p, .warning i, .warning img, .warning svg {\n    color: #b3ab31;\n    float: left; }\n  .warning img, .warning svg {\n    max-height: 18px;\n    max-width: 6%; }\n  .warning p {\n    max-width: 85%;\n    margin-left: 10px; }\n\n.searchInstance {\n  border-bottom: solid 1px #ccc;\n  padding: 10px;\n  transition: 0.2s;\n  clear: both;\n  overflow: auto; }\n  .searchInstance:hover {\n    cursor: pointer;\n    background: #cccccc; }\n  .searchInstance img {\n    float: left;\n    width: 15%;\n    max-width: 60px; }\n  .searchInstance .searchInstanceParagraph {\n    margin-left: auto;\n    margin-right: auto;\n    float: right;\n    width: 80%; }\n\n.searchInstanceParagraph {\n  margin-left: auto;\n  margin-right: auto; }\n\n.notShowingResults {\n  max-height: 80px;\n  overflow: hidden; }\n  .notShowingResults .warning {\n    display: none; }\n\n.showingResults {\n  max-height: 100vh !important;\n  overflow: scroll; }\n\n.searchBox {\n  display: flex;\n  margin-bottom: 20px; }\n  .searchBox input[type=\"text\"] {\n    outline: none;\n    width: 90%;\n    border: solid 1px #eee;\n    border-radius: 5px;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    font-size: 18px;\n    padding: 8px;\n    box-sizing: border-box;\n    border-right: 0; }\n  .searchBox .action {\n    width: 10%;\n    border: solid 1px #eee;\n    border-left: 0;\n    border-radius: 5px;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n    margin: 0;\n    font-size: 18px;\n    line-height: 36px;\n    padding: 10px;\n    height: 18px; }\n\n#error {\n  display: none;\n  width: 30vw;\n  padding: 10px 20px;\n  z-index: 99999;\n  position: fixed;\n  color: #cc8d7b;\n  background: #fff;\n  left: 0;\n  font-family: calibri, verdana, arial;\n  font-size: 12px;\n  margin-top: -20px;\n  box-sizing: border-box; }\n  @media only screen and (max-width: 768px) {\n    #error {\n      z-index: 99999;\n      position: fixed;\n      color: #cc8d7b;\n      background: #fff;\n      width: 100vw;\n      left: 0;\n      padding: 10px; } }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 605:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n* {\n  margin: 0;\n  padding: 0;\n  border: 0; }\n\np {\n  font-family: calibri, verdana, arial;\n  color: #70757A; }\n\na {\n  font-family: calibri, verdana, arial; }\n\nhtml, body {\n  height: 100%;\n  margin: 0px; }\n\n.fas {\n  margin-right: 10px;\n  margin-left: 10px; }\n\n.fas.fa-chevron-up {\n  color: black;\n  margin-top: 3vh;\n  margin-bottom: 1vh;\n  height: 3vh; }\n\n.fas.fa-chevron-down {\n  color: black;\n  margin-top: 3vh;\n  margin-bottom: 1vh;\n  height: 3vh; }\n\n.text {\n  font-size: 14px; }\n\n.titleParagraph {\n  margin-block-start: 1vw;\n  margin-block-end: 1vw;\n  font-size: 18px; }\n\n.infoTitleParagraph {\n  font-size: 14px;\n  margin: 0; }\n\ninput[type=\"text\"] {\n  width: 100%;\n  border: solid 1px #eee;\n  border-radius: 5px;\n  font-size: 18px;\n  padding: 8px;\n  box-sizing: border-box; }\n\nlabel {\n  font-family: arial; }\n\nbutton, a.button {\n  padding: 10px 20px;\n  background: #3DDCD4;\n  border-radius: 5px;\n  text-decoration: none;\n  color: #fff;\n  display: -webkit-inline-box; }\n  button:hover, a.button:hover {\n    cursor: pointer; }\n\n.mainContainer {\n  width: 100vw;\n  z-index: 9999;\n  background: white;\n  height: 100vh;\n  padding: 20px;\n  box-sizing: border-box;\n  overflow: auto; }\n\n.mainContainer.Anderes .titleParagraph {\n  color: #6554B7; }\n.mainContainer.Anderes .fas, .mainContainer.Anderes svg {\n  color: #6554B7; }\n.mainContainer.Anderes .button {\n  background: #6554B7; }\n\n.mainContainer.Essen .titleParagraph {\n  color: #7fCC86; }\n.mainContainer.Essen .fas, .mainContainer.Essen svg {\n  color: #7fCC86; }\n.mainContainer.Essen .button {\n  background: #7fCC86; }\n\n.mainContainer.Geschäfte .titleParagraph {\n  color: #E37454; }\n.mainContainer.Geschäfte .fas, .mainContainer.Geschäfte svg {\n  color: #E37454; }\n.mainContainer.Geschäfte .button {\n  background: #E37454; }\n\n.mainContainer.Kultur .titleParagraph {\n  color: #FB8464; }\n.mainContainer.Kultur .fas, .mainContainer.Kultur svg {\n  color: #FB8464; }\n.mainContainer.Kultur .button {\n  background: #FB8464; }\n\n.mainContainer.Verkehr .titleParagraph {\n  color: #846CEC; }\n.mainContainer.Verkehr .fas, .mainContainer.Verkehr svg {\n  color: #846CEC; }\n.mainContainer.Verkehr .button {\n  background: #846CEC; }\n\n.mainContainer.Sommer .titleParagraph {\n  color: #3DDCD4; }\n.mainContainer.Sommer .fas, .mainContainer.Sommer svg {\n  color: #3DDCD4; }\n.mainContainer.Sommer .button {\n  background: #3DDCD4; }\n\n.mainContainer.Wellness .titleParagraph {\n  color: #E9E28C; }\n.mainContainer.Wellness .fas, .mainContainer.Wellness svg {\n  color: #E9E28C; }\n.mainContainer.Wellness .button {\n  background: #E9E28C; }\n\n.mainContainer.Winter .titleParagraph {\n  color: #3D8CC4; }\n.mainContainer.Winter .fas, .mainContainer.Winter svg {\n  color: #3D8CC4; }\n.mainContainer.Winter .button {\n  background: #3D8CC4; }\n\n#closebutton {\n  float: right; }\n\n.title {\n  clear: both;\n  display: flex;\n  padding: 20px;\n  border-bottom: solid 1px #aaa; }\n\n.titleDiv {\n  flex: 1;\n  text-align: center; }\n\n.resultContainer {\n  /*height: calc(100%-titleDivHeight) ???*/\n  width: 100%;\n  overflow-y: hidden;\n  font-size: 14px;\n  color: #70757A; }\n\n.infoTitle {\n  box-shadow: 0 4px 6px -2px #0000002b;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  overflow: auto; }\n  .infoTitle .fas, .infoTitle svg {\n    float: left;\n    height: 18px;\n    margin-right: 10px; }\n  .infoTitle .infoTitleParagraph {\n    width: calc(100% - 80px);\n    float: left; }\n\n.fas, svg {\n  float: left;\n  height: 18px;\n  margin-right: 10px; }\n\n.info {\n  width: auto;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 20px; }\n\n.image {\n  width: 90vw;\n  display: block;\n  margin-left: auto;\n  margin-right: auto; }\n\n#directions {\n  margin-top: 10px; }\n\n.titleArrowDiv {\n  display: none; }\n\n[class$=\"Label\"] {\n  font-weight: 600; }\n\n@media only screen and (min-width: 768px) {\n  .mainContainer {\n    width: 30vw;\n    height: 100vh;\n    overflow: auto;\n    background: #fff;\n    box-shadow: 0 0 6px #0000001c;\n    padding: 20px; }\n\n  .itemInfo {\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 10px; }\n\n  .info {\n    padding: 20px;\n    width: calc(100% - 40px); }\n\n  .image {\n    width: 26vw; } }\n.mainContainer {\n  width: 30vw;\n  padding: 10px;\n  background: #fff;\n  height: 100vh;\n  overflow: scroll;\n  box-shadow: 0 0 6px #0000001c;\n  padding: 20px;\n  transition: 0.5s;\n  z-index: 99999;\n  box-sizing: border-box; }\n  @media only screen and (max-width: 768px) {\n    .mainContainer {\n      width: 100vw;\n      box-sizing: border-box;\n      max-height: 78px !important; } }\n  .mainContainer .title {\n    display: none; }\n\n#closebutton:hover {\n  cursor: pointer; }\n\n.warning {\n  position: absolute;\n  bottom: 0;\n  background: #fffbc1;\n  left: 0;\n  padding: 20px; }\n  .warning p, .warning i, .warning img, .warning svg {\n    color: #b3ab31;\n    float: left; }\n  .warning img, .warning svg {\n    max-height: 18px;\n    max-width: 6%; }\n  .warning p {\n    max-width: 85%;\n    margin-left: 10px; }\n\n.searchInstance {\n  border-bottom: solid 1px #ccc;\n  padding: 10px;\n  transition: 0.2s;\n  clear: both;\n  overflow: auto; }\n  .searchInstance:hover {\n    cursor: pointer;\n    background: #cccccc; }\n  .searchInstance img {\n    float: left;\n    width: 15%;\n    max-width: 60px; }\n  .searchInstance .searchInstanceParagraph {\n    margin-left: auto;\n    margin-right: auto;\n    float: right;\n    width: 80%; }\n\n.searchInstanceParagraph {\n  margin-left: auto;\n  margin-right: auto; }\n\n.notShowingResults {\n  max-height: 80px;\n  overflow: hidden; }\n  .notShowingResults .warning {\n    display: none; }\n\n.showingResults {\n  max-height: 100vh !important;\n  overflow: scroll; }\n\n.searchBox {\n  display: flex;\n  margin-bottom: 20px; }\n  .searchBox input[type=\"text\"] {\n    outline: none;\n    width: 90%;\n    border: solid 1px #eee;\n    border-radius: 5px;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    font-size: 18px;\n    padding: 8px;\n    box-sizing: border-box;\n    border-right: 0; }\n  .searchBox .action {\n    width: 10%;\n    border: solid 1px #eee;\n    border-left: 0;\n    border-radius: 5px;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n    margin: 0;\n    font-size: 18px;\n    line-height: 36px;\n    padding: 10px;\n    height: 18px; }\n\n#error {\n  display: none;\n  width: 30vw;\n  padding: 10px 20px;\n  z-index: 99999;\n  position: fixed;\n  color: #cc8d7b;\n  background: #fff;\n  left: 0;\n  font-family: calibri, verdana, arial;\n  font-size: 12px;\n  margin-top: -20px;\n  box-sizing: border-box; }\n  @media only screen and (max-width: 768px) {\n    #error {\n      z-index: 99999;\n      position: fixed;\n      color: #cc8d7b;\n      background: #fff;\n      width: 100vw;\n      left: 0;\n      padding: 10px; } }\n\n#mapid {\n  height: 100%; }\n\n.categoriesContainer {\n  text-align: center;\n  width: auto !important; }\n  @media screen and (max-width: 768px) {\n    .categoriesContainer {\n      background: white;\n      padding: 10px; } }\n\n.dropdownCategory {\n  display: inline-block;\n  width: 10vw;\n  height: 10vw;\n  max-height: 65px;\n  max-width: 65px;\n  min-height: 35px;\n  min-width: 35px;\n  text-align: left;\n  position: relative; }\n  .dropdownCategory.selected .category::before {\n    content: '';\n    display: inline-block;\n    width: 15px;\n    height: 15px;\n    -moz-border-radius: 7.5px;\n    -webkit-border-radius: 7.5px;\n    border-radius: 7.5px;\n    background-color: #dc5d3a;\n    position: absolute;\n    z-index: 99999999999999999999;\n    bottom: 5px;\n    right: 5px; }\n    @media screen and (max-width: 768px) {\n      .dropdownCategory.selected .category::before {\n        width: 10px;\n        height: 10px;\n        -moz-border-radius: 5px;\n        -webkit-border-radius: 5px;\n        border-radius: 5px;\n        bottom: 2px;\n        right: 2px; } }\n\n.dropdownCategory:hover .subCategory {\n  display: block; }\n\n.category {\n  display: inline-block;\n  width: 10vw;\n  height: 10vw;\n  max-height: 65px;\n  max-width: 65px;\n  min-height: 35px;\n  min-width: 35px;\n  overflow: hidden; }\n\n.categoryImage {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0; }\n\n.subCategory {\n  padding: 20px;\n  text-align: left;\n  display: none;\n  background-color: white;\n  border-radius: 7px;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);\n  position: absolute;\n  white-space: nowrap;\n  width: auto;\n  z-index: 1; }\n  @media only screen and (max-width: 768px) {\n    .subCategory {\n      position: fixed;\n      right: 10vw;\n      left: 10vw;\n      bottom: 20vh; } }\n  .subCategory::before {\n    content: \"\";\n    position: absolute;\n    border-style: solid;\n    border-width: 0 10px 8px 1px;\n    border-color: transparent transparent #ccc transparent;\n    top: -8px; }\n    @media only screen and (max-width: 1024px) {\n      .subCategory::before {\n        content: none; } }\n  .subCategory::after {\n    content: \"\";\n    position: absolute;\n    border-style: solid;\n    border-width: 0 9px 7px 0;\n    border-color: transparent transparent #fff transparent;\n    top: -7px; }\n    @media only screen and (max-width: 768px) {\n      .subCategory::after {\n        content: none; } }\n\n.subcategory:hover {\n  display: block; }\n\n.subCategoryLeft {\n  left: 10px; }\n\n.subCategoryLeft::before {\n  left: 15px; }\n\n.subCategoryLeft::after {\n  left: 16px; }\n\n.subCategoryRight {\n  right: 0px; }\n\n.subCategoryRight::before {\n  right: 15px; }\n\n.subCategoryRight::after {\n  right: 16px; }\n\n.subCategoryTitleAnderes {\n  color: #6554B7; }\n\n.subCategoryTitleEssen {\n  color: #7fCC86; }\n\n.subCategoryTitleGeschäfte {\n  color: #E37454; }\n\n.subCategoryTitleKultur {\n  color: #FB8464; }\n\n.subCategoryTitleVerkehr {\n  color: #846CEC; }\n\n.subCategoryTitleSommer {\n  color: #3DDCD4; }\n\n.subCategoryTitleWellness {\n  color: #E9E28C; }\n\n.subCategoryTitleWinter {\n  color: #3D8CC4; }\n\n.subCategoryItem {\n  margin-top: 10px; }\n\n@media only screen and (min-width: 768px) {\n  .categoriesContainer {\n    width: fit-content;\n    height: fit-content;\n    top: 20px;\n    position: relative;\n    z-index: 9999; }\n\n  .dropdownCategory {\n    width: 5vw;\n    height: 5vw; }\n\n  .category {\n    width: 5vw;\n    height: 5vw; } }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 127:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(379);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ActivityPOIComponent_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(286);

            

var options = {"injectType":"styleTag"};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ActivityPOIComponent_css__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ActivityPOIComponent_css__WEBPACK_IMPORTED_MODULE_1__/* .default.locals */ .Z.locals || {});

/***/ }),

/***/ 614:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(379);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_categories_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(369);

            

var options = {"injectType":"styleTag"};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_categories_css__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_categories_css__WEBPACK_IMPORTED_MODULE_1__/* .default.locals */ .Z.locals || {});

/***/ }),

/***/ 309:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(379);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_itemVisualizer_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(765);

            

var options = {"injectType":"styleTag"};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_itemVisualizer_css__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_itemVisualizer_css__WEBPACK_IMPORTED_MODULE_1__/* .default.locals */ .Z.locals || {});

/***/ }),

/***/ 611:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(379);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_map_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(897);

            

var options = {"injectType":"styleTag"};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_map_css__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_map_css__WEBPACK_IMPORTED_MODULE_1__/* .default.locals */ .Z.locals || {});

/***/ }),

/***/ 898:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(379);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_search_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(708);

            

var options = {"injectType":"styleTag"};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_search_css__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_search_css__WEBPACK_IMPORTED_MODULE_1__/* .default.locals */ .Z.locals || {});

/***/ }),

/***/ 168:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(379);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_design_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(605);

            

var options = {"injectType":"styleTag"};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_design_css__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_design_css__WEBPACK_IMPORTED_MODULE_1__/* .default.locals */ .Z.locals || {});

/***/ }),

/***/ 379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 263:
/***/ (() => {

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

        <div id="loading" style="display:none">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        <p>LOADING</p>
        </div>
    </div>


    <style>

    @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
    @import "` + paths.css_components + `ActivityPOIComponent.css";

    </style>
`;

class ActivityPOIComponent extends HTMLElement
{



	constructor()
	{
		super();

    this._shadowRoot = this.attachShadow(
      {
        mode: 'open'
      });

		console.log('activity poi constructor')

		this.last_search = '';
		this.last_subcategories = '';

		this.search_items = null
		this.interactive_map = null

	}


	connectedCallback()
	{
		let thiswebcomponent = this

		console.log('activity poi connect')
		console.log(this.shadowRoot)

		let content = activityPOI_template.content.cloneNode(true)
		console.log(content)

		//
		// categories-choice
		//

		let categories_choice = content.querySelector('categories-choice')
		// forward attributes
		categories_choice.setAttribute('lang', this.getAttribute('language'))
		// Set attribute with null convert to null string, this i because I put an if :-(
		if (this.getAttribute('category-filter'))
			categories_choice.setAttribute('category-filter', this.getAttribute('category-filter'))
		categories_choice.oncategorychange = function(odhtagfilter)
		{
			thiswebcomponent.last_subcategories = odhtagfilter
			thiswebcomponent.doSearch()
		}

		//
		// item-visualizer
		//

		function show_item_visualizer(item)
		{
			item_visualizer.setAttribute('apoiid', item.Id);
			searchContainer.style.display = "none";
			itemContainer.style.display = "block";

			if (item.GpsTrack && item.GpsTrack[1].GpxTrackUrl)
			{
				thiswebcomponent.interactive_map.setAttribute('gpx', item.GpsTrack[1].GpxTrackUrl)
			}

		}

		let item_visualizer = content.querySelector('item-visualizer');
		// forward attributes
		item_visualizer.setAttribute('lang', this.getAttribute('language'))
		let itemContainer = content.querySelector('#itemContainer');
		let searchContainer = content.querySelector('#searchContainer');
		itemContainer.style.display = "none";
		item_visualizer.closebuttonfunction = function()
		{
			searchContainer.style.display = "block";
			itemContainer.style.display = "none";
			thiswebcomponent.interactive_map.removeAttribute('gpx')
		}

		//
		// interactive-map
		//

		this.interactive_map = content.querySelector('interactive-map');
		// forward attributes
		let lat = parseFloat(this.getAttribute('lat'))
		let lon = parseFloat(this.getAttribute('lon'))
		let zoom = parseInt(this.getAttribute('zoom'))

		this.interactive_map.setAttribute('lat-lon-zoom', JSON.stringify([lat,lon,zoom]))
		this.interactive_map.setAttribute('radius', this.getAttribute('radius'))
		this.interactive_map.setAttribute('showradius', this.getAttribute('showradius'))
		this.interactive_map.markerclick = function(item)
		{
			show_item_visualizer(item)
		};

		//
		// search-items
		//

		this.search_items = content.querySelector('search-items');
		// forward attributes
		this.search_items.setAttribute('lang', this.getAttribute('language'))
		this.search_items.search_text_changed = function(new_text)
		{
			thiswebcomponent.last_search = new_text
			thiswebcomponent.doSearch()
		}
		this.search_items.onresultclick = function(item)
		{
			thiswebcomponent.interactive_map.setAttribute('lat-lon-zoom', JSON.stringify([item.GpsInfo[0].Latitude, item.GpsInfo[0].Longitude, 19]));
			show_item_visualizer(item)

		}

		//loading
    this.loadingText = content.querySelector("#loading p");
    this.loadingText.textContent = strings["loading"][this.getAttribute('language')]


		this.shadowRoot.appendChild(content)

}


	/**
	 * The search of POI and Activities is done in this function (doSearch) by getting the
	 * selected categories in CategoriesChoice (this.last_subcategories) and the search input of SearchComponent
	 * (this.last_search) and using them as parameters for the API call to ODH .
	 *
	 * As a result of the search, the list of results of the SearchComponent component and the displayed markers
	 * on the map are updated
	 * */
	async doSearch()
	{
		console.log('dosearch')
		console.log(this.last_search)
		console.log(this.last_subcategories)

		let list = []

		let loading = this.shadowRoot.querySelector('#loading');

		loading.style.display = "block";

		// let lat_lon_zoom = JSON.parse(this.getAttribute('lat-lon-zoom'))

		let lat = parseFloat(this.getAttribute('lat'))
		let lon = parseFloat(this.getAttribute('lon'))

		let radius = this.getAttribute('radius')

		if (this.last_search.length > 0 || this.last_subcategories.length > 0)
		{
			let params = new URLSearchParams()
			params.append('pagenumber', '1')
			params.append('pagesize', '10000')
			params.append('searchfilter', this.last_search)
			params.append('odhtagfilter', this.last_subcategories)
			params.append('latitude', lat)
			params.append('longitude', lon)
			if (radius !== null)
				params.append('radius', radius)

			let response = await fetch('https://tourism.opendatahub.bz.it/api/ODHActivityPoi?' + params.toString())
			let json = await response.json();
			list = json.Items;
		}
		this.search_items.setAttribute('items', JSON.stringify(list))
		this.interactive_map.setAttribute('items', JSON.stringify(list))

		loading.style.display = "none";

	}

	/**
	 * The changes to the attributes of the ActivityPOIComponent are managed in these functions (observedAttributes, attributeChangedCallback).
	 *
	 * The attributes are the following:
	 * - lat (double): the latitude of the map center
	 * - lon (double): the longitude of the map center
	 * - radius (double): the radius of the map to show from the coordinates of the map center
	 * - language ('it','de','en'): the preferred language of the webcomponent
	 * - categories:
	 * - directions (boolean): if true, in the details of the POI/Activity a button that links to Google Maps is displayed
	 * */
	static get observedAttributes()
	{
		return ['lat', 'lon', 'radius', 'categories', 'directions','language'];
	}

	async attributeChangedCallback(name, oldVal, newVal)
	{


//		if (name === 'lat')
//		{
//			this.$interactiveMap.lat = newVal
//		}
//		else if (name === 'lon')
//		{
//			this.$interactiveMap.lon = newVal
//		}
//		else if (name === 'radius')
//		{
//			this.$interactiveMap.radius = newVal
//		}
//		else if (name === 'categories')
//		{
//
//		}
//		else if (name === 'directions')
//		{
//			this.$itemVisualizer.directions = newVal
//		}

	}

}

customElements.define('activity-poi', ActivityPOIComponent);


/***/ }),

/***/ 425:
/***/ (() => {

const categoriesChoice_template = document.createElement('template');


categoriesChoice_template.innerHTML = `
    <div class="categoriesContainer">
        <div class="dropdownCategory">
            <div class="category">
            <img class="categoryImage" src="/img/category_icons/Kultur Sehenswuerdigkeiten.svg" alt="img_alt">
            </div>
            <div class="subCategory">
            <p>Culture and Attractions</p>
            <div class="subCategoryItem">
                <input type="checkbox" id="museums" name="museums" value="museums">
                <label for="museums">Museums</label>
            </div>
            </div>
        </div>
      </div>
      
      <style>
      @import "` + paths.css_components + `categories.css";
      @import "` + paths.css + `theme.css";
      @import "` + paths.css + `atoms.css";
      </style>
`;




class CategoriesChoiceComponent extends HTMLElement
{



	constructor()
	{
		super();
		
		this.attachShadow({ mode: 'open' });

//		this._shadowRoot = this.attachShadow(
//		{
//			mode: 'open'
//		});
//		this._shadowRoot.appendChild(categoriesChoice_template.content.cloneNode(true));
//
//		//this.$categoriesInformation = [{"categoryID":1,"category-name":{"EN":"museum","IT":"museo"},"category-icon":"directory","category-color":"#ff8360"}];
//		//this.$activeCategories = {1:false};
//
//		this.$area1 = this._shadowRoot.querySelector('#categories');
//		this.$area2 = this._shadowRoot.querySelector('#active');
//
//		this.$checkbox = this._shadowRoot.querySelector('#checkbox');
//
//
//		this.$category_template = this._shadowRoot.querySelector('div.dropdownCategory');
//		this.$category_parent = this.$category_template.parentElement
//
//		this.$sub_category_template = this.$category_template.querySelector('div.subCategoryItem')
//		this.$sub_category_parent = this.$sub_category_template.parentElement
//
//		this.odhtagfilter = ',';

		this.odhtagfilter = ',';
	}
	
	setup_categories(types, category_template, category_parent, lang, category_has_subcat_selected)
	{
		for (let i = 0; i < types.length; i++)
		{
			let type = types[i]
			if (type.Type != 'Type')
				continue;
			
			// console.log(type.Id)
			
			category_has_subcat_selected.push(0)
			
			let category = category_template.cloneNode(true)
			category.querySelector('div.subCategory > p').textContent = type.TypeDesc[lang] // + ' #' + type.Id
			let subCategoryTitle = 'subCategoryTitle' + type.TypeDesc[lang].replace(/ .*/, '');
			// console.log(subCategoryTitle)
			category.querySelector('div.subCategory > p').classList.add(subCategoryTitle);
			category.querySelector('img.categoryImage').alt = type.TypeDesc[lang]
			
			let imageFileName = type.Key.trim().replace(/[^a-z]/gi,'_')
			console.log(type);

			category.querySelector('img.categoryImage').src = paths.img_category_icons + "category_icons_" + imageFileName + ".png"
			
			let sub_category_template = category.querySelector('div.subCategoryItem')
			let sub_category_parent = sub_category_template.parentElement
			sub_category_template.remove()
			
			let sub_number = this.setup_subcategories(types, type, sub_category_template, sub_category_parent, lang, category, category_has_subcat_selected, category_has_subcat_selected.length - 1)
			
			// if there aren't subcategories - because filtered - then don't add category
			if (sub_number !== 0) 
				category_parent.appendChild(category)
		}
	}
	
	setup_subcategories(types, type, sub_category_template, sub_category_parent, lang, category, category_has_subcat_selected, cat_index)
	{
		let sub_number = 0;
		
		let category_filter = this.getAttribute('category-filter')
		
		// console.log(category_filter)
		
		for (let j = 0; j < types.length; j++)
		{
			let subtype = types[j]
			if (subtype.Type != 'SubType' || subtype.Parent != type.Key)
				continue;

			let skip = false
			if (category_filter !== null)
				if ((',' + category_filter + ',').indexOf(',' + type.Id + '/' + subtype.Id + ',') < 0 && (',' + category_filter + ',').indexOf(',' + type.Id /* + '/*' */ +',') < 0)
					skip = true;
			
			if (skip)
				continue;
			
			// console.log(type.Id + '/' + subtype.Id + '|')
			sub_number++;
			
			let sub_category = sub_category_template.cloneNode(true)
			
			sub_category.querySelector('label').textContent = subtype.TypeDesc[lang] // + ' #' + subtype.Id
			sub_category_parent.appendChild(sub_category)
			this.setup_subcategory_click(sub_category, category, category_has_subcat_selected, cat_index, subtype)
		}
		
		return sub_number
	}
	
	setup_subcategory_click(sub_category, category, category_has_subcat_selected, cat_index, subtype)
	{
		let thiswebcomponent = this
		
		sub_category.querySelector('input').addEventListener('click', function()
		{
			console.log(this)
			if (this.checked)
			{
				if (category_has_subcat_selected[cat_index] == 0)
					category.classList.add('selected')
				category_has_subcat_selected[cat_index]++
				thiswebcomponent.odhtagfilter += subtype.Id + ','
			}
			else
			{
				category_has_subcat_selected[cat_index]--
				if (category_has_subcat_selected[cat_index] == 0)
					category.classList.remove('selected')
				thiswebcomponent.odhtagfilter = thiswebcomponent.odhtagfilter.replace(',' + subtype.Id + ',', ',')
			}
			// document.title = (thiswebcomponent.odhtagfilter.slice(1, -1))
			thiswebcomponent.oncategorychange(thiswebcomponent.odhtagfilter.slice(1, -1))
		});
	}

	async connectedCallback()
	{
		
		let content = categoriesChoice_template.content.cloneNode(true)

		let category_template = content.querySelector('div.dropdownCategory');
		let category_parent = category_template.parentElement
		category_template.remove()

		this.shadowRoot.appendChild(content)

		let lang = this.getAttribute('lang')

		let response = await fetch(/* paths.data + 'poi-types.json' */ 'https://tourism.opendatahub.bz.it/api/ODHActivityPoiTypes')
		let types = await response.json()
		
		let category_has_subcat_selected = []
		
		this.setup_categories(types, category_template, category_parent, lang, category_has_subcat_selected)


//		// alert(2)
//
//		let lang = 'it' // this.getAttribute('lang');
//
//		// alert(lang)
//
//		let category_template = this._shadowRoot.querySelector('div.dropdownCategory');
//		let category_parent = category_template.parentElement
//		category_template.remove()
//
//		//let types = this.categoriesinformation;
//
//		let response = await fetch(paths.data + 'poi-types.json')
//		let types = await response.json()
//
//		let thiswebcomponent = this
//
//		let category_has_subcat_selected = []
//
//		let cat_sub_filter = '' // ',kultur sehenswürdigkeiten,museen,'
//
//		if (types != null)
//		{
//			//Types
//			for (let i = 0; i < types.length; i++)
//			{
//				let type = types[i]
//				if (type.Type != 'Type')
//					continue;
//
//				// exclude categories not in filter
//				if (cat_sub_filter != '' && cat_sub_filter.indexOf(',' + type.Id + ',') < 0)
//					continue;
//
//
//				category_has_subcat_selected.push(0)
//
//				console.log(type.Id)
//				// console.log(type.TypeDesc[lang])
//
//				let category = category_template.cloneNode(true)
//				category.querySelector('div.subCategory > p').textContent = type.TypeDesc[lang] // + ' #' + type.Id
//				let subCategoryTitle = 'subCategoryTitle' + type.TypeDesc["de"].replace(/ .*/, '');
//				console.log(subCategoryTitle)
//				category.querySelector('div.subCategory > p').classList.add(subCategoryTitle);
//				category.querySelector('img.categoryImage').alt = type.TypeDesc[lang]
//				let imageFileName = type.TypeDesc["de"].replace(/\u00e4/g, "ae")
//				imageFileName = imageFileName.replace(/\u00f6/g, "oe")
//				imageFileName = imageFileName.replace(/\u00fc/g, "ue")
//				imageFileName = imageFileName.replace(/\u00c4/g, "Ae")
//				imageFileName = imageFileName.replace(/\u00d6/g, "Oe")
//				imageFileName = imageFileName.replace(/\u00dc/g, "Ue")
//				imageFileName = imageFileName.trim()
//				category.querySelector('img.categoryImage').src = paths.img_category_icons + imageFileName + ".png"
//				category_parent.appendChild(category)
//
//				let sub_category_template = category.querySelector('div.subCategoryItem')
//				let sub_category_parent = sub_category_template.parentElement
//				sub_category_template.remove()
//
//				for (let j = 0; j < types.length; j++)
//				{
//					let subtype = types[j]
//					if (subtype.Type != 'SubType' || subtype.Parent != type.Key)
//						continue;
//
//					// exclude categories not in filter
//					if (cat_sub_filter != '' && cat_sub_filter.indexOf(',' + subtype.Id + ',') < 0)
//						continue;
//
//					console.log('   ' + subtype.Id)
//					let sub_category = sub_category_template.cloneNode(true)
//					sub_category.querySelector('label').textContent = subtype.TypeDesc[lang] // + ' #' + subtype.Id
//					sub_category.querySelector('input').addEventListener('click',
//						(function(type_Bitmask, Subtype_Bitmask, inputElement, subtype_Id, category_has_subcat_selected_idx, category)
//						{
//							return function()
//							{
//								if (inputElement.checked)
//								{
//									thiswebcomponent.odhtagfilter += subtype_Id + ','
//									category_has_subcat_selected[category_has_subcat_selected_idx]++
//									category.classList.add('selected')
//								}
//								else
//								{
//									thiswebcomponent.odhtagfilter = thiswebcomponent.odhtagfilter.replace(',' + subtype_Id + ',', ',')
//									category_has_subcat_selected[category_has_subcat_selected_idx]--
//									if (category_has_subcat_selected[category_has_subcat_selected_idx] == 0)
//										category.classList.remove('selected')
//								}
//
//								document.title = (thiswebcomponent.odhtagfilter.slice(1, -1))
//								// alert(thiswebcomponent.odhtagfilter)
//								thiswebcomponent.oncategorychange(thiswebcomponent.odhtagfilter.slice(1, -1))
//							};
//						})(type.Bitmask, subtype.Bitmask, sub_category.querySelector('input'), subtype.Id, category_has_subcat_selected.length - 1, category))
//					sub_category_parent.appendChild(sub_category)
//				}
//			}
//
//			let subCat = document.querySelectorAll('div.subCategory');
//			for (let j = 0; j < subCat.length / 2; j++)
//			{
//				subCat[j].classList.add('subCategoryLeft');
//				console.log(subCat[j].classList)
//			}
//			for (let j = subCat.length / 2; j < subCat.length; j++)
//			{
//				subCat[j].classList.add('subCategoryRight');
//			}
//		}


	}

	//TODO: categories are appended
	async attributeChangedCallback(name, oldVal, newVal)
	{
		console.log(name);

//		if (name == 'language')
//		{
//
//
//			alert(1)
//			console.log(newVal);
//			let lang = newVal;
//
//			let category_template = this._shadowRoot.querySelector('div.dropdownCategory');
//			let category_parent = category_template.parentElement
//			category_template.remove()
//
//			//let types = this.categoriesinformation;
//
//			let response = await fetch('poi-types.json')
//			let types = await response.json()
//
//			let thiswebcomponent = this
//
//			if (types != null)
//			{
//				//Types
//				for (let i = 0; i < types.length; i++)
//				{
//					let type = types[i]
//					if (type.Type != 'Type')
//						continue;
//
//					console.log(type.Key)
//					console.log(type.TypeDesc[lang])
//
//					let category = category_template.cloneNode(true)
//					category.querySelector('div.subCategory > p').textContent = type.TypeDesc[lang]
//					let subCategoryTitle = 'subCategoryTitle' + type.TypeDesc["de"].replace(/ .*/, '');
//					console.log(subCategoryTitle)
//					category.querySelector('div.subCategory > p').classList.add(subCategoryTitle);
//					category.querySelector('img.categoryImage').alt = type.TypeDesc[lang]
//					let imageFileName = type.TypeDesc["de"].replace(/\u00e4/g, "ae")
//					imageFileName = imageFileName.replace(/\u00f6/g, "oe")
//					imageFileName = imageFileName.replace(/\u00fc/g, "ue")
//					imageFileName = imageFileName.replace(/\u00c4/g, "Ae")
//					imageFileName = imageFileName.replace(/\u00d6/g, "Oe")
//					imageFileName = imageFileName.replace(/\u00dc/g, "Ue")
//					imageFileName = imageFileName.trim()
//					category.querySelector('img.categoryImage').src = paths.img_category_icons + imageFileName + ".png"
//					category_parent.appendChild(category)
//
//					let sub_category_template = category.querySelector('div.subCategoryItem')
//					let sub_category_parent = sub_category_template.parentElement
//					sub_category_template.remove()
//
//					for (let j = 0; j < types.length; j++)
//					{
//						let subtype = types[j]
//						if (subtype.Type != 'SubType' || subtype.Parent != type.Key)
//							continue;
//						// console.log(subtype)
//						let sub_category = sub_category_template.cloneNode(true)
//						sub_category.querySelector('label').textContent = subtype.TypeDesc[lang]
//						sub_category.querySelector('input').addEventListener('click',
//							(function(type_Bitmask, Subtype_Bitmask, inputElement)
//							{
//								return function()
//								{
//									thiswebcomponent.oncategorychange(type_Bitmask, Subtype_Bitmask, inputElement.checked)
//								};
//							})(type.Bitmask, subtype.Bitmask, sub_category.querySelector('input')))
//						sub_category_parent.appendChild(sub_category)
//					}
//				}
//
//				let subCat = document.querySelectorAll('div.subCategory');
//				for (let j = 0; j < subCat.length / 2; j++)
//				{
//					subCat[j].classList.add('subCategoryLeft');
//					console.log(subCat[j].classList)
//				}
//				for (let j = subCat.length / 2; j < subCat.length; j++)
//				{
//					subCat[j].classList.add('subCategoryRight');
//				}
//			}
//		}
	}


}

customElements.define('categories-choice', CategoriesChoiceComponent);

/***/ }),

/***/ 130:
/***/ (() => {

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


class InteractiveMapComponent extends HTMLElement
{

	constructor()
	{
		super();
		this.attachShadow({ mode: 'open' });
		this.map = null
		this.markerClusterGroup = null
		this.gpx_layer = null
	}

	/**
	 * the Leaflet map is created by setting the map center based on the attributes lon and lat
	 * */
	async connectedCallback()
	{

		console.log('map connected')
		
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
				let map = L.map(mapdiv, { zoomControl: false })
				thiswebcomponent.map = map

				L.control.zoom({
					position:'bottomright'
				}).addTo(map);
				
				map.setView(
				{
					lon: lat_lon_zoom[1],
					lat: lat_lon_zoom[0]
				}, lat_lon_zoom[2]);

				L.tileLayer(
					'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
					{
						maxZoom: 19,
						attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
					}).addTo(map);

				L.control.scale().addTo(map);

				thiswebcomponent.markerClusterGroup = L.markerClusterGroup();
				map.addLayer(thiswebcomponent.markerClusterGroup);
				
				if (radius != null && radius != 'null' && showradius != null && showradius == 'true')
					L.circle([lat_lon_zoom[0], lat_lon_zoom[1]], {"radius": parseInt(radius)}).addTo(map);

			},
			500)
	}

	/**
	 * The functions responsible for updating the map when the attributes are changed are get observedAttributes()
	 * and attributeChangedCallback(name, oldVal, newVal).
	 *
	 * The attributes that are observed are the following:
	 * - lat-lon-zoom: latitude, longitude and zoom of the map center
	 * - items (json): list of the elements to show on the map
	 *
	 * 
	 */
	static get observedAttributes()
	{
		return ['lat-lon-zoom', 'items', 'gpx'];
	}

	async attributeChangedCallback(name, oldVal, newVal)
	{
		let thiswebcomponent = this

		if (name == 'items')
		{
			this.markerClusterGroup.clearLayers();
			let items = JSON.parse(newVal)
			let marker_arr = []

			for (let i = 0; i < items.length; i++)
			{
				let item = items[i]
				var markerIcon = L.icon(
				{
					iconUrl: paths.img_map_markers + "map_markers_" + item.ODHActivityPoiTypes[0].Id.trim().replace(/[^a-z]/gi,'_') + '.png',
					iconSize: [60 / 2, 99 / 2]
				});

				if (item.GpsInfo != undefined && item.GpsInfo[0] != undefined)
				{
					let marker = L.marker([item.GpsInfo[0].Latitude, item.GpsInfo[0].Longitude],
					{
						icon: markerIcon
					}).on('click', (function(item)
					{
						return function()
						{
							thiswebcomponent.markerclick(item);
						}

					})(item));

					marker_arr.push(marker)

					this.markerClusterGroup.addLayer(marker);
				}
			}

			if (marker_arr.length >= 2)
			{
				let group = new L.featureGroup(marker_arr);
				this.map.fitBounds(group.getBounds(),
				{
					maxZoom: 14
				});
			}

		}

		if (name == 'lat-lon-zoom' && thiswebcomponent.map !== null)
		{
			let json = JSON.parse(newVal)
			let lat = json[0]
			let lon = json[1]
			let zoom = json[2]
			thiswebcomponent.map.setView(new L.LatLng(lat, lon), zoom);
		}
		
		if (name == 'gpx' && thiswebcomponent.map !== null)
		{
			if (this.gpx_layer != null)
				this.map.removeLayer(this.gpx_layer)
			this.gpx_layer = null
			if (newVal !== null)
			{
				let gpxurl = newVal
				gpxurl = gpxurl.replace('https://lcs.lts.it/downloads/gpx/','https://tourism.opendatahub.bz.it/api/Activity/Gpx/')
				this.gpx_layer = omnivore.gpx(gpxurl).addTo(this.map);
			}
		}

	}

}

customElements.define('interactive-map', InteractiveMapComponent);


/***/ }),

/***/ 746:
/***/ (() => {

const itemVisualizer_template = document.createElement('template');

itemVisualizer_template.innerHTML = `
	<div class="mainContainer">
    <p id="closebutton">
    <img src="` + paths.img_fa_icons + `times-solid.svg" onload="SVGInject(this)"></img>
    </p>

    <!--Title of the POI/Activity-->
      <div class="title">
        <div class="titleDiv" id="Title">
          <p class="titleParagraph">POI or Activity Title</p>
      </div>

      <div class="titleArrowDiv">
          <!--<i class="fas fa-chevron-up" onclick="expand(this)"></i>-->
          <img src="` + paths.img_fa_icons + `chevron-up-solid.svg" onload="SVGInject(this)"></img>
        </div>
      </div>

      <!--General info such as category, age, altitude, place and "get directions" button--->
      <div class="resultContainer">
      <div class="itemInfo" id="itemInformation">
          <div class="infoTitle" id="informationTitle">
            <!--<i class="fas fa-info-circle"></i>-->
            <img src="` + paths.img_fa_icons + `info-circle-solid.svg" onload="SVGInject(this)"></img>
            <p class="infoTitleParagraph">Informations</p>
        </div>

        <div class="info" id="information">
            <div class="informationInstance">
              <p class="text categoryLabel">
              <b id="categoryLabel" >Categoria</b><br>
              <span id="category"></span></p>
          </div>

          <div class="informationInstance">
            <p class="text">
            <b id="ageLabel">Età adatta</b><br>
            <span id="ageFrom"></span>-<span id="ageTo"></span></p>
          </div>

          <div class="informationInstance">
            <p id="altitudeLabel" class="text"><b>Dislivello e altitudine</b><br>
            Dislivello totale: <span id="altitudeDifference"></span> m<br>
            Punto più basso: <span id="altitudeLowestPoint"></span> m<br>
            Punto più alto: <span id="altitudeHighestPoint"></span> m</p>
          </div>

          <div class="informationInstance">
            <p class="text">
            <b id="localityLabel">Località</b><br>
            <span id="location"></span></p>
          </div>

          <div class="informationInstance">
            <a id="directions" class="button" target="_blank">Get directions</a>
          </div>
      </div>

    </div>

    <!--Descriptive text of the POI/Activity-->
    <div class="itemInfo" id="itemDescription">
      <div class="infoTitle" id="descriptionTitle">
        <!--<i class="fas fa-file-alt"></i>-->
        <img src="` + paths.img_fa_icons + `file-alt-solid.svg" onload="SVGInject(this)"></img>
        <p class="infoTitleParagraph">Description</p>
      </div>

      <div class="info" id="description">
        <p class="text"></p>
      </div>
      </div>


    <!--Contacts-->
      <div class="itemInfo" id="itemContacts">
        <div class="infoTitle" id="contactsTitle">
          <!--<i class="fas fa-id-card"></i>-->
          <img src="` + paths.img_fa_icons + `id-card-solid.svg" onload="SVGInject(this)"></img>
          <p class="infoTitleParagraph">Contacts</p>
      </div>

      <div class="info" id="contacts">
          <p class="text"><b><span id="companyName"></span></b><br>
        <span id="address"></span>, <span id="city"></span>, <span id="country"></span></p>
        <p class="text">
        <span>
        <img src="` + paths.img_fa_icons + `envelope-solid.svg" onload="SVGInject(this)"></img>
        <span id="email"></span>
        </span>
        </p>

        <p class="text" style="clear: both;">
        <span>
        <img src="` + paths.img_fa_icons + `phone-alt-solid.svg" onload="SVGInject(this)"></img>
        <span id="phoneNumber"></span>
        </p>
        </span>
      </div>
    </div>
  </div>
</div>

<style>
@import "` + paths.css + `all.css";
@import "` + paths.css_components + `itemVisualizer.css";
@import "` + paths.css + `theme.css";
@import "` + paths.css + `atoms.css";
</style>
`;



class ItemVisualizerComponent extends HTMLElement
{
	constructor()
	{
		super();

		let thiswebcomponent = this

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(itemVisualizer_template.content.cloneNode(true));

		let closebutton = this.shadowRoot.querySelector("#closebutton");
		closebutton.addEventListener('click', function()
		{
			thiswebcomponent.closebuttonfunction()
		});

		this.mainContainer = this.querySelector(".mainContainer");
	}

	/**
	 * Functions to update the information displayed in the ItemVisualizerComponent:
	 * - observedAttributes()
	 * - attributeChangedCallback()
	 * - get/set language()
	 * - get/set apoiid()
	 *
	 * When the attributes 'apoiid','directions','language' are changed, the following happens:
	 * - 'apoiid' (string): new data is retrieved from the ODH API and the obtained information is displayed
	 * - 'directions' (boolean): the "Get directions" button is either displayed or hidden
	 * - 'language' ('it','de','en'): new data is retrieved from the ODH API and the obtained information is displayed
	 *
	 * */

	static get observedAttributes()
	{
		return ['apoiid'];
	}

	async attributeChangedCallback(name, oldVal, newVal)
	{
		let thiswebcomponent = this

		if (name === 'apoiid')
		{
			let lang = this.getAttribute('lang')

			// read data json
			let response = await fetch('https://tourism.opendatahub.bz.it/api/ODHActivityPoi/' + newVal)
			let json = await response.json()
			let item = json

			// copy values from json to html
			var root_element = this.shadowRoot;
			this.writeItem(item, root_element, lang);
			this.updateLabels(item, root_element, lang);

			//update colour of icons and title
			root_element.querySelector('div.mainContainer').className = "mainContainer";
			root_element.querySelector('div.mainContainer').classList.add(item.Type.replace(/ .*/, ''));

		}

//		if (name == 'directions')
//		{
//			if (newVal)
//				this._shadowRoot.querySelector('a#directions').style.display = "block";
//			else
//				this._shadowRoot.querySelector('a#directions').style.display = "none";
//		}

	}

	/**
	 * Function responsible for writing the data about the item into the component.
	 *
	 * @param item: json object obtained from the ODH API that describes the POI or the Activity to display
	 * @param root_element (this._shadowRoot): where to write the information
	 * @param lang ('it','en','de'): language used to display the information about the POI/Activity
	 *
	 */

	writeItem(item, root_element, lang)
	{
		root_element.querySelector('div#Title > p').innerHTML = item.Detail[lang].Title;
		root_element.querySelector('div#description > p').innerHTML = item.Detail[lang].BaseText;

		root_element.querySelector('span#category').innerHTML = item.PoiType;

		if (item.PoiType == null || item.PoiType == "")
		{
			root_element.querySelector('span#category').parentElement.style.display = "none"
		}
		else
		{
			root_element.querySelector('span#category').parentElement.style.display = "block"
		}

		root_element.querySelector('span#ageFrom').innerHTML = item.AgeFrom;
		root_element.querySelector('span#ageTo').innerHTML = item.AgeTo;

		if (item.AgeTo == 0 || item.AgeFrom == 0)
		{
			root_element.querySelector('span#ageTo').parentElement.style.display = "none"
		}
		else
		{
			root_element.querySelector('span#ageTo').parentElement.style.display = "block"
		}

		root_element.querySelector('span#altitudeDifference').innerHTML = item.AltitudeDifference; //oppure AltitudeSumUp?
		root_element.querySelector('span#altitudeLowestPoint').innerHTML = item.AltitudeLowestPoint;
		root_element.querySelector('span#altitudeHighestPoint').innerHTML = item.AltitudeHighestPoint;

		if (item.AltitudeDifference == 0 || item.AltitudeLowestPoint == 0 || item.AltitudeHighestPoint == 0)
		{
			root_element.querySelector('span#altitudeDifference').parentElement.style.display = "none"
		}
		else
		{
			root_element.querySelector('span#altitudeDifference').parentElement.style.display = "block"
		}

		root_element.querySelector('span#location').innerHTML = item.LocationInfo.TvInfo.Name[lang];
		//image gallery -> item.ImageGallery --- How to add a Gallery

		if (item.ContactInfos[lang] != undefined)
		{
			root_element.querySelector('span#companyName').parentElement.style.display = "block";
			root_element.querySelector('span#companyName').innerHTML = item.ContactInfos[lang].CompanyName;
			root_element.querySelector('span#address').innerHTML = item.ContactInfos[lang].Address;
			root_element.querySelector('span#city').innerHTML = item.ContactInfos[lang].City;
			root_element.querySelector('span#country').innerHTML = item.ContactInfos[lang].CountryName;
			root_element.querySelector('span#email').innerHTML = item.ContactInfos[lang].Email;
			root_element.querySelector('span#phoneNumber').innerHTML = item.ContactInfos[lang].Phonenumber;
			root_element.querySelector('a#directions').setAttribute("href", "http://maps.google.com/maps?q=" + item.GpsInfo[0].Latitude + "," + item.GpsInfo[0].Longitude);
		}
		else
		{
			root_element.querySelector('span#companyName').parentElement.style.display = "none"
		}
	}

	updateLabels(item, root_element, lang){
		root_element.querySelector('#itemInformation .infoTitleParagraph').innerHTML = strings["information"][lang];
		root_element.querySelector('#itemDescription .infoTitleParagraph').innerHTML = strings["description"][lang];
		console.log(root_element.querySelector('p#categoryLabel'));
		console.log(root_element.querySelector('span#category'));
		root_element.querySelector('#categoryLabel').innerText = strings["category"][lang];
		console.log(root_element.querySelector('span#category'));
		root_element.querySelector('#ageLabel').innerText = strings["suitable-age"][lang];
		root_element.querySelector('#localityLabel').innerText = strings["locality"][lang];
		root_element.querySelector('#itemContacts .infoTitleParagraph').innerText = strings["contacts"][lang];
		root_element.querySelector('#altitudeLabel').innerText = strings["difference-altitude"][lang];
		root_element.querySelector('a#directions').textContent = strings["get-directions"][lang];
	}


}

customElements.define('item-visualizer', ItemVisualizerComponent);


/***/ }),

/***/ 275:
/***/ (() => {

const search_template = document.createElement('template');

search_template.innerHTML = `

        <div class="mainContainer notShowingResults">

    <div class="searchBox">
     <input type="text">
     <img class="action" src="` + paths.img_fa_icons + `search-solid.svg" onload="SVGInject(this)"></img>
    </div>

    <div class="title">
     <div class="titleDiv">
      <p class="titleParagraph">Search title</p>
  </div>
  <div class="titleArrowDiv">
     </div>
    </div>

    <div class="resultContainer">
     <div class="searchInstance">
      <!--Image added-->
         <img>

      <div class="searchInstanceParagraph">
      <p class="text"><b>Museum name</b><br />Museum category</p>
   </div>
  </div>
 </div>

 <div id="error">
     <p></p>
  </div>

 <!--Added warning-->
    <div class="warning">
    <img class="svg" src="` + paths.img_fa_icons + `exclamation-triangle-solid.svg" onload="SVGInject(this)"></img>
 <p>The search results are limited to the categories that are selected on the map</p>

</div>
</div>
</div>

<style>
@import "` + paths.css + `all.css";
@import "` + paths.css_components + `search.css";
@import "` + paths.css + `theme.css";
@import "` + paths.css + `atoms.css";
</style>
`;




class SearchComponent extends HTMLElement
{
	constructor()
	{
		super();

		let webcomponent = this;

		this._shadowRoot = this.attachShadow(
		{
			mode: 'open'
		});
		this._shadowRoot.appendChild(search_template.content.cloneNode(true));

		//this.$elementID = "elementID";

		this.$searchbutton = this._shadowRoot.querySelector("#search-button");

		//container of everything
		this.mainContainer = this._shadowRoot.querySelector(".mainContainer");

		//container of result items
		this.resultsContainer = this._shadowRoot.querySelector(".resultContainer");
		this.resultsContainer.style.display = "none";

		//result items
		this.searchInstance_template = this._shadowRoot.querySelector(".searchInstance");
		this.resultsContainer.removeChild(this.searchInstance_template)

		let input = this._shadowRoot.querySelector("input");
		input.addEventListener("keyup", function(event)
		{
			if (event.code === 'Enter')
			{
				webcomponent.on_search_text_changed(input.value)
			}
		});

		this.actionButton = this._shadowRoot.querySelector(".action");
		this.actionButton.addEventListener("click", function()
		{
			if (webcomponent.actionButton.classList.contains("fa-search"))
			{
				// webcomponent.doSearch(input.value)
				webcomponent.on_search_text_changed(input.value)
			}
			else if (webcomponent.actionButton.classList.contains("fa-times"))
			{
				webcomponent.mainContainer.classList.remove("showingResults");
				webcomponent.mainContainer.classList.add("notShowingResults");
				webcomponent.actionButton.classList.remove("fa-times");
				webcomponent.actionButton.classList.add("fa-search");
			}
		})

		this.warningText = this._shadowRoot.querySelector(".warning p");

	}

	async on_search_text_changed(txt)
	{
		txt = txt.trim();
		let err = this._shadowRoot.querySelector("#error")
		let inputBox = this._shadowRoot.querySelector('.searchBox input[type="text"]');
		let lensBox = this._shadowRoot.querySelector(".searchBox .action");
		let resultContainer = this._shadowRoot.querySelector(".resultContainer");

		err.textContent = ''
		err.style.display = "none";
		inputBox.style.borderColor = "#eee";
		lensBox.style.borderColor = "#eee";


		if (txt.length > 0 && txt.length < 3)
		{
			err.style.display = "block";
			resultContainer.style.display = "none";
			inputBox.style.borderColor = "#cc8d7b";
			lensBox.style.borderColor = "#cc8d7b";
			err.textContent = 'Almeno 3 caratteri';

			return
		}
		this.search_text_changed(txt)
	}

	static get observedAttributes()
	{
		return ['items','showResults','lang']
	}

	attributeChangedCallback(name, oldVal, newVal)
	{
		if (name == 'lang'){
			let lang = this.getAttribute('lang');
			let inputBox = this._shadowRoot.querySelector('.searchBox input[type="text"]');
			inputBox.placeholder = strings["search"][lang];
			this.warningText.textContent = window.strings["warning-filters"][lang];

		}
		if (name == 'items')
		{
			let webcomponent = this;

			let lang = this.getAttribute('lang')

			this.resultsContainer.textContent = ''
			let list = JSON.parse(newVal);

			if (list.length == 0){
				let noResultsDiv = document.createElement("div");
				noResultsDiv.className = "no-results-warning";

				let noResultsP = document.createElement("p");
				noResultsP.textContent = strings["no-results"][lang];

				noResultsDiv.append(noResultsP);
				this.resultsContainer.append(noResultsDiv);
			}

			for (let i = 0; i < list.length; i++)
			{
				console.log(i)
				let row = this.searchInstance_template.cloneNode(true)
				this.resultsContainer.appendChild(row)

				//this part added
				let imageFileName = list[i].ODHActivityPoiTypes[0].Id.trim().replace(/[^a-z]/gi,'_');
				console.log(imageFileName);
				row.querySelector('img').src = paths.img_category_icons + "category_icons_" + imageFileName + ".png"

				row.querySelector('p.text').textContent = list[i].Detail[lang].Title
				row.addEventListener('click', (function(item)
				{
					return function()
					{
						webcomponent.mainContainer.classList.remove("showingResults");
						webcomponent.mainContainer.classList.add("notShowingResults");
						webcomponent.onresultclick(item)
					}
				})(list[i]));
			}

			this.resultsContainer.style.display = "block";
			this.mainContainer.classList.remove("notShowingResults");
			this.mainContainer.classList.add("showingResults");
		}
	}

}

customElements.define('search-items', SearchComponent);


/***/ }),

/***/ 576:
/***/ ((module) => {

!function(o,l){var r,a,s="createElement",g="getElementsByTagName",b="length",E="style",d="title",y="undefined",k="setAttribute",w="getAttribute",x=null,A="__svgInject",C="--inject-",S=new RegExp(C+"\\d+","g"),I="LOAD_FAIL",t="SVG_NOT_SUPPORTED",L="SVG_INVALID",v=["src","alt","onload","onerror"],j=l[s]("a"),G=typeof SVGRect!=y,f={useCache:!0,copyAttributes:!0,makeIdsUnique:!0},N={clipPath:["clip-path"],"color-profile":x,cursor:x,filter:x,linearGradient:["fill","stroke"],marker:["marker",
    "marker-end","marker-mid","marker-start"],mask:x,pattern:["fill","stroke"],radialGradient:["fill","stroke"]},u=1,c=2,O=1;function T(e){return(r=r||new XMLSerializer).serializeToString(e)}function P(e,r){var t,n,i,o,a=C+O++,f=/url\("?#([a-zA-Z][\w:.-]*)"?\)/g,u=e.querySelectorAll("[id]"),c=r?[]:x,l={},s=[],d=!1;if(u[b]){for(i=0;i<u[b];i++)(n=u[i].localName)in N&&(l[n]=1);for(n in l)(N[n]||[n]).forEach(function(e){s.indexOf(e)<0&&s.push(e)});s[b]&&s.push(E);var v,p,m,h=e[g]("*"),y=e;for(i=-1;y!=x;
){if(y.localName==E)(m=(p=y.textContent)&&p.replace(f,function(e,r){return c&&(c[r]=1),"url(#"+r+a+")"}))!==p&&(y.textContent=m);else if(y.hasAttributes()){for(o=0;o<s[b];o++)v=s[o],(m=(p=y[w](v))&&p.replace(f,function(e,r){return c&&(c[r]=1),"url(#"+r+a+")"}))!==p&&y[k](v,m);["xlink:href","href"].forEach(function(e){var r=y[w](e);/^\s*#/.test(r)&&(r=r.trim(),y[k](e,r+a),c&&(c[r.substring(1)]=1))})}y=h[++i]}for(i=0;i<u[b];i++)t=u[i],c&&!c[t.id]||(t.id+=a,d=!0)}return d}function V(e,r,t,n){if(r){
  r[k]("data-inject-url",t);var i=e.parentNode;if(i){n.copyAttributes&&function c(e,r){for(var t,n,i,o=e.attributes,a=0;a<o[b];a++)if(n=(t=o[a]).name,-1==v.indexOf(n))if(i=t.value,n==d){var f,u=r.firstElementChild;u&&u.localName.toLowerCase()==d?f=u:(f=l[s+"NS"]("http://www.w3.org/2000/svg",d),r.insertBefore(f,u)),f.textContent=i}else r[k](n,i)}(e,r);var o=n.beforeInject,a=o&&o(e,r)||r;i.replaceChild(a,e),e[A]=u,m(e);var f=n.afterInject;f&&f(e,a)}}else D(e,n)}function p(){for(var e={},r=arguments,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   t=0;t<r[b];t++){var n=r[t];for(var i in n)n.hasOwnProperty(i)&&(e[i]=n[i])}return e}function _(e,r){if(r){var t;try{t=function i(e){return(a=a||new DOMParser).parseFromString(e,"text/xml")}(e)}catch(o){return x}return t[g]("parsererror")[b]?x:t.documentElement}var n=l.createElement("div");return n.innerHTML=e,n.firstElementChild}function m(e){e.removeAttribute("onload")}function n(e){console.error("SVGInject: "+e)}function i(e,r,t){e[A]=c,t.onFail?t.onFail(e,r):n(r)}function D(e,r){m(e),i(e,L,r)
}function F(e,r){m(e),i(e,t,r)}function M(e,r){i(e,I,r)}function q(e){e.onload=x,e.onerror=x}function R(e){n("no img element")}var e=function z(e,r){var t=p(f,r),h={};function n(a,f){f=p(t,f);var e=function(r){var e=function(){var e=f.onAllFinish;e&&e(),r&&r()};if(a&&typeof a[b]!=y){var t=0,n=a[b];if(0==n)e();else for(var i=function(){++t==n&&e()},o=0;o<n;o++)u(a[o],f,i)}else u(a,f,e)};return typeof Promise==y?e():new Promise(e)}function u(u,c,e){if(u){var r=u[A];if(r)Array.isArray(r)?r.push(e
):e();else{if(q(u),!G)return F(u,c),void e();var t=c.beforeLoad,n=t&&t(u)||u[w]("src");if(!n)return""===n&&M(u,c),void e();var i=[];u[A]=i;var l=function(){e(),i.forEach(function(e){e()})},s=function f(e){return j.href=e,j.href}(n),d=c.useCache,v=c.makeIdsUnique,p=function(r){d&&(h[s].forEach(function(e){e(r)}),h[s]=r)};if(d){var o,a=function(e){if(e===I)M(u,c);else if(e===L)D(u,c);else{var r,t=e[0],n=e[1],i=e[2];v&&(t===x?(t=P(r=_(n,!1),!1),e[0]=t,e[2]=t&&T(r)):t&&(n=function o(e){
  return e.replace(S,C+O++)}(i))),r=r||_(n,!1),V(u,r,s,c)}l()};if(typeof(o=h[s])!=y)return void(o.isCallbackQueue?o.push(a):a(o));(o=[]).isCallbackQueue=!0,h[s]=o}!function m(e,r,t){if(e){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4==n.readyState){var e=n.status;200==e?r(n.responseXML,n.responseText.trim()):400<=e?t():0==e&&t()}},n.open("GET",e,!0),n.send()}}(s,function(e,r){var t=e instanceof Document?e.documentElement:_(r,!0),n=c.afterLoad;if(n){var i=n(t,r)||t;if(i){
  var o="string"==typeof i;r=o?i:T(t),t=o?_(i,!0):i}}if(t instanceof SVGElement){var a=x;if(v&&(a=P(t,!1)),d){var f=a&&T(t);p([a,r,f])}V(u,t,s,c)}else D(u,c),p(L);l()},function(){M(u,c),p(I),l()})}}else R()}return G&&function i(e){var r=l[g]("head")[0];if(r){var t=l[s](E);t.type="text/css",t.appendChild(l.createTextNode(e)),r.appendChild(t)}}('img[onload^="'+e+'("]{visibility:hidden;}'),n.setOptions=function(e){t=p(t,e)},n.create=z,n.err=function(e,r){e?e[A]!=c&&(q(e),G?(m(e),M(e,t)):F(e,t),r&&(m(
  e),e.src=r)):R()},o[e]=n}("SVGInject"); true&&"object"==typeof module.exports&&(module.exports=e)}(window,document);


/***/ }),

/***/ 313:
/***/ (() => {

window.strings = {
  "warning-filters": {
    "en": "The search results are limited to the categories that are selected on the map",
    "it": "I risultati della ricerca sono limitati alle categorie che hai scelto sulla mappa",
    "de": "Die Suchergebnisse sind auf die auf der Karte ausgewählten Kategorien beschränkt"
  },
  "no-results": {
    "en": "Your search did not match any activities. Use different words or check that the right categories are selected",
    "it": "Non ci sono risultati corrispondenti a ciò che stai cercando. Usa parole diverse o controlla di aver selezionato le categorie giuste",
    "de": "Ihre Suche stimmte nicht mit Aktivitäten überein. Verwenden Sie andere Wörter oder überprüfen Sie, ob die richtigen Kategorien ausgewählt sind"
  },
  "information":{
    "en": "Information",
    "it": "Informazioni",
    "de": "Informationen"
  },
  "category": {
    "en": "Category",
    "it": "Categoria",
    "de": "Kategorie"
  },
  "suitable-age": {
    "en": "Suitable age",
    "it": "Età adatta",
    "de": "Geeignetes Alter"
  },
  "difference-altitude": {
    "en": "Altitude",
    "it": "Altitudine",
    "de": "Höhe"
  },
  "locality": {
    "en": "Locality",
    "it": "Località",
    "de": "Lokalität"
  },
  "description": {
    "en": "Description",
    "it": "Descrizione",
    "de": "Beschreibung"
  },
  "contacts": {
    "en": "Contacts",
    "it": "Contatti",
    "de": "Kontakte"
  },
  "get-directions": {
    "en": "Get directions",
    "it": "Come arrivare",
    "de": "Anweisungen"
  },
  "search":{
    "en": "Search",
    "it": "Cerca",
    "de": "Suchen"
  },
  "loading":{
    "en":"LOADING",
    "it":"CARICAMENTO",
    "de":"WIRD GELADEN"
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {
__webpack_require__(851);
__webpack_require__(313);
__webpack_require__(576);

__webpack_require__(263);
__webpack_require__(425);
__webpack_require__(130);
__webpack_require__(746);
__webpack_require__(275);

__webpack_require__(168);
__webpack_require__(127);
__webpack_require__(614);
__webpack_require__(309);
__webpack_require__(611);
__webpack_require__(898);



})();

/******/ })()
;