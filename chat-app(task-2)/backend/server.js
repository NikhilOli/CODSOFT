import app from './src/app.js';
import { createServer } from 'http';
// import { setupSocket } from './src/config/socket.js';
import { connectDB } from './src/config/database.js';
import 'dotenv/config';

const server = createServer(app);
const PORT = process.env.PORT || 4000;

// setupSocket(server);
connectDB();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});