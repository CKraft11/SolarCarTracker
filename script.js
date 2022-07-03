/* eslint-disable no-undef */
/**
 * geoJSON simple
 */

// config map
let config = {
  minZoom: 2,
  maxZoom: 18,
};
// magnification with which the map will start
const zoom = 6;
// co-ordinates
const lat = 40;
const lng = -105;

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.nazwa);
}
var solarDetails = {
  title: "PrISUm Solar Car",
  clickable: true
}
var finishIcon = L.icon({
  iconUrl: 'finish_line.png',
  iconSize:     [64, 64], // size of the icon
  iconAnchor:   [22, 64], // point of the icon which will correspond to marker's location
});
var p15Icon = L.icon({
  iconUrl: 'p15.png',
  iconSize:     [128, 32], // size of the icon
  iconAnchor:   [64, 16], // point of the icon which will correspond to marker's location
});

var solarLat = 39.0377;
var solarLong = -95.6761;
L.marker([42.5839, -114.4710], {icon: finishIcon}).addTo(map);
//var finishline = new L.Marker([42.5839, -114.4710]);
L.marker([solarLat, solarLong], {icon: p15Icon}).addTo(map);
//var solarcar = new L.Marker([solarLat, solarLong],solarDetails);
//solarcar.addTo(map);
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
  });
