import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./src/config/dbConnect.js";
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

dbConnect(app);
