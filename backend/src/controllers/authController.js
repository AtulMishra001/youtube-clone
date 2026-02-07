import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

/**
 * Handles user registration with validation.
 * I've implemented specific error messages for each field to ensure
 * the frontend can provide precise feedback to the user.
 */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // --- STEP 1: INDIVIDUAL FIELD VALIDATION ---
    // Checking each field separately as per best practices for user feedback
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    // --- STEP 2: CHECKING FOR EXISTING USER  ---
    // Instead of a generic "user exists" message, I check email and username
    // individually to let the user know exactly which credential is taken.

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .json({
          message: "This email is already registered. Please use another one.",
        });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res
        .status(400)
        .json({
          message:
            "This username is already taken. Please choose a different one.",
        });
    }

    // --- STEP 3: PASSWORD HASHING ---
    // Using bcrypt to hash the password for security.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // --- STEP 4: DATABASE PERSISTENCE ---
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar: "", // Handled as an empty string; frontend will provide the fallback asset
    });

    if (newUser) {
      // Per instructions, we return a 201 status to signal the user was created.
      // The frontend will catch this and redirect the user to the login page.
      res.status(201).json({
        message: "Registration successful! You can now log in.",
        user: {
          id: newUser._id,
          username: newUser.username,
        },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server Error: Could not complete registration",
        error: error.message,
      });
  }
};
