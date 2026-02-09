import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createChannel,
  getChannelVideos,
  updateVideo,
  deleteVideo,
  getChannel
} from "../controllers/channelController.js";

const router = express.Router();

// Public: View videos of a specific channel
router.get("/:channelId/videos", getChannelVideos);
router.get("/:channelId", getChannel)
// Protected: Only signed-in users can manage channels and videos
router.post("/create", protect, createChannel);
router.put("/video/:videoId", protect, updateVideo); // Update logic
router.delete("/video/:videoId", protect, deleteVideo); // Delete logic

export default router;
