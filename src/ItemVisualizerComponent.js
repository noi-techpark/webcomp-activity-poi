// SPDX-FileCopyrightText: 2021 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import themeStyle from './static/scss/theme.scss';
import componentStyle from './static/scss/components/itemVisualizer.scss'
import atomsStyle from './static/scss/atoms.scss'
import allStyle from './static/scss/all.scss'

const itemVisualizer_template = document.createElement('template');

itemVisualizer_template.innerHTML = `
	<div class="mainContainer">
    <p id="closebutton">
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
    </p>

    <!--Title of the POI/Activity-->
      <div class="title">
        <div class="titleDiv" id="Title">
          <p class="titleParagraph">POI or Activity Title</p>
      </div>

      <div class="titleArrowDiv">
          <!--<i class="fas fa-chevron-up" onclick="expand(this)"></i>-->
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-up" class="svg-inline--fa fa-chevron-up fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path></svg>
        </div>
      </div>

      <!--General info such as category, age, altitude, place and "get directions" button--->
      <div class="resultContainer">
      <div class="itemInfo" id="itemInformation">
          <div class="infoTitle" id="informationTitle">
            <!--<i class="fas fa-info-circle"></i>-->
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>
            <p class="infoTitleParagraph">Informations</p>
        </div>

        <div class="info" id="information">
            <div class="informationInstance">
              <p class="text categoryLabel">
              <b id="categoryLabel" >Categoria</b><br>
              <span id="category"></span></p>
          </div>

          <div class="informationInstance">
            <p class="text">
            <b id="ageLabel">Età adatta</b><br>
            <span id="ageFrom"></span>-<span id="ageTo"></span></p>
          </div>

          <div class="informationInstance">
            <p id="altitudeLabel" class="text"><b>Dislivello e altitudine</b><br>
            Dislivello totale: <span id="altitudeDifference"></span> m<br>
            Punto più basso: <span id="altitudeLowestPoint"></span> m<br>
            Punto più alto: <span id="altitudeHighestPoint"></span> m</p>
          </div>

          <div class="informationInstance">
            <p class="text">
            <b id="localityLabel">Località</b><br>
            <span id="location"></span></p>
          </div>

          <div class="informationInstance">
            <a id="directions" class="button" target="_blank">Get directions</a>
          </div>
      </div>

    </div>

    <!--Descriptive text of the POI/Activity-->
    <div class="itemInfo" id="itemDescription">
      <div class="infoTitle" id="descriptionTitle">
        <!--<i class="fas fa-file-alt"></i>-->
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-alt" class="svg-inline--fa fa-file-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"></path></svg>
        <p class="infoTitleParagraph">Description</p>
      </div>

      <div class="info" id="description">
        <p class="text"></p>
      </div>
      </div>


    <!--Contacts-->
      <div class="itemInfo" id="itemContacts">
        <div class="infoTitle" id="contactsTitle">
          <!--<i class="fas fa-id-card"></i>-->
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="id-card" class="svg-inline--fa fa-id-card fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528 32H48C21.5 32 0 53.5 0 80v16h576V80c0-26.5-21.5-48-48-48zM0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V128H0v304zm352-232c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zm0 64c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zm0 64c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zM176 192c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zM67.1 396.2C75.5 370.5 99.6 352 128 352h8.2c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h8.2c28.4 0 52.5 18.5 60.9 44.2 3.2 9.9-5.2 19.8-15.6 19.8H82.7c-10.4 0-18.8-10-15.6-19.8z"></path></svg>
          <p class="infoTitleParagraph">Contacts</p>
      </div>

      <div class="info" id="contacts">
          <p class="text"><b><span id="companyName"></span></b><br>
        <span id="address"></span>, <span id="city"></span>, <span id="country"></span></p>
        <p class="text">
        <span>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" class="svg-inline--fa fa-envelope fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
        <span id="email"></span>
        </span>
        </p>

        <p class="text" style="clear: both;">
        <span>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone-alt" class="svg-inline--fa fa-phone-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
        <span id="phoneNumber"></span>
        </p>
        </span>
      </div>
    </div>
  </div>
</div>

<style>
	${allStyle}
	${themeStyle}
	${atomsStyle}
	${componentStyle}
</style>
`;



class ItemVisualizerComponent extends HTMLElement
{
	constructor()
	{
		super();

		let thiswebcomponent = this

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(itemVisualizer_template.content.cloneNode(true));

		let closebutton = this.shadowRoot.querySelector("#closebutton");
		closebutton.addEventListener('click', function()
		{
			thiswebcomponent.closebuttonfunction()
		});

		this.mainContainer = this.querySelector(".mainContainer");
	}

	/**
	 * Functions to update the information displayed in the ItemVisualizerComponent:
	 * - observedAttributes()
	 * - attributeChangedCallback()
	 * - get/set language()
	 * - get/set apoiid()
	 *
	 * When the attributes 'apoiid','directions','language' are changed, the following happens:
	 * - 'apoiid' (string): new data is retrieved from the ODH API and the obtained information is displayed
	 * - 'directions' (boolean): the "Get directions" button is either displayed or hidden
	 * - 'language' ('it','de','en'): new data is retrieved from the ODH API and the obtained information is displayed
	 *
	 * */

	static get observedAttributes()
	{
		return ['apoiid'];
	}

	async attributeChangedCallback(name, oldVal, newVal)
	{
		let thiswebcomponent = this

		if (name === 'apoiid')
		{
			let lang = this.getAttribute('lang')

			// read data json
			let response = await fetch('https://tourism.opendatahub.bz.it/v1/ODHActivityPoi/' + newVal + '?origin=webcomp-activity-poi')
			let json = await response.json()
			let item = json

			// copy values from json to html
			var root_element = this.shadowRoot;
			this.writeItem(item, root_element, lang);
			this.updateLabels(item, root_element, lang);

			//update colour of icons and title
			root_element.querySelector('div.mainContainer').className = "mainContainer";
			root_element.querySelector('div.mainContainer').classList.add(item.Type.replace(/ .*/, ''));

		}

//		if (name == 'directions')
//		{
//			if (newVal)
//				this._shadowRoot.querySelector('a#directions').style.display = "block";
//			else
//				this._shadowRoot.querySelector('a#directions').style.display = "none";
//		}

	}

	/**
	 * Function responsible for writing the data about the item into the component.
	 *
	 * @param item: json object obtained from the ODH API that describes the POI or the Activity to display
	 * @param root_element (this._shadowRoot): where to write the information
	 * @param lang ('it','en','de'): language used to display the information about the POI/Activity
	 *
	 */

	writeItem(item, root_element, lang)
	{
		root_element.querySelector('div#Title > p').innerHTML = item.Detail[lang].Title;
		root_element.querySelector('div#description > p').innerHTML = item.Detail[lang].BaseText;

		root_element.querySelector('span#category').innerHTML = item.PoiType;

		if (item.PoiType == null || item.PoiType == "")
		{
			root_element.querySelector('span#category').parentElement.style.display = "none"
		}
		else
		{
			root_element.querySelector('span#category').parentElement.style.display = "block"
		}

		root_element.querySelector('span#ageFrom').innerHTML = item.AgeFrom;
		root_element.querySelector('span#ageTo').innerHTML = item.AgeTo;

		if (item.AgeTo == 0 || item.AgeFrom == 0)
		{
			root_element.querySelector('span#ageTo').parentElement.style.display = "none"
		}
		else
		{
			root_element.querySelector('span#ageTo').parentElement.style.display = "block"
		}

		root_element.querySelector('span#altitudeDifference').innerHTML = item.AltitudeDifference; //oppure AltitudeSumUp?
		root_element.querySelector('span#altitudeLowestPoint').innerHTML = item.AltitudeLowestPoint;
		root_element.querySelector('span#altitudeHighestPoint').innerHTML = item.AltitudeHighestPoint;

		if (item.AltitudeDifference == 0 || item.AltitudeLowestPoint == 0 || item.AltitudeHighestPoint == 0)
		{
			root_element.querySelector('span#altitudeDifference').parentElement.style.display = "none"
		}
		else
		{
			root_element.querySelector('span#altitudeDifference').parentElement.style.display = "block"
		}

		root_element.querySelector('span#location').innerHTML = item.LocationInfo.TvInfo.Name[lang];
		//image gallery -> item.ImageGallery --- How to add a Gallery

		if (item.ContactInfos[lang] != undefined)
		{
			root_element.querySelector('span#companyName').parentElement.style.display = "block";
			root_element.querySelector('span#companyName').innerHTML = item.ContactInfos[lang].CompanyName;
			root_element.querySelector('span#address').innerHTML = item.ContactInfos[lang].Address;
			root_element.querySelector('span#city').innerHTML = item.ContactInfos[lang].City;
			root_element.querySelector('span#country').innerHTML = item.ContactInfos[lang].CountryName;
			root_element.querySelector('span#email').innerHTML = item.ContactInfos[lang].Email;
			root_element.querySelector('span#phoneNumber').innerHTML = item.ContactInfos[lang].Phonenumber;
			root_element.querySelector('a#directions').setAttribute("href", "http://maps.google.com/maps?q=" + item.GpsInfo[0].Latitude + "," + item.GpsInfo[0].Longitude);
		}
		else
		{
			root_element.querySelector('span#companyName').parentElement.style.display = "none"
		}
	}

	updateLabels(item, root_element, lang){
		root_element.querySelector('#itemInformation .infoTitleParagraph').innerHTML = strings["information"][lang];
		root_element.querySelector('#itemDescription .infoTitleParagraph').innerHTML = strings["description"][lang];
		console.log(root_element.querySelector('p#categoryLabel'));
		console.log(root_element.querySelector('span#category'));
		root_element.querySelector('#categoryLabel').innerText = strings["category"][lang];
		console.log(root_element.querySelector('span#category'));
		root_element.querySelector('#ageLabel').innerText = strings["suitable-age"][lang];
		root_element.querySelector('#localityLabel').innerText = strings["locality"][lang];
		root_element.querySelector('#itemContacts .infoTitleParagraph').innerText = strings["contacts"][lang];
		root_element.querySelector('#altitudeLabel').innerText = strings["difference-altitude"][lang];
		root_element.querySelector('a#directions').textContent = strings["get-directions"][lang];
	}


}

customElements.define('item-visualizer', ItemVisualizerComponent);
