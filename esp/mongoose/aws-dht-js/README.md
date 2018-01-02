# A Mongoose OS app that sends DHT sensor data to AWS-IOT

## Overview

This is a project to send DHT data to AWS-IOT. It publishes data to a thing shadow in AWS-IOT. It also has a handler to turn on or off the on-board ESP8266 LED.


## How to install this app

- Clone this repository
- cd into repo and run "sudo mos build --arch \<device-name\>" (e.g. sudo mos build --arch esp8266)
- Connect your device and run "sudo mos flash"

