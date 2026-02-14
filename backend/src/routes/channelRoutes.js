import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createChannel,
  getChannelVideos,
  updateVideo,
  deleteVideo,
  getChannel,
  getMyChannels,
  toggleSubscription,
  getSubscribedVideos,
  checkSubscriptionStatus,
} from "../controllers/channelController.js";

const router = express.Router();
// Protected: Only signed-in users can request
router.get("/my-channels", protect, getMyChannels);
router.get("/subscriptions/videos", protect, getSubscribedVideos); //For the subscription Page
router.get("/subscribe-status/:channelId", protect, checkSubscriptionStatus); // For subscribe Button
// Public: View videos of a specific channel
router.get("/:channelId/videos", getChannelVideos);
router.get("/:channelId", getChannel)
// Protected: Only signed-in users can manage channels and videos
router.post("/create", protect, createChannel);
router.put("/video/:videoId", protect, updateVideo); // Update logic
router.delete("/video/:videoId", protect, deleteVideo); // Delete logic

export default router;
