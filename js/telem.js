var telem = new WebSocket("ws://telem.ctrtl.com/ws");

telem.onmessage = function (event) {
    console.log(event.data);
  }