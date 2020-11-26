const itemVisualizer_template = document.createElement('template');

//TODO:copy html
itemVisualizer_template.innerHTML = `
    <h1>ItemVisualizer</h1>
    <p id="elementID"></p>
`;


class ItemVisualizer extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(itemVisualizer_template.content.cloneNode(true));

        //this.$elementID = "elementID";

        this.$area = this._shadowRoot.querySelector('#elementID');
    }

    static get observedAttributes() {
        return ['elementid'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    get elementid() {
        return this.getAttribute('elementid');
    }

    //TODO: data api function here
    set elementid(value) {
        this.setAttribute('elementid', value);
        //writeElementInformation(value) -> it gets the data and displays it
    }

    render(){
        this.$area.innerHTML = this.elementid;
    }
}

customElements.define('item-visualizer', ItemVisualizer);