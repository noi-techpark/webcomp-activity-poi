const search_template = document.createElement('template');

search_template.innerHTML = `
    <div class="mainContainer">
    <div class="title">
    <div class="titleDiv">
    <p class="titleParagraph">Search title (Museums)</p>
</div>
<div class="titleArrowDiv">
    <i class="fas fa-chevron-up" onclick="expand(this)"></i>
    </div>
    </div>
    <div class="resultContainer">
    <div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
<div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
<div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
<div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
<div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
<div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
<div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
<div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
<div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
<div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
<div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
<div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
<div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
<div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
<div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
</div>
</div>

<style>
@import "static/css/components/search.css";
@import "static/css/theme.css";
@import "static/css/atoms.css";
</style>
`;




class Search extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(search_template.content.cloneNode(true));

        //this.$elementID = "elementID";

        this.$searchbutton = this._shadowRoot.querySelector("#search-button");
        this.$resultitem = this._shadowRoot.querySelector("#result-item");
    }


    static get observedAttributes() {
        return ['search','resultonclick','resultsitems'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    get search(){
        return this.getAttribute('search');
    }

    //TODO: add function
    set search(value){
        this.setAttribute('search', value);
        //this.$searchbutton.addEventListener('click',value);
    }

    get resultonclick(){
        return this.getAttribute('search');
    }

    //TODO: add function
    set resultonclick(value){
        this.setAttribute('resultonclick', value);
        //this.$resultitem.addEventListener('click',value);
    }

    get resultsitems(){
        return this.getAttribute('resultsitems');
    }

    set resultsitems(value){
        this.setAttribute('resultsitems', value);

        //display results
    }

    render(){

    }


}

customElements.define('search-items', Search);