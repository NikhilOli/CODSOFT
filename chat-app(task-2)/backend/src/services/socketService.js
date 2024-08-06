import Message from '../models/Message.js';

export const handleSocketConnection = (socket) => {
  console.log('New client connected');

  socket.on('join', (data) => {
    socket.join(data.room);
  });

  socket.on('sendMessage', async (data) => {
    try {
      const message = new Message({
        sender: data.sender,
        recipient: data.recipient,
        content: data.content,
        groupId: data.groupId,
      });
      await message.save();
      socket.to(data.room).emit('message', message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
};