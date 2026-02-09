import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import CommentItem from "./CommentItem";
import Loader from "./Loader"; // Optional: if you want a small spinner for comments

const CommentSection = ({ videoId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  // I am now fetching comments specifically for this videoId 
  // since they aren't part of the video object itself.
  const fetchComments = async () => {
    try {
      const { data } = await api.get(`/comment/${videoId}`);
      setComments(data);
    } catch (err) {
      console.error("Error loading comments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchComments();
    }
  }, [videoId]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      // Sending videoId in the body so the backend knows where it belongs
      await api.post(`/comment`, { text: newComment, videoId });
      setNewComment("");
      fetchComments(); // Refresh list after posting
    } catch (err) {
      console.error("Post failed", err);
    }
  };

  if (loading) return <div className="py-4 text-sm text-yt-text-secondary">Loading comments...</div>;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-6">{comments.length} Comments</h3>

      {/* ADD COMMENT INPUT */}
      {user ? (
        <div className="flex gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
            {user.username?.charAt(0).toUpperCase()}
          </div>
          <form onSubmit={handlePost} className="flex-1 flex flex-col gap-2">
            <input 
              placeholder="Add a comment..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="bg-transparent border-b border-yt-border outline-none focus:border-yt-text-primary py-1 text-sm transition-colors text-white"
            />
            {newComment && (
              <div className="flex justify-end gap-3 mt-1">
                <button type="button" onClick={() => setNewComment("")} className="text-sm font-bold px-4 py-2 hover:bg-yt-light-gray rounded-full transition-colors">Cancel</button>
                <button className="text-sm font-bold px-4 py-2 bg-yt-blue text-black rounded-full transition-colors">Comment</button>
              </div>
            )}
          </form>
        </div>
      ) : (
        <p className="text-sm text-yt-text-secondary mb-8 underline cursor-pointer" onClick={() => navigate("/login")}>
          Sign in to add a comment.
        </p>
      )}

      {/* LIST OF COMMENTS */}
      <div className="flex flex-col">
        {comments.map((comment) => (
          <CommentItem 
            key={comment._id} 
            comment={comment} 
            videoId={videoId} 
            refreshComments={fetchComments} 
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;