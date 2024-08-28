
let activeUsers = [];

const addUser = (userId, socketId) => {
  if (!activeUsers.some(user => user.userId === userId)) {
    activeUsers.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  activeUsers = activeUsers.filter(user => user.socketId !== socketId);
};

const getUser = (userId) => {
  return activeUsers.find(user => user.userId === userId);
};

export const handleSocketConnection = (io) => (socket) => {
  console.log('New client connected', socket.id);

  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
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
    removeUser(socket.id);
  });
};
