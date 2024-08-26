import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.path}`);
  next();
});

app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(errorHandler);

export default app;
