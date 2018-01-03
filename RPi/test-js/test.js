var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
    keyPath: "", //fill the path for private key
    certPath: "", //fill the path for certificate
    caPath: "",  //fill the path for ca certificat
    clientId: "MyDevice",
    host: "a221a6r4ojicsi.iot.ap-southeast-1.amazonaws.com",
    region: "ap-southeast-1",
    port: 8883,
    debug: true
});

device.on('connect', function() {
    console.log('connected');
    device.subscribe('$aws/things/sandbox/shadow/update');
    device.publish('$aws/things/sandbox/shadow/update', JSON.stringify({
    "state" : {
        "desired" : {
            "device1.1" : 4.5
         }
     }
}));
});

device.on('close', function() {
    console.log('disconnected', arguments);
});

device.on('error', function() {
    console.log('error', arguments);
});

device.on('reconnect', function() {
    console.log('reconnecting', arguments);
});

device.on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
});

device.on('timeout', function(thingName, clientToken) {
    console.log('received timeout');
});

function periodic_publish() {
  console.log('publishing to cloud');
  device.publish('$aws/things/sandbox/shadow/update', JSON.stringify({
    "state" : {
        "desired" : {
            "device1.1" : 4.5
         }
     }
  }));
}
setInterval(periodic_publish, 1500);
