import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

// For serverless deployment on Vercel, adjust imports
import { connectDB } from "../lib/db.js";
import authRoutes from "../routes/auth.route.js";
import messageRoutes from "../routes/message.route.js";
import { app, server } from "../lib/socket.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

const serverless = (req, res) => {
  app(req, res); // Express as a serverless function
};

// CORS setup
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",  // Use environment variable for flexibility
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Export for serverless handling
export default serverless;
