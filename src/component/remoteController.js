import mqtt from 'mqtt';
import React, { useEffect, useState } from 'react'
import DistanceCom from './distanceCom';

function RemoteController() {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt"); 
      setClient(mqttClient);

      mqttClient.on("connect", () => {
          console.log("Connected to HiveMQ broker");
          setIsConnected(true);

          mqttClient.subscribe("iotrover/move", (err) => {
              if (!err) {
                  console.log("Subscribed to topic: iotrover/move");
              } else {
                  console.error("Subscription error:", err);
              }
          });
      });
      mqttClient.on("message", (topic, message) => {
          console.log(`Message received on ${topic}: ${message.toString()}`);
          setMessages((prevMessages) => [...prevMessages, message.toString()]);
      });

      mqttClient.on("close", () => {
          console.log("Disconnected from MQTT broker");
          setIsConnected(false);
      });

      return () => {
          mqttClient.end();
      };
  }, []);

  const MoveForward = () => {
    if (client && isConnected) {
      const topic = "iotrover/move";
      // const payload = JSON.stringify({ command: "w" }); 
      client.publish(topic, "w", {}, (err) => {
          if (err) {
              console.error("Failed to publish message:", err);
          } else {
              console.log(`Message published to ${topic}`);
          }
      });
  }
   }
  const MoveLeft = () => {
    if (client && isConnected) {
      const topic = "iotrover/move";
      client.publish(topic, "a", {}, (err) => {
          if (err) {
              console.error("Failed to publish message:", err);
          } else {
              console.log(`Message published to ${topic}`);
          }
      });
  }
   }
  const MoveRight = () => { if (client && isConnected) {
    const topic = "iotrover/move";
    client.publish(topic, "d", {}, (err) => {
        if (err) {
            console.error("Failed to publish message:", err);
        } else {
            console.log(`Message published to ${topic}`);
        }
    });
} }
  const MoveBack = () => { if (client && isConnected) {
    const topic = "iotrover/move";
    client.publish(topic, "s", {}, (err) => {
        if (err) {
            console.error("Failed to publish message:", err);
        } else {
            console.log(`Message published to ${topic}`);
        }
    });
} }
  const Stop = () => { if (client && isConnected) {
    const topic = "iotrover/move";
    client.publish(topic, "b", {}, (err) => {
        if (err) {
            console.error("Failed to publish message:", err);
        } else {
            console.log(`Message published to ${topic}`);
        }
    });
} }
const Speedplus = () => { if (client && isConnected) {
  const topic = "iotrover/move";
  client.publish(topic, ".", {}, (err) => {
      if (err) {
          console.error("Failed to publish message:", err);
      } else {
          console.log(`Message published to ${topic}`);
      }
  });
} }
const Speedminus = () => { if (client && isConnected) {
  const topic = "iotrover/move";
  client.publish(topic, ",", {}, (err) => {
      if (err) {
          console.error("Failed to publish message:", err);
      } else {
          console.log(`Message published to ${topic}`);
      }
  });
} }
  return (<>
    <h1> Rover Mars Remote Controller</h1>
    <div className="d-grid" style={{ gridTemplateColumns: "repeat(3, auto)", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
      <div></div>
      <button className="btn btn-primary btn-sm" onClick={MoveForward}>Forward</button>
      <div></div>
      <button className="btn btn-secondary btn-sm" onClick={MoveLeft}>Left</button>
      <button className="btn btn-danger btn-sm" onClick={Stop}>Stop</button>
      <button className="btn btn-secondary btn-sm" onClick={MoveRight}>Right</button>
      <div></div>
      <button className="btn btn-primary btn-sm" onClick={MoveBack}>Back</button>
      <div></div>
      <button className="btn btn-primary btn-sm" onClick={Speedminus}>Speed -</button>
      <div></div>
      <button className="btn btn-primary btn-sm" onClick={Speedplus}>Speed +</button>
      <div></div>
   
      <div></div>

     
    </div>
    <DistanceCom/>
  </>

  )
}

export default RemoteController