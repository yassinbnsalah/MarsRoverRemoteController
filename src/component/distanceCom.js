import mqtt from 'mqtt';
import React, { useEffect, useState } from 'react'

function DistanceCom() {
    const [client, setClient] = useState(null);
      const [isConnected, setIsConnected] = useState(false);
      const [messages, setMessages] = useState("");
    
      useEffect(() => {
          const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt"); 
          setClient(mqttClient);
    
          mqttClient.on("connect", () => {
              console.log("Connected to HiveMQ broker");
              setIsConnected(true);
    
              mqttClient.subscribe("iotrover/distance", (err) => {
                  if (!err) {
                      console.log("Subscribed to topic: iotrover/distance");
                  } else {
                      console.error("Subscription error:", err);
                  }
              });
          });
          mqttClient.on("message", (topic, message) => {
            const parsedMessage = parseFloat(message.toString());
            if (!isNaN(parsedMessage)) {
              // Add the parsed message to the state, formatted to 3 decimal places
              setMessages(
                parsedMessage.toFixed(3)
              );}
              console.log(`Message received on ${topic}: ${ parsedMessage.toFixed(3)}`);
             // setMessages(parseFloat(message.toString(),3));
          });
    
          mqttClient.on("close", () => {
              console.log("Disconnected from MQTT broker");
              setIsConnected(false);
          });
    
          return () => {
              mqttClient.end();
          };    
      }, []);
    
  return (
    <div class="alert alert-danger" role="alert">Distance :  {messages} <sup>cm</sup> </div>
  )
}

export default DistanceCom