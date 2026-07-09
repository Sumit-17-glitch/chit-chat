import React, { useContext, useState } from 'react'
import { ChatContext } from '../contex/chatContext';
import { useNavigate } from 'react-router-dom';


export default function Home() {
    const navigate = useNavigate();
    const [inputUserName, setInputUserName] = useState("");
    const { user } = useContext(ChatContext);
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-200 flex items-center justify-center px-6">

            <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-orange-200 p-8">

                {/* Logo */}
                <div className="flex justify-center mb-5">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg">
                        <span className="text-3xl">💬</span>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-center text-orange-700">
                    Welcome to Chit-Chat
                </h1>

                <p className="mt-4 text-center text-gray-600 leading-relaxed">
                    This place is only for fun.
                    <br />
                    Be kind and enjoy chatting with everyone.
                </p>

                {/* Username */}
                <div className="mt-8">

                    <input
                        type="text"
                        placeholder="Enter your username"
                        className="w-full rounded-xl border-2 border-orange-200 bg-orange-50 px-4 py-3 outline-none transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                        value={inputUserName}
                        onChange={(e) => setInputUserName(e.target.value)}
                    />

                    <button
                        className="mt-6 w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-orange-300 active:scale-95"
                        onClick={() => {
                            if(inputUserName === ""){
                                alert("Enter valid userName");  
                                return;                              
                            }
                            user.setUserName(inputUserName);
                            navigate('/rooms');
                        }}
                    >
                        Enter Chat
                    </button>

                </div>

            </div>

        </div>
    );
}
