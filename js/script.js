/* eslint-disable no-undef */
/**
 * geoJSON simple
 */

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

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
	layer.bindPopup(feature.properties.nazwa);
	console.log(feature);
	  
	if(feature.geometry.type == "LineString"){  
	  
		layer.setStyle({dashArray:"10 10", 
						dashOffset:0,
						color:"#88120d"});
	  
		tracks.push(layer); //add to tracks list
	}
	if(feature.geometry.type == "Point"){
	
	}	
}

function updateTrackAnimation(){
	for(const key in tracks){
		
		//console.log(tracks[key]);
		let newOffset = (tracks[key].options.dashOffset-1) % 20;
		tracks[key].setStyle({dashOffset:newOffset});
	}
}