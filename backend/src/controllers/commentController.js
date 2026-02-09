import { Comment } from "../models/Comments.js";

// GET /api/comment/:videoId
export const getVideoComments = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .populate("userId", "username channelAvatar") // Crucial for showing avatars
      .sort({ createdAt: -1 }); // Newest comments first
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
};

// POST /api/comment
export const addComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;
    const newComment = new Comment({
      text,
      videoId,
      userId: req.user._id, // From protect middleware
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
};

// PUT /api/comment/:commentId
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Security: Check if the logged-in user owns the comment
    if (comment.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only update your own comments" });
    }

    comment.text = req.body.text;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating comment", error: error.message });
  }
};

// DELETE /api/comment/:commentId
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comments" });
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};
