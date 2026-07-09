import React from 'react'
import { Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Rooms from '../pages/Rooms'
import ChatRoom from '../pages/ChatRoom'
import CreateRoom from '../pages/CreateRoom'

function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/chat-room/:roomName' element={<ChatRoom />} />
        <Route path='/create-room' element={<CreateRoom />} />
    </Routes>
  )
}

export default AppRouter