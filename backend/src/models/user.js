import mongoose from "mongoose";

// User Schema: Defines the structure for user data in MongoDB
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes whitespace to prevent " user" vs "user" issues
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"], // Basic regex validation
    },
    password: {
      type: String, // This will store the hashed password, not plain text
      required: true,
    },
    avatar: {
      type: String, // URL string for the profile picture
      default: "",
    },
    // Array of Channel IDs to track which channels this user owns
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
  },
  { timestamps: true }, // Automatically manages createdAt and updatedAt
);

export const User = mongoose.model("User", userSchema);
