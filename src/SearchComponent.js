import themeStyle from './static/scss/theme.scss';
import componentStyle from './static/scss/components/search.scss'
import atomsStyle from './static/scss/atoms.scss'

const search_template = document.createElement('template');

search_template.innerHTML = `

        <div class="mainContainer notShowingResults">

    <div class="searchBox">
     <input type="text">
     <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="action svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
    </div>

    <div class="title">
     <div class="titleDiv">
      <p class="titleParagraph">Search title</p>
  </div>
  <div class="titleArrowDiv">
     </div>
    </div>

    <div class="resultContainer">
     <div class="searchInstance">
      <!--Image added-->
         <img>

      <div class="searchInstanceParagraph">
      <p class="text"><b>Museum name</b><br />Museum category</p>
   </div>
  </div>
 </div>

 <div id="error">
     <p></p>
  </div>

 <!--Added warning-->
    <div class="warning">
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" class="svg svg-inline--fa fa-exclamation-triangle fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>
 <p>The search results are limited to the categories that are selected on the map</p>

</div>
</div>
</div>

<style>
	${themeStyle}
	${atomsStyle}
	${componentStyle}
</style>
`;




class SearchComponent extends HTMLElement
{
	constructor()
	{
		super();

		let webcomponent = this;

		this._shadowRoot = this.attachShadow(
		{
			mode: 'open'
		});
		this._shadowRoot.appendChild(search_template.content.cloneNode(true));

		//this.$elementID = "elementID";

		this.$searchbutton = this._shadowRoot.querySelector("#search-button");

		//container of everything
		this.mainContainer = this._shadowRoot.querySelector(".mainContainer");

		//container of result items
		this.resultsContainer = this._shadowRoot.querySelector(".resultContainer");
		this.resultsContainer.style.display = "none";

		//result items
		this.searchInstance_template = this._shadowRoot.querySelector(".searchInstance");
		this.resultsContainer.removeChild(this.searchInstance_template)

		let input = this._shadowRoot.querySelector("input");
		input.addEventListener("keyup", function(event)
		{
			if (event.code === 'Enter')
			{
				webcomponent.on_search_text_changed(input.value)
			}
		});

		this.actionButton = this._shadowRoot.querySelector(".action");
		this.actionButton.addEventListener("click", function()
		{
			if (webcomponent.actionButton.classList.contains("fa-search"))
			{
				// webcomponent.doSearch(input.value)
				webcomponent.on_search_text_changed(input.value)
			}
			else if (webcomponent.actionButton.classList.contains("fa-times"))
			{
				webcomponent.mainContainer.classList.remove("showingResults");
				webcomponent.mainContainer.classList.add("notShowingResults");
				webcomponent.actionButton.classList.remove("fa-times");
				webcomponent.actionButton.classList.add("fa-search");
			}
		})

		this.warningText = this._shadowRoot.querySelector(".warning p");

	}

	async on_search_text_changed(txt)
	{
		txt = txt.trim();
		let err = this._shadowRoot.querySelector("#error")
		let inputBox = this._shadowRoot.querySelector('.searchBox input[type="text"]');
		let lensBox = this._shadowRoot.querySelector(".searchBox .action");
		let resultContainer = this._shadowRoot.querySelector(".resultContainer");

		err.textContent = ''
		err.style.display = "none";
		inputBox.style.borderColor = "#eee";
		lensBox.style.borderColor = "#eee";


		if (txt.length > 0 && txt.length < 3)
		{
			err.style.display = "block";
			resultContainer.style.display = "none";
			inputBox.style.borderColor = "#cc8d7b";
			lensBox.style.borderColor = "#cc8d7b";
			err.textContent = 'Almeno 3 caratteri';

			return
		}
		this.search_text_changed(txt)
	}

	static get observedAttributes()
	{
		return ['items','showResults','lang']
	}

	attributeChangedCallback(name, oldVal, newVal)
	{
		if (name == 'lang'){
			let lang = this.getAttribute('lang');
			let inputBox = this._shadowRoot.querySelector('.searchBox input[type="text"]');
			inputBox.placeholder = strings["search"][lang];
			this.warningText.textContent = window.strings["warning-filters"][lang];

		}
		if (name == 'items')
		{
			let webcomponent = this;

			let lang = this.getAttribute('lang')

			this.resultsContainer.textContent = ''
			let list = JSON.parse(newVal);

			if (list.length == 0){
				let noResultsDiv = document.createElement("div");
				noResultsDiv.className = "no-results-warning";

				let noResultsP = document.createElement("p");
				noResultsP.textContent = strings["no-results"][lang];

				noResultsDiv.append(noResultsP);
				this.resultsContainer.append(noResultsDiv);
			}

			for (let i = 0; i < list.length; i++)
			{
				console.log(i)
				let row = this.searchInstance_template.cloneNode(true)
				this.resultsContainer.appendChild(row)

				//this part added
				let imageFileName = list[i].ODHActivityPoiTypes[0].Id.trim().replace(/[^a-z]/gi,'_');
				console.log(imageFileName);
				row.querySelector('img').src = paths.img_category_icons + "category_icons_" + imageFileName + ".png"

				row.querySelector('p.text').textContent = list[i].Detail[lang].Title
				row.addEventListener('click', (function(item)
				{
					return function()
					{
						webcomponent.mainContainer.classList.remove("showingResults");
						webcomponent.mainContainer.classList.add("notShowingResults");
						webcomponent.onresultclick(item)
					}
				})(list[i]));
			}

			this.resultsContainer.style.display = "block";
			this.mainContainer.classList.remove("notShowingResults");
			this.mainContainer.classList.add("showingResults");
		}
	}

}

customElements.define('search-items', SearchComponent);
