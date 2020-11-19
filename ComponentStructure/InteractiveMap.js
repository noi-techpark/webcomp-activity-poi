class InteractiveMap extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$elementsOnMap = [{"elementID":1,"lat":45,"lon":45}];
    }

    connectedCallback() {
        this.innerHTML = `<h1>InteractiveMap</h1>`;
    }
}

customElements.define('InteractiveMap', InteractiveMap);