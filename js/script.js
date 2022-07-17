/* eslint-disable no-undef */
/**
 * geoJSON simple
 */

// calling map
//const map = L.map("map", config).setView([lat, lng], zoom);
const map = L.map("map", config).fitBounds([[38.823480, -94.240652],[43.921331, -115.489527]]);
let mapUrl = ["https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png","https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"]

var street = L.tileLayer(mapUrl[0],{attribution: '© OpenStreetMap'});
var terrain = L.tileLayer(mapUrl[1]);
street.addTo(map);

var i = 0
var button = document.getElementById('styleButton');
button.addEventListener('click', () => i=i+1);
button.addEventListener('click', () => {if(i%2==1){
	terrain.addTo(map);
} else {
	terrain.remove();
}});
console.log(terrain)
// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
//finishline


//carmarker
var carMarker = L.marker([solarLat, solarLong], {icon: p15Icon});
var carMarkerF = L.marker([solarLat, solarLong], {icon: p15fIcon});

var showRoute = false;

if(showRoute==true){
	L.marker([42.5839, -114.4710], {icon: finishIcon}).addTo(map);
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
		layer.bindTooltip(feature.properties.name,{sticky:true,direction:"top"});
		}	
	}
}

function updateTrackAnimation(){
	for(const key in tracks){
		
		//console.log(tracks[key]);
		let newOffset = (tracks[key].options.dashOffset-1) % 20;
		tracks[key].setStyle({dashOffset:newOffset});
	}
}
