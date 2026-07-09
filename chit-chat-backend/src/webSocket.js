import { WebSocketServer } from "ws";
import { broadCastMeassage, getRooms, joinRoom, leaveRoom } from "./roomManager.js";

export const createWebSocketConnection = (server) => {
  console.log("inside ws");
  const webSocketServer = new WebSocketServer({ server });

  webSocketServer.on("connection", (socket) => {
    console.log("connected");
    
    socket.on("message", (data) => {
        const payload = JSON.parse(data);
        const type = payload.type;
        
        switch (type){
            case "join":
                joinRoom(socket, payload.roomName, payload.userName);
                break;
            case "leave":
                leaveRoom(socket);
                break;
            case "broadcast":
                broadCastMeassage(payload.roomName,  payload.userName ,payload.message);
                break;
            case "getRooms":
                getRooms(socket);
                break;
        }

    });

    socket.on("close", ()=>{
        leaveRoom(socket);
    })
  });
};
