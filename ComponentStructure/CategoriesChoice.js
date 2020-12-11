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
      
      <style>
      @import "static/css/components/categories.css";
      @import "static/css/theme.css";
      @import "static/css/atoms.css";
        </style>
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


        this.$category_template = this._shadowRoot.querySelector('div.dropdownCategory');
        this.$category_parent = this.$category_template.parentElement

        this.$sub_category_template = this.$category_template.querySelector('div.subCategoryItem')
        this.$sub_category_parent = this.$sub_category_template.parentElement

    }

    async connectedCallback(){

        let lang = 'it';

        let category_template = this._shadowRoot.querySelector('div.dropdownCategory');
        let category_parent = category_template.parentElement
        category_template.remove()

        //let types = this.categoriesinformation;

        let response = await fetch('poi-types.json')
        let types = await response.json()
        
        let thiswebcomponent = this

        if(types != null){
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
                category.querySelector('img.categoryImage').src = "./img/category_icons/" + imageFileName + ".svg"
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
                    sub_category.querySelector('input').addEventListener('click', 
                    (function(type_Bitmask, Subtype_Bitmask, inputElement) {
                  	  return function()
                  	  {
                  		  thiswebcomponent.oncategorychange(type_Bitmask, Subtype_Bitmask, inputElement.checked)
                  	  };
                    })(type.Bitmask, subtype.Bitmask, sub_category.querySelector('input')))
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


    }

    attributeChangedCallback(name, oldVal, newVal) {

    }


}

customElements.define('categories-choice', CategoriesChoice);