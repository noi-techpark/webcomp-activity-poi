const search_template = document.createElement('template');

search_template.innerHTML = `
    <div class="mainContainer notShowingResults">
    
    <div class="searchBox">
     <input type="text" placeholder="Search...">
     <i class="fas fa-search action"></i>
    </div>
    
    <div class="title">
    <div class="titleDiv">
    <p class="titleParagraph">Search title</p>
</div>
<div class="titleArrowDiv">
    <i class="fas fa-chevron-up" onclick="expand(this)"></i>
    </div>
    </div>
    <div class="resultContainer">
    <div class="searchInstance">
    <div class="searchInstanceParagraph">
    <p class="text"><b>Museum name</b><br />Museum category</p>
</div>
</div>
</div>
</div>
</div>
</div>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
@import "static/css/components/search.css";
@import "static/css/theme.css";
@import "static/css/atoms.css";
</style>
`;




class Search extends HTMLElement {
    constructor() {
        super();
        
        let webcomponent = this;

        this._shadowRoot = this.attachShadow({ mode: 'open' });
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
        input.addEventListener("keyup", function(event) {
            if (event.code === 'Enter') {
            	webcomponent.doSearch(input.value)
            }
        });

        this.actionButton = this._shadowRoot.querySelector(".action");
        this.actionButton.addEventListener("click",function(){
        	if (webcomponent.actionButton.classList.contains("fa-search")){
				webcomponent.doSearch(input.value)
			} else if(webcomponent.actionButton.classList.contains("fa-times")){
				webcomponent.mainContainer.classList.remove("showingResults");
				webcomponent.mainContainer.classList.add("notShowingResults");
				webcomponent.actionButton.classList.remove("fa-times");
				webcomponent.actionButton.classList.add("fa-search");
			}
		})
        
    }
    
    async doSearch(searchtxt)
    {
   	   let webcomponent = this;
   	 
   	   while (this.resultsContainer.lastElementChild)
   	   	this.resultsContainer.removeChild(this.resultsContainer.lastElementChild);

		this.mainContainer.classList.remove("notShowingResults");
   	   this.mainContainer.classList.add("showingResults");
   	   this.actionButton.classList.remove("fa-search");
		this.actionButton.classList.add("fa-times");
				
   	   this.resultsContainer.style.display = "block";

   	   let params = new URLSearchParams()
   	   params.append('pagenumber','1')
   	   params.append('pagesize','100')
   	   params.append('searchfilter',searchtxt)
   	   
   	   // alert(params.toString())
   	   
   	 	let response = await fetch('https://tourism.opendatahub.bz.it/api/ODHActivityPoi?' + params.toString())
		   let json = await response.json()

		   let list = json.Items;
   	 	// console.log(list)
   	 	for (let i = 0; i < list.length; i++)
   	 	{
   	 		let row = this.searchInstance_template.cloneNode(true)
   	 		this.resultsContainer.appendChild(row)
   	 		row.querySelector('p.text').textContent = list[i].Shortname
   	 		row.addEventListener('click', (function(apoiid) {
   	 			return function()
   	 			{
   	 				webcomponent.onresultclick(apoiid)
   	 			}
   	 		})(list[i].Id));
   	 	}
    }

    static get observedAttributes() {
        // return ['search','resultonclick','resultsitems','language'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

}

customElements.define('search-items', Search);