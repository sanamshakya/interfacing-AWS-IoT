# A Mongoose OS app that sends DHT sensor data to AWS-IOT

## Overview

This is a project to send DHT data to AWS-IOT. It publishes data to a thing shadow in AWS-IOT. It also has a handler to turn on or off the on-board ESP8266 LED.


## How to install this app

- Clone this repository
- Change JSON field names in init.js as required
- Change conf1.json file to match your environment configuration
- cd into repo and run "sudo mos build --arch \<device-name\>" (e.g. sudo mos build --arch esp8266)
- Connect your device and run "sudo mos flash"
- Download certificates from aws dashboard or iot-platform and push them to the device filesystem and change the conf file
- Or Configure aws-cli and do certificate settings from mos gui

