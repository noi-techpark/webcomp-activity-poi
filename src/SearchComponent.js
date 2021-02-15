const search_template = document.createElement('template');

search_template.innerHTML = `

    <div class="mainContainer notShowingResults">

    <div class="searchBox">
     <input type="text" placeholder="Search...">
     <!--<i class="fas fa-search action"></i>-->
     <img class="action" src="` + paths.img_fa_icons + `search-solid.svg" onload="SVGInject(this)"></img>
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
    <img class="svg" src="` + paths.img_fa_icons + `exclamation-triangle-solid.svg" onload="SVGInject(this)"></img>
	<p>The search results are limited to the categories that are selected on the map</p>

</div>
</div>
</div>

<style>
@import "` + paths.css + `all.css";
@import "` + paths.css_components + `search.css";
@import "` + paths.css + `theme.css";
@import "` + paths.css + `atoms.css";
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
			this.warningText.textContent = strings["warning-filters"][lang];

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
