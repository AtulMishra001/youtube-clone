import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    // The video this comment belongs to
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    // The user who wrote the comment
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, // Handles the comment timestamp automatically
);

export const Comment = mongoose.model.Comment || mongoose.model("Comment", commentSchema);
