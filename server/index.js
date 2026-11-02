import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import pasteRoutes from "./routes/pasteRoutes.js";
import { fileURLToPath } from "node:url";

// Resolve configuration relative to this file, even when launched from the repo root.
dotenv.config({ path: fileURLToPath(new URL(".env", import.meta.url)) });

// Accept the common Atlas variable name as well as the existing app setting.
const mongoUri = process.env.MONGO_URI?.trim() || process.env.MONGODB_URI?.trim();

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
      .connect(mongoUri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 30000,
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
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ success: false, message: "Database unavailable" });
  }
  res.status(200).json({ success: true, message: "API is healthy 🚀" });
});

async function startServer() {
  if (!mongoUri) {
    console.error("Missing MONGO_URI. Set it in Render > Environment (or server/.env locally). MONGODB_URI is also supported.");
    process.exitCode = 1;
    return;
  }

  try {
    await connectDB();
    const server = app.listen(PORT, "0.0.0.0");
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
  } catch (error) {
    // Do not print connection strings or credentials from driver errors.
    const cause = error.cause || error;
    if (error.code === 18 || cause.code === 18 || error.codeName === "AuthenticationFailed") {
      console.error("MongoDB authentication failed. Check the Atlas database user and URL-encode special characters in its password.");
    } else if (["ENOTFOUND", "ECONNREFUSED", "ETIMEOUT", "ETIMEDOUT"].includes(cause.code)) {
      console.error("MongoDB host is unreachable. Check the cluster hostname, cluster status, and Atlas Network Access for Render outbound IPs.");
    } else if (error.name === "MongoParseError") {
      console.error("Invalid MongoDB connection string. Set MONGO_URI to a complete mongodb:// or mongodb+srv:// URI.");
    } else {
      console.error("MongoDB connection failed. Verify MONGO_URI in Render > Environment, Atlas database credentials, and Atlas Network Access for Render outbound IPs. Localhost MongoDB is not accessible from Render.");
    }
    await mongoose.disconnect();
    process.exitCode = 1;
  }
}

startServer();
