var telem = new WebSocket("ws://telem.ctrtl.com/ws");

function ToInt32(x) {
  var uint32 = ToUint32(x);
  if (uint32 >= Math.pow(2, 31)) {
      return uint32 - Math.pow(2, 32)
  } else {
      return uint32;
  }
}
channelNum = ToInt32(4)

telem.onopen = () => {
  alert("[open] Connection established");
  alert("Sending to server");
  const strategy = {
    type: 'subscribe',
    channel: channelNum,
    interval: 1
  };
  telem.send(JSON.stringify(strategy));
};
telem.onmessage = function (event) {
  console.log(event.data);
  }