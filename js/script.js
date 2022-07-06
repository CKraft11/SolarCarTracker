/* eslint-disable no-undef */
/**
 * geoJSON simple
 */

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
realTerrain = 0;
function terrainChange(realTerrain) {
  if (realTerrain%2==1) {
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }).addTo(map);
  } else {
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
  }
}
// THIS CODE DEVOLVES INTO LAG AND NEEDS MAJOR OPTIMIZATION



// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
var button = document.getElementById('styleButton');
button.addEventListener('click', () => realTerrain = realTerrain+1);
button.addEventListener('click', () => terrainChange(realTerrain));


  

  

  

//finishline
L.marker([42.5839, -114.4710], {icon: finishIcon}).addTo(map);

//carmarker
var carMarker = L.marker([solarLat, solarLong], {icon: p15Icon}).addTo(map);

var tracks = [];

// adding geojson by fetch
// of course you can use jquery, axios etc.
fetch("asc.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // use geoJSON
    L.geoJSON(data, {
		onEachFeature: onEachFeature,
		}).addTo(map);
	
	//console.log(tracks);
	setInterval(updateTrackAnimation, 1000/20);//20fps updates
  });
  
 function onEachFeature(feature, layer) {
	//layer.bindPopup(feature.properties.nazwa);
	//console.log(feature);
	  
	if(feature.geometry.type == "LineString"){  
	  
		layer.setStyle({dashArray:"10 10", 
						dashOffset:0,
						color:"#0278fc"});
	  
		tracks.push(layer); //add to tracks list
	}
	if(feature.geometry.type == "Point"){
		
		//console.log(feature);
    //layer.bindTooltip(feature.properties.name,{direction:"top"});
		layer.bindTooltip(feature.properties.name,{sticky:true});
	}	
}

function updateTrackAnimation(){
	for(const key in tracks){
		
		//console.log(tracks[key]);
		let newOffset = (tracks[key].options.dashOffset-1) % 20;
		tracks[key].setStyle({dashOffset:newOffset});
	}
}