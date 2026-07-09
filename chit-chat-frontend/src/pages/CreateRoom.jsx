import React, { useContext, useState } from 'react'
import { ChatContext } from '../contex/chatContext';
import { useNavigate } from 'react-router-dom';

function CreateRoom() {
    const {socket , user} = useContext(ChatContext);
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState("");
    const [description, setDescription] = useState("");

    const handleCreate = () => {
        if(socket.current.readyState === WebSocket.OPEN){
            socket.current.send(JSON.stringify({
                "type":"join",
                "roomName":roomName,
                "userName":user.userName
            }))
        }
        navigate(`/chat-room/${roomName}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-200 flex items-center justify-center px-4">

            <div className="w-full max-w-md rounded-[35px] bg-white/80 backdrop-blur-md border border-orange-200 shadow-2xl p-8">

                <h1 className="text-3xl font-bold text-center text-orange-700 mb-8">
                    Create Room
                </h1>

                <div className="space-y-6">

                    {/* Room Name */}
                    <input
                        type="text"
                        placeholder="Enter room name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="w-full rounded-xl border-2 border-orange-200 bg-orange-50 px-5 py-3 outline-none transition duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                    />

                    {/* Description */}
                    <textarea
                        rows={5}
                        placeholder="Room description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full resize-none rounded-xl border-2 border-orange-200 bg-orange-50 px-5 py-3 outline-none transition duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                    />

                    {/* Button */}
                    <button
                        onClick={handleCreate}
                        className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3 font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-orange-300 active:scale-95"
                    >
                        Create Room
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CreateRoom