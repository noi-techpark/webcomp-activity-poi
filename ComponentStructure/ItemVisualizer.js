const itemVisualizer_template = document.createElement('template');

itemVisualizer_template.innerHTML = `
   <div class="mainContainer">
    <div class="title">
    <div class="titleDiv" id="Title">
    <p class="titleParagraph">POI or Activity Title</p>
</div>
<div class="titleArrowDiv">
    <i class="fas fa-chevron-up" onclick="expand(this)"></i>
    </div>
    </div>
    <div class="resultContainer">
    <div class="itemInfo" id="itemInformation">
    <div class="infoTitle" id="informationTitle">
    <p class="infoTitleParagraph"><i class="fas fa-info-circle"></i>Informations</p>
</div>
<div class="info" id="information">
    <div class="informationInstance">
    <p class="text"><b>Categoria</b><br>
    <span id="category"></span></p>
</div>
<div class="informationInstance">
    <p class="text"><b>Età adatta</b><br>
<span id="ageFrom"></span>-<span id="ageTo"></span></p>
</div>
<div class="informationInstance">
    <p class="text"><b>Dislivello e altitudine</b><br>
Dislivello totale: <span id="altitudeDifference"></span> m<br>
Punto più basso: <span id="altitudeLowestPoint"></span> m<br>
Punto più alto: <span id="altitudeHighestPoint"></span> m</p>
</div>
<div class="informationInstance">
    <p class="text"><b>Località</b><br>
    <span id="location"></span></p>
</div>
</div>
</div>
<div class="itemInfo" id="itemDescription">
    <div class="infoTitle" id="descriptionTitle">
    <p class="infoTitleParagraph"><i class="fas fa-file-alt"></i>Description</p>
</div>
<div class="info" id="description">
    <p class="text"></p>
    </div>
    </div>
    <div class="itemInfo" id="itemPhotos">
    <div class="infoTitle" id="photosTitle">
    <p class="infoTitleParagraph"><i class="fas fa-image"></i>Photos</p>
</div>
<div class="info" id="photos">
    <img class="image" src="skiarea.jpg" alt="ski area">
    </div>
    </div>

    <div class="itemInfo" id="itemContacts">
    <div class="infoTitle" id="contactsTitle">
    <p class="infoTitleParagraph"><i class="fas fa-id-card"></i>Contacts</p>
</div>
<div class="info" id="contacts">
    <p class="text"><b><span id="companyName"></span></b><br>
<span id="address"></span>, <span id="city"></span>, <span id="country"></span></p>
<p class="text"><i class="fas fa-envelope"></i><span id="email"></span><br>
<i class="fas fa-phone-alt"></i><span id="phoneNumber"></span></p>
</div>
</div>
</div>
</div>

<style>
@import "static/css/components/itemVisualizer.css";
@import "static/css/theme.css";
@import "static/css/atoms.css";
</style> 
`;



class ItemVisualizer extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(itemVisualizer_template.content.cloneNode(true));

    }

    static get observedAttributes() {
        return ['apoiid'];
    }

    
    async attributeChangedCallback(name, oldVal, newVal) {
       if (name === 'apoiid')
       {
      	 // alert(newVal)
      	 console.log(newVal)
      	
				// parameters
				// let index_match = window.location.search.match(new RegExp("[?&]index=([^&]+)"));
				// let lang_match  = window.location.search.match(new RegExp("[?&]lang=([^&]+)"));
	
				// let index = index_match != null ? index_match[1]: 0;
				let lang  = 'it'; // lang_match  != null ? lang_match[1]: 'it';
	
				// read data json
				
				let response = await fetch('https://tourism.opendatahub.bz.it/api/ODHActivityPoi/' + newVal)
				let json = await response.json()
				let item = json
				
				// copy values from json to html
				
				var root_element = this._shadowRoot
				
			
				root_element.querySelector('div#Title > p').innerHTML = item.Detail[lang].Title;
				root_element.querySelector('div#description > p').innerHTML = item.Detail[lang].BaseText;
				root_element.querySelector('span#category').innerHTML = item.PoiType;
				root_element.querySelector('span#ageFrom').innerHTML = item.AgeFrom;
				root_element.querySelector('span#ageTo').innerHTML = item.AgeTo;
				root_element.querySelector('span#altitudeDifference').innerHTML = item.AltitudeDifference; //oppure AltitudeSumUp?
				root_element.querySelector('span#altitudeLowestPoint').innerHTML = item.AltitudeLowestPoint;
				root_element.querySelector('span#altitudeHighestPoint').innerHTML = item.AltitudeHighestPoint;
				root_element.querySelector('span#location').innerHTML = item.LocationInfo.TvInfo.Name[lang];
				//image gallery -> item.ImageGallery --- How to add a Gallery
				root_element.querySelector('span#companyName').innerHTML = item.ContactInfos[lang].CompanyName;
				root_element.querySelector('span#address').innerHTML = item.ContactInfos[lang].Address;
				root_element.querySelector('span#city').innerHTML = item.ContactInfos[lang].City;
				root_element.querySelector('span#country').innerHTML = item.ContactInfos[lang].CountryName;
				root_element.querySelector('span#email').innerHTML = item.ContactInfos[lang].Email;
				root_element.querySelector('span#phoneNumber').innerHTML = item.ContactInfos[lang].Phonenumber;
				// ...
				
				//update colour of icons and title
				root_element.querySelector('div.mainContainer').classList.add(item.Type.replace(/ .*/,''));
			
       }
    }
    

}

customElements.define('item-visualizer', ItemVisualizer);