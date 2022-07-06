var socket = new WebSocket("ws://telem.ctrtl.com/ws");
socket.binaryType = 'arraybuffer';
channelNum = new Uint32Array([2]);

socket.onopen = () => {
  socket.send(channelNum);
};

socket.onmessage = function (event) {
  webData=event.data;
  //console.log(webData);
  if (webData.byteLength == 200) {
    //console.log(webData);
    var time = new Int32Array(webData);
    //console.log(time[1]);
    var time = time[1];
    var location = new Float32Array (webData)
    var telemLat = location[2];
    var telemLong = location[3];
    global = telemLat;
    global = telemLong;
    console.log("Latitude: " + telemLat + " Longitude: " + telemLong);
    carMarker.setLatLng([telemLat,telemLong]);
  }
  //console.log(event.data);
  }