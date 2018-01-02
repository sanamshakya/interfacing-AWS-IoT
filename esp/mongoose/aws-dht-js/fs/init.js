load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_net.js');
load('api_sys.js');
load('api_timer.js');

let led = Cfg.get('pins.led');
GPIO.set_mode(led, GPIO.MODE_OUTPUT);
let updateTopic = "$aws/things/thing3/shadow/update";

function report(){
  print ("updating ", (GPIO.read(led)));
  let topic = updateTopic;
    let message = JSON.stringify({
      "state":{
       "reported":{
          "device4.14": GPIO.read(led)===0?1:0,
          "device4.15": Sys.total_ram(),
          "device4.16": Sys.free_ram()
       }
     }
  });
  MQTT.pub("$aws/things/thing3/shadow/update", message, 1);
}

Timer.set(30000, true, function() {
  report();
}, null);

MQTT.sub('$aws/things/thing3/shadow/update/accepted', function(conn, topic, msg) {
  print('Topic:', topic, 'message:', JSON.parse(msg));
}, null);

MQTT.sub('$aws/things/thing3/shadow/update/rejected', function(conn, topic, msg) {
  print('Topic:', topic, 'message:', JSON.parse(msg));
}, null);

MQTT.sub('$aws/things/thing3/shadow/update/delta', function(conn, topic, msg) {
  print('Topic:', topic, 'message:', JSON.parse(msg));
  let m = JSON.parse(msg); 
  GPIO.write(led, m.state["device4.14"]===0?1:0);
  report();
}, null);

// Monitor network connectivity.

Net.setStatusEventHandler(function(ev, arg) {
  let evs = '???';
  if (ev === Net.STATUS_DISCONNECTED) {
    evs = 'DISCONNECTED';
  } else if (ev === Net.STATUS_CONNECTING) {
    evs = 'CONNECTING';
  } else if (ev === Net.STATUS_CONNECTED) {
    evs = 'CONNECTED';
  } else if (ev === Net.STATUS_GOT_IP) {
    evs = 'GOT_IP';
  }
  print('== Net event:', ev, evs);
}, null);
