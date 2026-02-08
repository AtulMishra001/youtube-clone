import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addComment,
  getVideoComments,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

// Public: Anyone can see the comments on a video
router.get("/:videoId", getVideoComments);

// Protected: Users must be logged in to post, edit, or delete
router.post("/", protect, addComment);
router.put("/:commentId", protect, updateComment);
router.delete("/:commentId", protect, deleteComment);

export default router;
