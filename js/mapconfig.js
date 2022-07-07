var solarLat = 38.923630017089844;
var solarLong = -95.67321612548828;

// config map
var config = {
  minZoom: 2,
  maxZoom: 18,
};

// magnification with which the map will start
const zoom = 16;
// co-ordinates
const lat = solarLat;
const lng = solarLong;

var solarDetails = {
  title: "PrISUm Solar Car",
  clickable: true
}
var finishIcon = L.icon({
  iconUrl: '/images/finish_line.png',
  iconSize:     [64, 64], // size of the icon
  iconAnchor:   [22, 64], // point of the icon which will correspond to marker's location
});
var p15Icon = L.icon({
  iconUrl: '/images/p15.png',
  iconSize:     [96, 24], // size of the icon
  iconAnchor:   [48, 12], // point of the icon which will correspond to marker's location
});
var p15fIcon = L.icon({
  iconUrl: '/images/p15f.png',
  iconSize:     [96, 24], // size of the icon
  iconAnchor:   [48, 12], // point of the icon which will correspond to marker's location
});

var endLocation = [42.5839, -114.4710];