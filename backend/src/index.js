import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

// Routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

// Setup __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config();

// MongoDB Connection
const mongoURI = process.env.MONGODB_URL || process.env.MONGODB_URI;
if (!mongoURI) {
  console.error("❌ MONGODB connection string not found in .env");
  process.exit(1);
}
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Allowed origins for CORS
const allowedOrigins = [
  "https://socialsphere0.netlify.app",
  "http://localhost:5173",
];

// Init express app and server
const app = express();
const server = http.createServer(app);

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// Online Users Tracking
let onlineUsers = new Set();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("🟢 User connected:", userId);

  if (userId) {
    onlineUsers.add(userId);
    io.emit("getOnlineUsers", Array.from(onlineUsers));
  }

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", userId);
    if (userId) {
      onlineUsers.delete(userId);
      io.emit("getOnlineUsers", Array.from(onlineUsers));
    }
  });
});

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// ✅ Simplified and safe CORS middleware for Express
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
