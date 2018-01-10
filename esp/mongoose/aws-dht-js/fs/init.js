load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_dht.js');
load('api_net.js');
load('api_sys.js');
load('api_timer.js');

// Configuration for devices attached to the thing
let led = Cfg.get('app.led');
let dhtPin = Cfg.get('app.dht');

// Getting name of the thing from config
let thingName = Cfg.get('aws.thing_name');

// Setting pin mode for led as output
GPIO.set_mode(led, GPIO.MODE_OUTPUT);

// Creating dht object
let dht = DHT.create(dhtPin, DHT.DHT11);

// All AWS thing shadow topics
let updateTopic = "$aws/things/"+thingName+"/shadow/update";
let updateAcceptedTopic = "$aws/things/"+thingName+"/shadow/update/accepted";
let updateRejectedTopic = "$aws/things/"+thingName+"/shadow/update/rejected";
let updateDeltaTopic = "$aws/things/"+thingName+"/shadow/update/delta";

// function to publish data to thing shadow
function report(){
  print ("updating ", (GPIO.read(led)));
  let topic = updateTopic;
    // TODO
    let message = JSON.stringify({
      "state":{
       "reported":{
          "device??.??": GPIO.read(led)===0?1:0,//for led
          "device??.??": dht.getTemp(), //for temperature
          "device??.??": dht.getHumidity() //for humidity
       }
     }
  });
  MQTT.pub(updateTopic, message, 1);
}

// calls report method after 5000 seconds
Timer.set(Cfg.get('app.interval'), true, function() {
  report();
}, null);

// Subscription to AWS thing shadow topics
MQTT.sub(updateAcceptedTopic, function(conn, topic, msg) {
  print('Topic:', topic, 'message:', JSON.stringify(msg));
}, null);

MQTT.sub(updateRejectedTopic, function(conn, topic, msg) {
  print('Topic:', topic, 'message:', JSON.stringify(msg));
}, null);

MQTT.sub(updateDeltaTopic, function(conn, topic, msg) {
  print('Topic:', topic, 'message:', JSON.stringify(msg));
  let m = JSON.parse(msg);
  // TODO
  GPIO.write(led, m.state["device??.??"]===0?1:0);
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
