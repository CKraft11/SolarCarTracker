var socket = new WebSocket("ws://telem.ctrtl.com/ws");

channelNum = new Uint32Array([2]);

// socket.onopen = () => {
//   alert("[open] Connection established");
//   alert("Sending to server");
//   socket.send(channelNum);
// };
function setDataSource<T>(key: number, struct: StructBuilder<string, T>, target: T, cb?: () => void) {
  handlers[key] = { key, struct, target, cb }
  if (socket.readyState == socket.OPEN) socket.send(new Uint32Array([key]))
}
socket.onopen = () => {
  alert("[open] Connection established");
  alert("Sending to server");
  socket.setDataSource(channelNum, Struct()
      .uint32('timestamp').float('latitude').float('longitude').float('altitude').float('climb').float('accel').float('soc').float('wsd_motor_velocity').float('wsd_vehicle_velocity').float('wsd_bus_current').float('wsd_bus_voltage').float('wsd_phase_a').float('wsd_phase_b').float('wsd_emfq').float('wsd_emfd').float('wsd_odometer').float('wsd_bus_amp_hour').float('wsd_slip_speed').float('wsp_motor_velocity').float('wsp_vehicle_velocity').float('wsp_bus_current').float('wsp_bus_voltage').float('wsp_phase_a').float('wsp_phase_b').float('wsp_emfq').float('wsp_emfd').float('wsp_odometer').float('wsp_bus_amp_hour').float('wsp_slip_speed')
      .structArray('mppt', 4, Struct().float('in_current').float('in_voltage').float('out_voltage').float('in_power').int16('pcb_temp').int16('mosfet_temp'))
    , strategy)
};

socket.onmessage = function (event) {
  console.log(event.data);
  }