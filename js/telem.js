var telem = new WebSocket("ws://telem.ctrtl.com/ws");

telem.onopen = () => {
  alert("[open] Connection established");
  alert("Sending to server");
  const msg = {
    type: 'subscribe',
    channel: '4',
    interval: 500
  };
  telem.send(JSON.stringify(msg));
};
telem.onmessage = function (event) {
    console.log(event.data);
  }