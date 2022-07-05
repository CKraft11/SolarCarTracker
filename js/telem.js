var telem = new WebSocket("ws://telem.ctrtl.com/ws");

telem.onopen = function(e) {
  alert("[open] Connection established");
  alert("Sending to server");
  telem.send("P15 Telem Connection Established");
};

telem.onmessage = function (event) {
    console.log(event.data);
  }