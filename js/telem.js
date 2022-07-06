var telem = new WebSocket("ws://telem.ctrtl.com/ws");

channelNum = 3;

telem.onopen = () => {
  alert("[open] Connection established");
  alert("Sending to server");
  telem.send(new Uint32Array([channelNum]));
};
telem.onmessage = function (event) {
  console.log(event.data);
  }