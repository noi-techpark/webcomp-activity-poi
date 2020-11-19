class Search extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$elementID = "elementID";
    }


    connectedCallback() {
        this.innerHTML = `<h1>Search</h1>`;
    }
}

customElements.define('Search', Search);