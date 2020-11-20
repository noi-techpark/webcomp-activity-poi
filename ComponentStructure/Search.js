const search_template = document.createElement('template');

search_template.innerHTML = `
    <h1>Search</h1>
    <button id="search-button">Search button</button>
    <div id="result-item"></div>
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

    set search(value){
        this.setAttribute('search', value);
        this.$searchbutton.addEventListener('click',value);
    }

    get resultonclick(){
        return this.getAttribute('search');
    }

    set resultonclick(value){
        this.setAttribute('resultonclick', value);
        this.$resultitem.addEventListener('click',value);
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