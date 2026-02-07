import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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


/**
 * Handles user login and JWT generation.
 * I am implementing JWT-based authentication to ensure stateless and secure 
 * access to protected routes as per the project requirements.
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // --- STEP 1: INPUT VALIDATION ---
    // Providing specific feedback if login fields are missing.
    if (!email) {
      return res.status(400).json({ message: "Email is required to log in." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required to log in." });
    }

    // --- STEP 2: USER VERIFICATION ---
    // Finding the user by email to verify if the account exists.
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    // --- STEP 3: PASSWORD COMPARISON ---
    // Using bcrypt.compare to check the provided password against the hashed one in the DB.
    // This ensures we never handle or compare plain-text passwords directly.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials. Please check your password." });
    }

    // --- STEP 4: JWT GENERATION ---
    // If credentials are valid, I generate a JWT signed with a secret key.
    // The payload includes the user ID so we can identify the user in subsequent requests.
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" } // Token expires in 7 days
    );

    // --- STEP 5: SUCCESSFUL RESPONSE ---
    // Sending the token and user details (excluding password) back to the frontend.
    res.status(200).json({
      message: `Welcome back, ${user.username}!`,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error during login", error: error.message });
  }
};
