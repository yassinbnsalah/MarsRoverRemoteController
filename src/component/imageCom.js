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
                    console.log(`Message received on ${topic}`);
                    setMessages(message.toString());
                });
        
              mqttClient.on("close", () => {
                  console.log("Disconnected from MQTT broker photos");
                  setIsConnected(false);
              });
        
              return () => {
                  mqttClient.end();
              };    
          }, []);
        const  sendImageRequest = () =>{
            const topic = "iotrover/move";
            client.publish(topic, "p", {}, (err) => {
                if (err) {
                    console.error("Failed to publish message:", err);
                } else {
                    console.log(`Message published to ${topic}`);
                }
            });
        }
  return (
    <div>
        
         <Base64ImageViewer base64String={messages} /> 


           <button className="btn btn-primary btn-sm" onClick={sendImageRequest}
            style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
              }}>Get Image </button>
       </div>
  )
}

export default ImageCom