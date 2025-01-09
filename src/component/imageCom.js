import mqtt from 'mqtt';
import React, { useEffect, useState } from 'react'
import Base64ImageViewer from './Base64ImageViewer';

function ImageCom() {
     const [client, setClient] = useState(null);
          const [isConnected, setIsConnected] = useState(false);
          const [messages, setMessages] = useState("");
        
          useEffect(() => {
              const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt"); 
              setClient(mqttClient);
        
              mqttClient.on("connect", () => {
                  console.log("Connected to HiveMQ broker");
                  setIsConnected(true);
        
                  mqttClient.subscribe("photos", (err) => {
                      if (!err) {
                          console.log("Subscribed to topic: photos");
                      } else {
                          console.error("Subscription error:", err);
                      }
                  });
              });
              mqttClient.on("message", (topic, message) => {
                mqttClient.on("message", (topic, message) => {
                    
                    
                    console.log(`Message received on ${topic}: ${message.toString()}`);
                    setMessages(message.toString());
                });
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
    <div>
         <Base64ImageViewer base64String={messages} /> 
       </div>
  )
}

export default ImageCom