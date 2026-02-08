import { Router } from "express";
import { getVideoById, getAllVideos } from "../controllers/videoController.js";

const router = Router();
/**
 * Public routes for viewing content.
 * These do not require the 'protect' middleware because 
 * any user (logged in or guest) should be able to watch videos.
 */
router.get("/", getAllVideos); // GET /api/videos?category=Tech
router.get("/:id", getVideoById); // GET /api/videos/123

export default router;