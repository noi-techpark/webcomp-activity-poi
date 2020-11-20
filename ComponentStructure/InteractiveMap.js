const interactiveMap_template = document.createElement('template');

interactiveMap_template.innerHTML = `
    <h1>InteractiveMap</h1>
    <p id="elements"></p>
    <div id="marker">fake marker</div>
`;



class InteractiveMap extends HTMLElement {

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(interactiveMap_template.content.cloneNode(true));
        //this.elementsOnMap = [{"elementID":1,"lat":45,"lon":45}];

        this.$area = this._shadowRoot.querySelector('#elements');

        this.$marker = this._shadowRoot.querySelector('#marker');

    }

    render() {
        this.innerHTML = `<h1>InteractiveMap</h1>`;
    }

    static get observedAttributes() {
        return ['elementsonmap','elementonclick'];
    }

    get elementsonmap(){
        return this.getAttribute('elementsonmap');
    }

    set elementsonmap(value){
        this.setAttribute('elementsonmap', value);
    }

    get elementonclick(){
        return this.getAttribute('elementonclick');
    }

    set elementonclick(value){
        this.setAttribute('elementonclick', value);
        this.$marker.addEventListener('click',value);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    render(){
        this.$area.innerHTML = this.elementsonmap;
    }
}

customElements.define('interactive-map', InteractiveMap);