# iot-device-node
The minimal code for an IoT device to connect to an Azure IoTHub in node

To get an idea of how this code might be used in an IoT device check out the [RaspberryPi Simulator](https://azure-samples.github.io/raspberry-pi-web-simulator/)


## Setup

run the following command from a terminal window in the project folder

```bash
$ npm install
```

create a file named ```.env``` in the project folder with contents like the following

```
IOT_DEVICE_CONNECTIONSTRING=HostName=<iothub-name>.azure-devices.net;DeviceId=<device-name>;SharedAccessKey=<device-shared-access-key>=
```

## Run

run the following command from a terminal window in the project folder

```bash
$ node device.js
```
