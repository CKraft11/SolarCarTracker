var socket = new WebSocket("wss://telem.ctrtl.com/ws");
socket.binaryType = 'arraybuffer';
channelNum = new Uint32Array([2]);

socket.onopen = () => {
  socket.send(channelNum);
  socket.send(new Uint32Array([3]));
};

dX=0;

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
    if(telemLong-dX>0){
      carMarkerF.addTo(map)
      carMarker.remove()
    } else {
      carMarker.addTo(map)
      carMarkerF.remove()
    }
    dX=telemLong;
    //console.log("Latitude: " + telemLat + " Longitude: " + telemLong);
    carMarker.setLatLng([telemLat,telemLong]);
    carMarkerF.setLatLng([telemLat,telemLong]);
    document.getElementById("connection").style.display = "flex";
    document.getElementById("disconnection").style.display = "none";
  }
  if (webData.byteLength == 96) {
    speed = new Int32Array(webData.slice(0, 96));
    speed = speed[1]/10;
    //console.log(speed);
    const div = document.getElementById('speed');
    div.innerHTML = speed + " Mph";

  }
  //console.log(event.data);
  }

socket.onclose = () => {
  document.getElementById("connection").style.display = "none";
  document.getElementById("disconnection").style.display = "flex";
};