import { Router } from "express";
import { getVideoById, getAllVideos } from "../controllers/videoController.js";
import { protect } from "../middleware/authMiddleware.js";
import { likeVideo, dislikeVideo } from "../controllers/videoController.js";

const router = Router();
/**
 * Public routes for viewing content.
 * These do not require the 'protect' middleware because 
 * any user (logged in or guest) should be able to watch videos.
*/
router.get("/", getAllVideos); // GET /api/videos?category=Tech
router.get("/:id", getVideoById); // GET /api/videos/123
// Users must be logged in to interact with likes/dislikes
router.put("/:videoId/like", protect, likeVideo);
router.put("/:videoId/dislike", protect, dislikeVideo);

export default router;