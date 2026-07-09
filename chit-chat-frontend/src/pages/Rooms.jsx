import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../contex/chatContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { nanoid } from "nanoid";

export default function Rooms() {
  const navigate = useNavigate();
  const { socket, user } = useContext(ChatContext);
  const [rooms, setRooms] = useState([]);

  const handleJoin = (room) => {
    if (socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(
        JSON.stringify({
          type: "join",
          userName: user.userName,
          roomName: room,
        }),
      );
    }

    navigate(`/chat-room/${room}`);
  };

  useEffect(() => {
    if (socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify({ type: "getRooms" }));
    }
    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setRooms(data.currentRooms);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-200 flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-5xl h-full max-h-full flex flex-col rounded-[40px] bg-white/80 backdrop-blur-md shadow-2xl border border-orange-200 p-8 overflow-hidden">
        {/* Header */}
        <div className="shrink-0 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-orange-700">
            Hello, <span className="text-orange-500">{user.userName} 👋</span>
          </h1>

          <button
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-semibold text-white shadow-lg hover:scale-105 transition"
            onClick={() => {
              navigate("/create-room");
            }}
          >
            Create Room
          </button>
        </div>

        {/* Room List */}
        <div className=" flex-1 min-h-0 overflow-y-auto scrollbar-theme rounded-3xl border-2 border-orange-200 ">
          {rooms.map((room) => (
            <div
              key={nanoid()}
              className="flex items-center justify-between px-6 py-6 border-b border-orange-200 hover:bg-orange-50 transition"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{room}</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Join the conversation
                </p>
              </div>

              <button
                className="rounded-xl bg-orange-500 px-8 py-3 text-white font-semibold shadow hover:bg-orange-600 transition"
                onClick={() => handleJoin(room)}
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
