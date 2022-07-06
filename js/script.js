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

function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.nazwa);
}

L.marker(endLocation, {icon: finishIcon}).addTo(map);
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
