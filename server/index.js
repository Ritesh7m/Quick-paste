import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import pasteRoutes from "./routes/pasteRoutes.js";
import { fileURLToPath } from "node:url";

// Resolve configuration relative to this file, even when launched from the repo root.
dotenv.config({ path: fileURLToPath(new URL(".env", import.meta.url)) });

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json({ limit: "10mb" }));

/* Mongo cache */
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
      })
      .then((mongoose) => {
        console.log("MongoDB Connected");
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/* Connect DB THEN start server */
const PORT = process.env.PORT || 5000;

/* Routes */
app.use("/api/pastes", pasteRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is healthy 🚀" });
});

async function startServer() {
  if (!process.env.MONGO_URI?.trim()) {
    console.error("Missing MONGO_URI. Configure server/.env using server/.env.example.");
    process.exitCode = 1;
    return;
  }

  try {
    await connectDB();
    const server = app.listen(PORT);
    server.once("listening", () => {
      console.log(`Server running on port ${PORT}`);
    });
    server.once("error", async (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Stop the existing backend before running npm start again.`);
      } else {
        console.error(`Server could not listen (${error.code}). Check PORT in server/.env.`);
      }
      await mongoose.disconnect();
      process.exitCode = 1;
    });
  } catch {
    // Do not print connection strings or credentials from driver errors.
    console.error("MongoDB connection failed. Check MONGO_URI in server/.env and ensure MongoDB is running and reachable.");
    await mongoose.disconnect();
    process.exitCode = 1;
  }
}

startServer();
