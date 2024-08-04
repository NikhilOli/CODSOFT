import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import "dotenv/config"
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import cors from "cors"
import bcrypt from 'bcrypt'

const app = express()
const server = new http.createServer(app)
const io = new Server(server)

app.use(cors());
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// app.get('/styles.css', (req, res) => {
//     res.setHeader('Content-Type', 'text/css');
//     res.sendFile(path.join(__dirname, 'public', 'styles.css'));
//   });
mongoose.connect('mongodb://localhost/chatapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));
// User Model
const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String
});

// Message Model
const Message = mongoose.model('Message', {
  sender: String,
  recipient: String,
  content: String,
  timestamp: Date
});

// Group Model
const Group = mongoose.model('Group', {
  name: String,
  members: [String]
});

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Registration Route
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch {
    res.status(500).send('Error registering user');
  }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        console.log('User found:', user);
        if (user == null) {
            return res.status(400).json({ message: 'Cannot find user' });
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign({ username: user.username }, 'your_jwt_secret');
            res.json({ accessToken: accessToken });
        } else {
            res.status(403).json({ message: 'Not Allowed' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (data) => {
    socket.join(data.room);
  });

  socket.on('sendMessage', async (data) => {
    const message = new Message({
      sender: data.sender,
      recipient: data.recipient,
      content: data.content,
      timestamp: new Date()
    });
    await message.save();
    io.to(data.room).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started at PORT ${process.env.PORT}`);
})