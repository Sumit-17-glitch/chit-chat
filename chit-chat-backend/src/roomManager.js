const rooms = new Map();

export const joinRoom = (socket, roomName, userName) => {
    if(!rooms.has(roomName)){
        rooms.set(roomName, new Set())
    }

    const room = rooms.get(roomName);
    room.add({
        "socket": socket,
        "userName": userName
    });

    socket.room = roomName;
    console.log(`${userName} joined room`);
    
};

export const leaveRoom = (socket) => {
    const roomName = socket.room;

    if(!roomName) return;

    const room = rooms.get(roomName);

    if(!room) return;

    room.delete(socket);

    if(room.size == 0){
        rooms.delete(room);
    }

    console.log("client left..");
    
}

export const broadCastMeassage = (roomName, userName ,message) => {
    const room = rooms.get(roomName);
    if(!room) return;

    room.forEach((client) => {
        client.socket.send(JSON.stringify({userName, message}));
    });
}

export const getRooms = (socket) => {
    const currentRooms = [...rooms.keys()];
    socket.send(JSON.stringify({currentRooms}));
}


export {rooms}