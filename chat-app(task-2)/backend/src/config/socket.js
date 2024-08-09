import { Server } from 'socket.io';
import { handleSocketConnection } from '../services/socketService.js';
import cors from 'cors'

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on('connection', handleSocketConnection);
};