(function()
{

	async function main()
	{

		// initialize Leaflet
		var map = L.map('mapid').setView({
			lon : 11.4,
			lat : 46.6
		}, 9);

		// add the OpenStreetMap tiles
		L.tileLayer(
						'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
						{
							maxZoom : 19,
							attribution : '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
						}).addTo(map);

		// show the scale bar on the lower left corner
		L.control.scale().addTo(map);
		
		let response = await fetch('map.json')
		let json = await response.json()
		console.log(json)
		
		let items = json.Items;
		
		console.log(items)
		
		for (let i = 0; i < items.length; i++)
		{
			let item = items[i]
			
			console.log(item.GpsInfo[0].Longitude)

			// show a marker on the map
			L.marker({
				lon : item.GpsInfo[0].Longitude,
				lat : item.GpsInfo[0].Latitude
			}).bindPopup('The center of the world').addTo(map);
		}
	}
	
	main();

})()