import dotenv from "dotenv";
dotenv.config();

import http from "node:http";
import { app } from "./app.js";
import { createWebSocketConnection } from "./webSocket.js";

const server = http.createServer(app);

createWebSocketConnection(server);

app.get("/", (req, res) => {
    res.send("<div>hello</div>");
});

server.listen(process.env.PORT, () => {
    console.log(`Listneing on: http://localhost:${process.env.PORT}`);    
});