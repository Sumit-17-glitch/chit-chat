import { WebSocketServer } from "ws";

export const createWebSocketConnection = (server) => {
  console.log("inside ws");
  const webSocketServer = new WebSocketServer({ server });

  webSocketServer.on("connection", (websocket) => {
    websocket.on("message", (data) => {
        const response = JSON.parse(data);
        websocket.send(response.message);    
    });
  });
};
