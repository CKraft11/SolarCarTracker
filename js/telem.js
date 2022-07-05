var telem = new WebSocket("ws://telem.ctrtl.com/ws");

telem.onopen = () => {
  alert("[open] Connection established");
  alert("Sending to server");
  const strategy = {
    type: 'subscribe',
    channel: '4',
    interval: 500
  };
  telem.send(JSON.stringify(strategy));
};
telem.onmessage = function (event) {
    console.log(event.data);
  }