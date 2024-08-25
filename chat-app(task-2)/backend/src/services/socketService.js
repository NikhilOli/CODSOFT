import Message from '../models/Message.js';

export const handleSocketConnection = (io) => (socket) => {
  console.log('New client connected', socket.id);

  socket.on('join', (data) => {
    socket.join(data.room);
    console.log(`Client ${socket.id} joined room: ${data.room}`);
  });

  socket.on('sendMessage', async (data) => {
    try {
      console.log('Received sendMessage event', data);
      const message = new Message({
        sender: data.sender,
        recipient: data.recipient,
        content: data.content,
        groupId: data.groupId,
      });
      await message.save();
      console.log('Message saved to database', message);
      
      io.to(data.recipient).emit('receive_message', message); // Emit only to the recipient
      console.log(`Message emitted to recipient ${data.recipient}`);


      // Emit to both sender and recipient rooms
      // io.to(data.sender).to(data.recipient).emit('message', message);
      // console.log(`Message emitted to sender ${data.sender} and recipient ${data.recipient}`);
    } catch (error) {
      console.error('Error in sendMessage:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
};