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

    //TODO: @Davide
    // the following error is returned: "Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0: line 116"
    async connectedCallback(){

        // parameters
        let index_match = window.location.search.match(new RegExp("[?&]index=([^&]+)"));
        let lang_match  = window.location.search.match(new RegExp("[?&]lang=([^&]+)"));

        let index = index_match != null ? index_match[1]: 0;
        let lang  = lang_match  != null ? lang_match[1]: 'it';

        let category_template = this._shadowRoot.querySelector('div.dropdownCategory');
        let category_parent = category_template.parentElement
        category_template.remove()

        // read data json

        let response = await fetch('poi-types.json')
        let types = await response.json()

        //Types
        for (let i = 0; i < types.length; i++)
        {
            let type = types[i]
            if (type.Type != 'Type')
                continue;

            // console.log(type.Key)
            // console.log(type.TypeDesc[lang])

            let category = category_template.cloneNode(true)
            category.querySelector('div.subCategory > p').textContent = type.TypeDesc[lang]
            let subCategoryTitle = 'subCategoryTitle' + type.TypeDesc["de"].replace(/ .*/,'');
            console.log(subCategoryTitle)
            category.querySelector('div.subCategory > p').classList.add(subCategoryTitle);
            category.querySelector('img.categoryImage').alt = type.TypeDesc[lang]
            let imageFileName = type.TypeDesc["de"].replace(/\u00e4/g, "ae")
            imageFileName = imageFileName.replace(/\u00f6/g, "oe")
            imageFileName = imageFileName.replace(/\u00fc/g, "ue")
            imageFileName = imageFileName.replace(/\u00c4/g, "Ae")
            imageFileName = imageFileName.replace(/\u00d6/g, "Oe")
            imageFileName = imageFileName.replace(/\u00dc/g, "Ue")
            imageFileName = imageFileName.trim()
            category.querySelector('img.categoryImage').src = "/img/category_icons/" + imageFileName + ".svg"
            category_parent.appendChild(category)

            let sub_category_template = category.querySelector('div.subCategoryItem')
            let sub_category_parent = sub_category_template.parentElement
            sub_category_template.remove()

            for (let j = 0; j < types.length; j++)
            {
                let subtype = types[j]
                if (subtype.Type != 'SubType' || subtype.Parent != type.Key)
                    continue;
                // console.log(subtype)
                let sub_category = sub_category_template.cloneNode(true)
                sub_category.querySelector('label').textContent = subtype.TypeDesc[lang]
                sub_category_parent.appendChild(sub_category)
            }
        }

        let subCat = document.querySelectorAll('div.subCategory');
        for (let j = 0; j < subCat.length/2; j++)
        {
            subCat[j].classList.add('subCategoryLeft');
            console.log(subCat[j].classList)
        }
        for (let j = subCat.length/2; j < subCat.length; j++)
        {
            subCat[j].classList.add('subCategoryRight');
        }

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
        //TODO: add functionality that is triggered when checkbox is selected or not
        //this.$checkbox.addEventListener('change',value);
    }


    render(){
        //TODO: put all the functionalities needed to show categories and select the active categories
        //this.$area1.innerHTML = this.categoriesinformation;
        //this.$area2.innerHTML = this.activecategories;
    }


}

customElements.define('categories-choice', CategoriesChoice);