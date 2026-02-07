import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

/**
 * Public route for user registration
 * I've separated routes into their own files to keep the code modular and scalable.
 */
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
