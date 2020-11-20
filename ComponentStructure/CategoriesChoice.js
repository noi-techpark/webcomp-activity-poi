const categoriesChoice_template = document.createElement('template');

categoriesChoice_template.innerHTML = `
    <h1>CategoriesChoice</h1>
    <p id="categories"></p>
    <p id="active"></p>
    <input type="checkbox" id="checkbox" class="checkbox" name="category">
    <label for="category"> I have a bike</label><br>
`;


class CategoriesChoice extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(categoriesChoice_template.content.cloneNode(true));

        //this.$categoriesInformation = [{"categoryID":1,"category-name":{"EN":"museum","IT":"museo"},"category-icon":"directory","category-color":"#ff8360"}];
        //this.$activeCategories = {1:false};

        this.$area1 = this._shadowRoot.querySelector('#categories');
        this.$area2 = this._shadowRoot.querySelector('#active');

        this.$checkbox = this._shadowRoot.querySelector('#checkbox');
    }


    static get observedAttributes() {
        return ['categoriesinformation','activecategories','onchangeselectedcategories'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    get categoriesinformation(){
        return this.getAttribute('categoriesinformation');
    }

    get activecategories(){
        return this.getAttribute('activecategories');
    }

    get onchangeselectedcategories(){
        return this.getAttribute('onchangeselectedcategories');
    }

    set categoriesinformation(value){
        this.setAttribute('categoriesinformation',value);
    }

    set activecategories(value){
        this.setAttribute('activecategories',value);
    }

    set onchangeselectedcategories(value){
        this.setAttribute('onchangeselectedcategories',value);
        this.$checkbox.addEventListener('change',value);
    }


    render(){
        this.$area1.innerHTML = this.categoriesinformation;
        this.$area2.innerHTML = this.activecategories;
    }
}

customElements.define('categories-choice', CategoriesChoice);