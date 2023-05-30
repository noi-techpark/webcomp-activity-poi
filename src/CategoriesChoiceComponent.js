// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const categoriesChoice_template = document.createElement('template');
import categoriesStyle from './static/scss/components/categories.scss';
import themeStyle from './static/scss/theme.scss';
import atomsStyle from './static/scss/atoms.scss'


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
	  	${categoriesStyle}
		${themeStyle}
		${atomsStyle}
      </style>
`;




class CategoriesChoiceComponent extends HTMLElement {



	constructor() {
		super();

		this.attachShadow({ mode: 'open' });

		//		this._shadowRoot = this.attachShadow(
		//		{
		//			mode: 'open'
		//		});
		//		this._shadowRoot.appendChild(categoriesChoice_template.content.cloneNode(true));
		//
		//		//this.$categoriesInformation = [{"categoryID":1,"category-name":{"EN":"museum","IT":"museo"},"category-icon":"directory","category-color":"#ff8360"}];
		//		//this.$activeCategories = {1:false};
		//
		//		this.$area1 = this._shadowRoot.querySelector('#categories');
		//		this.$area2 = this._shadowRoot.querySelector('#active');
		//
		//		this.$checkbox = this._shadowRoot.querySelector('#checkbox');
		//
		//
		//		this.$category_template = this._shadowRoot.querySelector('div.dropdownCategory');
		//		this.$category_parent = this.$category_template.parentElement
		//
		//		this.$sub_category_template = this.$category_template.querySelector('div.subCategoryItem')
		//		this.$sub_category_parent = this.$sub_category_template.parentElement
		//
		//		this.odhtagfilter = ',';

		this.odhtagfilter = ',';
	}

	setup_categories(types, category_template, category_parent, lang, category_has_subcat_selected) {
		for (let i = 0; i < types.length; i++) {
			let type = types[i]
			if (type.Type != 'Type')
				continue;

			// console.log(type.Id)

			category_has_subcat_selected.push(0)

			let category = category_template.cloneNode(true)
			category.querySelector('div.subCategory > p').textContent = type.TypeDesc[lang] // + ' #' + type.Id
			let subCategoryTitle = 'subCategoryTitle' + type.TypeDesc[lang].replace(/ .*/, '');
			// console.log(subCategoryTitle)
			category.querySelector('div.subCategory > p').classList.add(subCategoryTitle);
			category.querySelector('img.categoryImage').alt = type.TypeDesc[lang]

			let imageFileName = type.Key.trim().replace(/[^a-z]/gi, '_')
			console.log(type);

			category.querySelector('img.categoryImage').src = paths.img_category_icons + "category_icons_" + imageFileName + ".png"

			let sub_category_template = category.querySelector('div.subCategoryItem')
			let sub_category_parent = sub_category_template.parentElement
			sub_category_template.remove()

			let sub_number = this.setup_subcategories(types, type, sub_category_template, sub_category_parent, lang, category, category_has_subcat_selected, category_has_subcat_selected.length - 1)

			// if there aren't subcategories - because filtered - then don't add category
			if (sub_number !== 0)
				category_parent.appendChild(category)
		}
	}

	setup_subcategories(types, type, sub_category_template, sub_category_parent, lang, category, category_has_subcat_selected, cat_index) {
		let sub_number = 0;

		let category_filter = this.getAttribute('category-filter')

		// console.log(category_filter)

		for (let j = 0; j < types.length; j++) {
			let subtype = types[j]
			if (subtype.Type != 'SubType' || subtype.Parent != type.Key)
				continue;

			let skip = false
			if (category_filter !== null)
				if ((',' + category_filter + ',').indexOf(',' + type.Id + '/' + subtype.Id + ',') < 0 && (',' + category_filter + ',').indexOf(',' + type.Id /* + '/*' */ + ',') < 0)
					skip = true;

			if (skip)
				continue;

			// console.log(type.Id + '/' + subtype.Id + '|')
			sub_number++;

			let sub_category = sub_category_template.cloneNode(true)

			sub_category.querySelector('label').textContent = subtype.TypeDesc[lang] // + ' #' + subtype.Id
			sub_category_parent.appendChild(sub_category)
			this.setup_subcategory_click(sub_category, category, category_has_subcat_selected, cat_index, subtype)
		}

		return sub_number
	}

	setup_subcategory_click(sub_category, category, category_has_subcat_selected, cat_index, subtype) {
		let thiswebcomponent = this

		sub_category.querySelector('input').addEventListener('click', function () {
			console.log(this)
			if (this.checked) {
				if (category_has_subcat_selected[cat_index] == 0)
					category.classList.add('selected')
				category_has_subcat_selected[cat_index]++
				thiswebcomponent.odhtagfilter += subtype.Id + ','
			}
			else {
				category_has_subcat_selected[cat_index]--
				if (category_has_subcat_selected[cat_index] == 0)
					category.classList.remove('selected')
				thiswebcomponent.odhtagfilter = thiswebcomponent.odhtagfilter.replace(',' + subtype.Id + ',', ',')
			}
			// document.title = (thiswebcomponent.odhtagfilter.slice(1, -1))
			thiswebcomponent.oncategorychange(thiswebcomponent.odhtagfilter.slice(1, -1))
		});
	}

	async connectedCallback() {

		let content = categoriesChoice_template.content.cloneNode(true)

		let category_template = content.querySelector('div.dropdownCategory');
		let category_parent = category_template.parentElement
		category_template.remove()

		this.shadowRoot.appendChild(content)

		let lang = this.getAttribute('lang')

		let response = await fetch(/* paths.data + 'poi-types.json' */ 'https://tourism.opendatahub.bz.it/v1/ODHActivityPoiTypes?origin=webcomp-activity-poi')
		let types = await response.json()

		let category_has_subcat_selected = []

		this.setup_categories(types, category_template, category_parent, lang, category_has_subcat_selected)


		//		// alert(2)
		//
		//		let lang = 'it' // this.getAttribute('lang');
		//
		//		// alert(lang)
		//
		//		let category_template = this._shadowRoot.querySelector('div.dropdownCategory');
		//		let category_parent = category_template.parentElement
		//		category_template.remove()
		//
		//		//let types = this.categoriesinformation;
		//
		//		let response = await fetch(paths.data + 'poi-types.json')
		//		let types = await response.json()
		//
		//		let thiswebcomponent = this
		//
		//		let category_has_subcat_selected = []
		//
		//		let cat_sub_filter = '' // ',kultur sehenswürdigkeiten,museen,'
		//
		//		if (types != null)
		//		{
		//			//Types
		//			for (let i = 0; i < types.length; i++)
		//			{
		//				let type = types[i]
		//				if (type.Type != 'Type')
		//					continue;
		//
		//				// exclude categories not in filter
		//				if (cat_sub_filter != '' && cat_sub_filter.indexOf(',' + type.Id + ',') < 0)
		//					continue;
		//
		//
		//				category_has_subcat_selected.push(0)
		//
		//				console.log(type.Id)
		//				// console.log(type.TypeDesc[lang])
		//
		//				let category = category_template.cloneNode(true)
		//				category.querySelector('div.subCategory > p').textContent = type.TypeDesc[lang] // + ' #' + type.Id
		//				let subCategoryTitle = 'subCategoryTitle' + type.TypeDesc["de"].replace(/ .*/, '');
		//				console.log(subCategoryTitle)
		//				category.querySelector('div.subCategory > p').classList.add(subCategoryTitle);
		//				category.querySelector('img.categoryImage').alt = type.TypeDesc[lang]
		//				let imageFileName = type.TypeDesc["de"].replace(/\u00e4/g, "ae")
		//				imageFileName = imageFileName.replace(/\u00f6/g, "oe")
		//				imageFileName = imageFileName.replace(/\u00fc/g, "ue")
		//				imageFileName = imageFileName.replace(/\u00c4/g, "Ae")
		//				imageFileName = imageFileName.replace(/\u00d6/g, "Oe")
		//				imageFileName = imageFileName.replace(/\u00dc/g, "Ue")
		//				imageFileName = imageFileName.trim()
		//				category.querySelector('img.categoryImage').src = paths.img_category_icons + imageFileName + ".png"
		//				category_parent.appendChild(category)
		//
		//				let sub_category_template = category.querySelector('div.subCategoryItem')
		//				let sub_category_parent = sub_category_template.parentElement
		//				sub_category_template.remove()
		//
		//				for (let j = 0; j < types.length; j++)
		//				{
		//					let subtype = types[j]
		//					if (subtype.Type != 'SubType' || subtype.Parent != type.Key)
		//						continue;
		//
		//					// exclude categories not in filter
		//					if (cat_sub_filter != '' && cat_sub_filter.indexOf(',' + subtype.Id + ',') < 0)
		//						continue;
		//
		//					console.log('   ' + subtype.Id)
		//					let sub_category = sub_category_template.cloneNode(true)
		//					sub_category.querySelector('label').textContent = subtype.TypeDesc[lang] // + ' #' + subtype.Id
		//					sub_category.querySelector('input').addEventListener('click',
		//						(function(type_Bitmask, Subtype_Bitmask, inputElement, subtype_Id, category_has_subcat_selected_idx, category)
		//						{
		//							return function()
		//							{
		//								if (inputElement.checked)
		//								{
		//									thiswebcomponent.odhtagfilter += subtype_Id + ','
		//									category_has_subcat_selected[category_has_subcat_selected_idx]++
		//									category.classList.add('selected')
		//								}
		//								else
		//								{
		//									thiswebcomponent.odhtagfilter = thiswebcomponent.odhtagfilter.replace(',' + subtype_Id + ',', ',')
		//									category_has_subcat_selected[category_has_subcat_selected_idx]--
		//									if (category_has_subcat_selected[category_has_subcat_selected_idx] == 0)
		//										category.classList.remove('selected')
		//								}
		//
		//								document.title = (thiswebcomponent.odhtagfilter.slice(1, -1))
		//								// alert(thiswebcomponent.odhtagfilter)
		//								thiswebcomponent.oncategorychange(thiswebcomponent.odhtagfilter.slice(1, -1))
		//							};
		//						})(type.Bitmask, subtype.Bitmask, sub_category.querySelector('input'), subtype.Id, category_has_subcat_selected.length - 1, category))
		//					sub_category_parent.appendChild(sub_category)
		//				}
		//			}
		//
		//			let subCat = document.querySelectorAll('div.subCategory');
		//			for (let j = 0; j < subCat.length / 2; j++)
		//			{
		//				subCat[j].classList.add('subCategoryLeft');
		//				console.log(subCat[j].classList)
		//			}
		//			for (let j = subCat.length / 2; j < subCat.length; j++)
		//			{
		//				subCat[j].classList.add('subCategoryRight');
		//			}
		//		}


	}

	//TODO: categories are appended
	async attributeChangedCallback(name, oldVal, newVal) {
		console.log(name);

		//		if (name == 'language')
		//		{
		//
		//
		//			alert(1)
		//			console.log(newVal);
		//			let lang = newVal;
		//
		//			let category_template = this._shadowRoot.querySelector('div.dropdownCategory');
		//			let category_parent = category_template.parentElement
		//			category_template.remove()
		//
		//			//let types = this.categoriesinformation;
		//
		//			let response = await fetch('poi-types.json')
		//			let types = await response.json()
		//
		//			let thiswebcomponent = this
		//
		//			if (types != null)
		//			{
		//				//Types
		//				for (let i = 0; i < types.length; i++)
		//				{
		//					let type = types[i]
		//					if (type.Type != 'Type')
		//						continue;
		//
		//					console.log(type.Key)
		//					console.log(type.TypeDesc[lang])
		//
		//					let category = category_template.cloneNode(true)
		//					category.querySelector('div.subCategory > p').textContent = type.TypeDesc[lang]
		//					let subCategoryTitle = 'subCategoryTitle' + type.TypeDesc["de"].replace(/ .*/, '');
		//					console.log(subCategoryTitle)
		//					category.querySelector('div.subCategory > p').classList.add(subCategoryTitle);
		//					category.querySelector('img.categoryImage').alt = type.TypeDesc[lang]
		//					let imageFileName = type.TypeDesc["de"].replace(/\u00e4/g, "ae")
		//					imageFileName = imageFileName.replace(/\u00f6/g, "oe")
		//					imageFileName = imageFileName.replace(/\u00fc/g, "ue")
		//					imageFileName = imageFileName.replace(/\u00c4/g, "Ae")
		//					imageFileName = imageFileName.replace(/\u00d6/g, "Oe")
		//					imageFileName = imageFileName.replace(/\u00dc/g, "Ue")
		//					imageFileName = imageFileName.trim()
		//					category.querySelector('img.categoryImage').src = paths.img_category_icons + imageFileName + ".png"
		//					category_parent.appendChild(category)
		//
		//					let sub_category_template = category.querySelector('div.subCategoryItem')
		//					let sub_category_parent = sub_category_template.parentElement
		//					sub_category_template.remove()
		//
		//					for (let j = 0; j < types.length; j++)
		//					{
		//						let subtype = types[j]
		//						if (subtype.Type != 'SubType' || subtype.Parent != type.Key)
		//							continue;
		//						// console.log(subtype)
		//						let sub_category = sub_category_template.cloneNode(true)
		//						sub_category.querySelector('label').textContent = subtype.TypeDesc[lang]
		//						sub_category.querySelector('input').addEventListener('click',
		//							(function(type_Bitmask, Subtype_Bitmask, inputElement)
		//							{
		//								return function()
		//								{
		//									thiswebcomponent.oncategorychange(type_Bitmask, Subtype_Bitmask, inputElement.checked)
		//								};
		//							})(type.Bitmask, subtype.Bitmask, sub_category.querySelector('input')))
		//						sub_category_parent.appendChild(sub_category)
		//					}
		//				}
		//
		//				let subCat = document.querySelectorAll('div.subCategory');
		//				for (let j = 0; j < subCat.length / 2; j++)
		//				{
		//					subCat[j].classList.add('subCategoryLeft');
		//					console.log(subCat[j].classList)
		//				}
		//				for (let j = subCat.length / 2; j < subCat.length; j++)
		//				{
		//					subCat[j].classList.add('subCategoryRight');
		//				}
		//			}
		//		}
	}


}

customElements.define('categories-choice', CategoriesChoiceComponent);
