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

        //this.$elementID = "elementID";

        this.$area = this._shadowRoot.querySelector('#elementID');
    }

    async connectedCallback(){
        // parameters
        let index_match = window.location.search.match(new RegExp("[?&]index=([^&]+)"));
        let lang_match  = window.location.search.match(new RegExp("[?&]lang=([^&]+)"));

        let index = index_match != null ? index_match[1]: 0;
        let lang  = lang_match  != null ? lang_match[1]: 'it';

        // read data json

        let response = await fetch('map.json')
        let json = await response.json()

        let item;

        for(var i = 0; i < json.Items.length; i++){

            if(json.Items[i].Id == this.elementid){
                item = json.Items[i];
            }
        }



        this._shadowRoot.querySelector('div#Title > p').innerHTML = item.Detail[lang].Title;
        this._shadowRoot.querySelector('div#description > p').innerHTML = item.Detail[lang].BaseText;
        this._shadowRoot.querySelector('span#category').innerHTML = item.PoiType;
        this._shadowRoot.querySelector('span#ageFrom').innerHTML = item.AgeFrom;
        this._shadowRoot.querySelector('span#ageTo').innerHTML = item.AgeTo;
        this._shadowRoot.querySelector('span#altitudeDifference').innerHTML = item.AltitudeDifference; //oppure AltitudeSumUp?
        this._shadowRoot.querySelector('span#altitudeLowestPoint').innerHTML = item.AltitudeLowestPoint;
        this._shadowRoot.querySelector('span#altitudeHighestPoint').innerHTML = item.AltitudeHighestPoint;
        this._shadowRoot.querySelector('span#location').innerHTML = item.LocationInfo.TvInfo.Name[lang];
        //image gallery -> item.ImageGallery --- How to add a Gallery
        this._shadowRoot.querySelector('span#companyName').innerHTML = item.ContactInfos[lang].CompanyName;
        this._shadowRoot.querySelector('span#address').innerHTML = item.ContactInfos[lang].Address;
        this._shadowRoot.querySelector('span#city').innerHTML = item.ContactInfos[lang].City;
        this._shadowRoot.querySelector('span#country').innerHTML = item.ContactInfos[lang].CountryName;
        this._shadowRoot.querySelector('span#email').innerHTML = item.ContactInfos[lang].Email;
        this._shadowRoot.querySelector('span#phoneNumber').innerHTML = item.ContactInfos[lang].Phonenumber;
        // ...

        //update colour of icons and title
        this._shadowRoot.querySelector('div.mainContainer').classList.add(item.Type.replace(/ .*/,''));
    }

    static get observedAttributes() {
        return ['elementid'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    get elementid() {
        return this.getAttribute('elementid');
    }

    //TODO: data api function here
    set elementid(value) {
        this.setAttribute('elementid', value);
        //writeElementInformation(value) -> it gets the data and displays it
        //this.render();

        console.log(value);
    }

    async render(){
        //this.$area.innerHTML = this.elementid;

        // parameters
        let index_match = window.location.search.match(new RegExp("[?&]index=([^&]+)"));
        let lang_match  = window.location.search.match(new RegExp("[?&]lang=([^&]+)"));

        let index = index_match != null ? index_match[1]: 0;
        let lang  = lang_match  != null ? lang_match[1]: 'it';

        // read data json

        let response = await fetch('map.json')
        let json = await response.json()

        let item;

        for(var i = 0; i < json.Items.length; i++){

            if(json.Items[i].Id == this.elementid){
                item = json.Items[i];
            }
        }



        this._shadowRoot.querySelector('div#Title > p').innerHTML = item.Detail[lang].Title;
        this._shadowRoot.querySelector('div#description > p').innerHTML = item.Detail[lang].BaseText;
        this._shadowRoot.querySelector('span#category').innerHTML = item.PoiType;
        this._shadowRoot.querySelector('span#ageFrom').innerHTML = item.AgeFrom;
        this._shadowRoot.querySelector('span#ageTo').innerHTML = item.AgeTo;
        this._shadowRoot.querySelector('span#altitudeDifference').innerHTML = item.AltitudeDifference; //oppure AltitudeSumUp?
        this._shadowRoot.querySelector('span#altitudeLowestPoint').innerHTML = item.AltitudeLowestPoint;
        this._shadowRoot.querySelector('span#altitudeHighestPoint').innerHTML = item.AltitudeHighestPoint;
        this._shadowRoot.querySelector('span#location').innerHTML = item.LocationInfo.TvInfo.Name[lang];
        //image gallery -> item.ImageGallery --- How to add a Gallery
        this._shadowRoot.querySelector('span#companyName').innerHTML = item.ContactInfos[lang].CompanyName;
        this._shadowRoot.querySelector('span#address').innerHTML = item.ContactInfos[lang].Address;
        this._shadowRoot.querySelector('span#city').innerHTML = item.ContactInfos[lang].City;
        this._shadowRoot.querySelector('span#country').innerHTML = item.ContactInfos[lang].CountryName;
        this._shadowRoot.querySelector('span#email').innerHTML = item.ContactInfos[lang].Email;
        this._shadowRoot.querySelector('span#phoneNumber').innerHTML = item.ContactInfos[lang].Phonenumber;
        // ...

        //update colour of icons and title
        this._shadowRoot.querySelector('div.mainContainer').classList.add(item.Type.replace(/ .*/,''));
    }
}

customElements.define('item-visualizer', ItemVisualizer);