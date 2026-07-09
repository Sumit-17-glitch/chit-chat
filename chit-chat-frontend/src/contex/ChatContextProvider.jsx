import React from "react";
import { useState, useEffect, useRef } from "react";
import { ChatContext } from "./chatContext";

function ChatContextProvider({children}) {
  const socket = useRef(null);
  const [userName, setUserName] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);

  const value = {
    socket,
    user: { userName, setUserName },
    currentRoom: { currentRoom, setCurrentRoom },
    rooms: {rooms, setRooms},
    message: { 
        messages, 
        setMessages 
    },
  };

  useEffect(()=>{
    socket.current = new WebSocket(import.meta.env.VITE_WS_URL);
    return () => {
        socket.current?.close();
    }
  },[]);

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContextProvider;
