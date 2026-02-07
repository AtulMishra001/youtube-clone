import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

/**
 * This middleware acts as a security layer for protected routes.
 * I am using it to verify the JWT sent from the frontend to ensure
 * that the requester is an authenticated user.
 */
export const protect = async (req, res, next) => {
  let token;

  // Checking if the token exists in the Authorization header and starts with 'Bearer'
  // This is the industry standard format for sending JWTs.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extracting the token from the "Bearer <token>" string
      token = req.headers.authorization.split(" ")[1];

      // Decoding and verifying the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetching the user from the database using the ID stored in the token payload.
      // I am excluding the password from the fetched data for security reasons.
      req.user = await User.findById(decoded.id).select("-password");

      // Moving to the next middleware or controller function
      next();
    } catch (error) {
      console.error("Not authorized, token failed", error);
      res
        .status(401)
        .json({ message: "Not authorized, session expired or invalid token." });
    }
  }

  // If no token is found in the header
  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
  }
};
