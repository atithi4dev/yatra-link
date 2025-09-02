import mqtt from "mqtt";
import fs from "fs";
import {handleDriverPayload} from "./payloadHandler.js";

// WebSocket broker for browser
const brokerUrl = "ws://localhost:9001"; 
const mqttClient = mqtt.connect(brokerUrl, {
  reconnectPeriod: 5000,
  keepalive: 10,
});

// MQTT LISTENER
export function startMQTT() {
  mqttClient.on("connect", () => {
    console.log("MQTT connected");
    mqttClient.subscribe("drivers/+/location", { qos: 1 }, (err) => {   // HERE THIS drivers/+/location means  - drivers/{driverId}/location

      if (err) console.error("Subscribe error:", err);
      else console.log("Subscribed to drivers/+/location");
    });
  });

  mqttClient.on("message", (topic, message) => {
    try {
      const payload = JSON.parse(message.toString());
      // DO processing and provide processed data
      handleDriverPayload(payload);
    } catch (err) {
      console.error("Error processing message:", err);
    }
  });

  mqttClient.on("error", (err) => console.error("MQTT Error:", err));
  mqttClient.on("offline", () => console.log("MQTT offline"));
  mqttClient.on("reconnect", () => console.log("MQTT reconnecting..."));
}

