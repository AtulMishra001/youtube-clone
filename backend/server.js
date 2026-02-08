import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoute from "./src/routes/authRoutes.js";
import videoRoute from "./src/routes/videoRoutes.js"
// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

//routes
app.use("/api/auth",authRoute);
app.use("/api/videos", videoRoute);

// Basic Route for testing
app.get("/", (req, res) => {
  res.send("YouTube Clone API is running...");
});

// connecting database
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });