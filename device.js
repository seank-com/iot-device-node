'use strict';

require("dotenv").config();
const Protocol = require("azure-iot-device-mqtt").Mqtt;
const Client = require("azure-iot-device").Client;
const Message = require("azure-iot-device").Message;
const uuid = require("uuid");

var timingInterval = 5*1000; // every 5 seconds
var sendInterval = null;

console.log("Connecting using ", process.env.IOT_DEVICE_CONNECTIONSTRING);

var client = Client.fromConnectionString(process.env.IOT_DEVICE_CONNECTIONSTRING, Protocol);

function sendMsg() {
  var timestamp = new Date(),
    msg = Object.assign({ 
      "type": "time",
      "time": timestamp
    }),
    id = uuid.v4(),
    message = new Message(JSON.stringify(msg));

  message.messageId = id;

  client.sendEvent(message, (err, result) => {
    if (err) {
      console.log("send error:", err);
      process.exit();
    }
    console.log("Sent D2C message");
  });
};

function fail(err) {
  if (err) {
    console.log("client error:", err);
    if (sendInterval) clearInterval(sendInterval);
    client.close();
  }
};

client.open((err, result) => {
  if (err) {
    fail(err);
  } else {

    console.log("Setting reporting interval every %dms", timingInterval);
    sendInterval = setInterval(sendMsg, timingInterval);

    client.on("message", (message) => {
      var msg = JSON.parse(message.getData());
      var messageId = message.messageId;

      console.log("Receive C2D message(%s) = %s", messageId, JSON.stringify(msg));

      client.complete(message, (err) => {
        fail(err);
      });
    });

    client.on("error", (err) => {
      fail(err);
    });
  }
});
