import React, { useContext, useEffect, useState } from "react";
import { LogOut, SendHorizontal } from "lucide-react";
import { ChatContext } from "../contex/chatContext";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import UserMsg from "../components/UserMsg";
import OthersMsg from "../components/OthersMsg";

function ChatRoom() {
  const { user, message, socket } = useContext(ChatContext);
  const [inputMeassage, setInputMessage] = useState("");
  const { roomName } = useParams();

  const handleSend = () => {
    if (socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(
        JSON.stringify({
          type: "broadcast",
          roomName: roomName,
          message: inputMeassage,
          userName: user.userName,
        }),
      );
      // message.setMessages((prev) => [
      //   ...prev,
      //   { user: user.userName, message: inputMeassage, id: nanoid() },
      // ]);
      setInputMessage("");
    }
  };

  useEffect(() => {
    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("data:", data);

      message.setMessages((prev) => [
        ...prev,
        { user: data.userName, message: data.message, id: nanoid() },
      ]);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-200 flex justify-center items-center p-4">
      <div className="w-full max-w-5xl h-[90vh] rounded-[40px] bg-white/80 backdrop-blur-md shadow-2xl border border-orange-200 p-6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-orange-700">Coding Room</h1>

            <p className="text-gray-500 text-sm">4 users online</p>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-white font-semibold hover:bg-red-600 transition">
            <LogOut size={18} />
            Leave Room
          </button>
        </div>

        {/* Chat Box */}
        <div className="flex-1 rounded-[35px] border-2 border-orange-200 bg-orange-50 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {message.messages.map((message) => (
              <div key={message.id}>
                {message.user === user.userName ? <UserMsg message={message.message} userName={user.userName}/> 
                : <OthersMsg message={message.message} userName={message.user}/>}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-5">
            <div className="flex items-center gap-3 rounded-full bg-white border-2 border-orange-200 px-5 py-2">
              <input
                type="text"
                placeholder="Enter your message..."
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                value={inputMeassage}
                onChange={(e) => setInputMessage(e.target.value)}
              />

              <button
                className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white hover:scale-105 transition"
                onClick={handleSend}
              >
                <SendHorizontal size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
