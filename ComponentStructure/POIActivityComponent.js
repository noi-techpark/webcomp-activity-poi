class POIActivityComponent extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$displayedElementsID = [1];
    }

    connectedCallback() {
        this.innerHTML = `<h1>POIActivityComponent</h1>`;
    }
}

customElements.define('POIActivityComponent', POIActivityComponent);