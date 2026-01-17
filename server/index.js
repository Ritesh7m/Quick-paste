import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import pasteRoutes from "./routes/pasteRoutes.js";

dotenv.config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json({ limit: "10mb" }));

/* MongoDB connection (cached for serverless) */
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

connectDB();

/* Routes */
app.use("/api/pastes", pasteRoutes);

/* Health check (VERY IMPORTANT) */
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is healthy 🚀" });
});

/* ❌ DO NOT use app.listen() on Vercel */
export default app;
