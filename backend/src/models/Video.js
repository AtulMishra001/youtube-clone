import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true, // Essential for the filter functionality on the Home Page
      enum: ["Music", "Gaming", "News", "Sports", "Education", "Tech"], // Restricting to specific categories
    },
    // Reference to the Channel that uploaded this video
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
    // Reference to the User who uploaded the video (redundant but useful for quick access)
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // This automatically adds 'createdAt' which serves as the Upload Date
  },
);

export const Video = mongoose.model("Video", videoSchema);
