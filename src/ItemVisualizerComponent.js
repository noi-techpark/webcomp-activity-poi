import themeStyle from './static/scss/theme.scss';
import componentStyle from './static/scss/components/itemVisualizer.scss'
import atomsStyle from './static/scss/atoms.scss'

const itemVisualizer_template = document.createElement('template');

itemVisualizer_template.innerHTML = `
	<div class="mainContainer">
    <p id="closebutton">
    <img src="` + paths.img_fa_icons + `times-solid.svg" onload="SVGInject(this)"></img>
    </p>

    <!--Title of the POI/Activity-->
      <div class="title">
        <div class="titleDiv" id="Title">
          <p class="titleParagraph">POI or Activity Title</p>
      </div>

      <div class="titleArrowDiv">
          <!--<i class="fas fa-chevron-up" onclick="expand(this)"></i>-->
          <img src="` + paths.img_fa_icons + `chevron-up-solid.svg" onload="SVGInject(this)"></img>
        </div>
      </div>

      <!--General info such as category, age, altitude, place and "get directions" button--->
      <div class="resultContainer">
      <div class="itemInfo" id="itemInformation">
          <div class="infoTitle" id="informationTitle">
            <!--<i class="fas fa-info-circle"></i>-->
            <img src="` + paths.img_fa_icons + `info-circle-solid.svg" onload="SVGInject(this)"></img>
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
        <img src="` + paths.img_fa_icons + `file-alt-solid.svg" onload="SVGInject(this)"></img>
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
          <img src="` + paths.img_fa_icons + `id-card-solid.svg" onload="SVGInject(this)"></img>
          <p class="infoTitleParagraph">Contacts</p>
      </div>

      <div class="info" id="contacts">
          <p class="text"><b><span id="companyName"></span></b><br>
        <span id="address"></span>, <span id="city"></span>, <span id="country"></span></p>
        <p class="text">
        <span>
        <img src="` + paths.img_fa_icons + `envelope-solid.svg" onload="SVGInject(this)"></img>
        <span id="email"></span>
        </span>
        </p>

        <p class="text" style="clear: both;">
        <span>
        <img src="` + paths.img_fa_icons + `phone-alt-solid.svg" onload="SVGInject(this)"></img>
        <span id="phoneNumber"></span>
        </p>
        </span>
      </div>
    </div>
  </div>
</div>

<style>
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
