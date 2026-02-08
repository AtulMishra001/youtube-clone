import { Comment } from "../models/Comment.js";

/**
 * Adds a new comment to a specific video.
 * I am linking the comment to both the Video and the User who is currently
 * logged in, as per the project's data handling requirements.
 */
export const addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text cannot be empty." });
    }

    const newComment = await Comment.create({
      videoId,
      userId: req.user._id, // Set by our 'protect' middleware
      text,
    });

    // Populate the user details so the frontend can immediately display
    // the commenter's name and avatar.
    await newComment.populate("userId", "username avatar");

    res.status(201).json(newComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
};

/**
 * Fetches all comments for a specific video.
 * I am sorting these by the newest first and populating user info
 * to provide a complete comment section UI
 */
export const getVideoComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await Comment.find({ videoId })
      .populate("userId", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
};

/**
 * Updates a comment's text.
 * I've implemented a security check to ensure that a user can only
 * edit their own comments
 */
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    // SECURITY: Verifying ownership
    if (comment.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this comment." });
    }

    comment.text = text;
    await comment.save();

    res.status(200).json({ message: "Comment updated successfully.", comment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating comment", error: error.message });
  }
};

/**
 * Deletes a comment.
 * This completes the full CRUD functionality required for the
 * video player page.
 */
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    // SECURITY: Verifying ownership before deletion
    if (comment.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment." });
    }

    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};
