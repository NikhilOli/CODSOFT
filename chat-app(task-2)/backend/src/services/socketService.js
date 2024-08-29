let activeUsers = [];
console.log("These are active users",activeUsers);


const addUser = (userId, socketId) => {
  if (!activeUsers.some(user => user.userId === userId)) {
    activeUsers.push({ userId, socketId });
  } else {
    const existingUser = activeUsers.find(user => user.userId === userId);
    existingUser.socketId = socketId;
  }
};

const removeUser = (socketId) => {
  const userToRemove = activeUsers.find(user => user.socketId === socketId);
  if (userToRemove) {
    activeUsers = activeUsers.filter(user => user.socketId !== socketId);
    return userToRemove.userId; 
  }
  return null; 
};

const getUsers = () => {
  return activeUsers.map(user => user.userId);
};

export const handleSocketConnection = (io) => (socket) => {
  console.log('New client connected', socket.id);

  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);

    io.emit('onlineUsers', getUsers());
  });

  socket.on('sendMessage', async (data) => {
    try {
      console.log('Received sendMessage event', data);
      const { senderId, receiverId, text, chatId } = data;

      const message = {
        chatId,
        senderId,
        text,
        _id: data._id,  
        createdAt: data.createdAt,  
      };

      // Broadcast the saved message to the chat room
      io.to(chatId).emit('receiveMessage', message);
      console.log(`Message broadcasted to chat room ${chatId}`);

    } catch (error) {
      console.error('Error in sendMessage:', error);
    }
  });

  socket.on('join', (data) => {
    socket.join(data.room);
    console.log(`Client ${socket.id} joined room: ${data.room}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
    const userId = removeUser(socket.id);
    if (userId) {
      io.emit('onlineUsers', getUsers());
    }
  });
};
