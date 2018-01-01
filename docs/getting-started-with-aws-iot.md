
title: Getting Started with AWS IoT
author:
    author: Sanam Shakya
    
output: getting_started_with_aws_iot.html
controls: true
--
# Getting Started with AWS IoT
--
## Platform:
ESP8266 running Mongoose OS

--
## Downloading MOS tool 
Follow instruction in given link to install mos tool 

https://mongoose-os.com/software.html

--
## Running the demo-js code:
Get the demo code from example repo:

https://mongoose-os.com/docs/reference/apps.html

--
## Mongoose Filesystem and Configurration file
* demo-js
    * fs - init.js
    * mos.yml
--

## Configuration File walkthrough
config_schema:

filesystem:

libs:
--

## init.js code walkthrough
* Loading the library

* Variable definitions

* Helper functions

* Initialising peripherals and its handlers
* Wifi network handler


--
## Using MOS tool:
Command line:

`mos build --arch=esp8266`

Cosole Output:
```
Connecting to https://mongoose.cloud, user test
Uploading sources (1753 bytes)
Firmware saved to build/fw.zip

```

Creates build folder with firmware and filesystem

--
Flashing the code into ESP

`mos flash`

--
## More mos commands
`mos --help`

`mos console`

`mos config-get`

`mos ls`

changing configuration setting using mos commands:

`mos config-set mqtt.enable=true`
--



