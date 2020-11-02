class CategoriesChoice extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$categoriesInformation = [{"categoryID":1,"category-name":{"EN":"museum","IT":"museo"},"category-icon":"directory","category-color":"#FF8360"}];
        this.$activeCategories = {1:false};
    }

    connectedCallback() {
        this.innerHTML = `<h1>CategoriesChoice</h1>`;
    }
}

customElements.define('CategoriesChoice', CategoriesChoice);