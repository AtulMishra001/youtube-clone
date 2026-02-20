import { useState, useContext } from "react";
import { format } from "timeago.js";
import { AuthContext } from "../context/AuthContext";
import { HiDotsVertical } from "react-icons/hi";
import api from "../utils/axios";

const CommentItem = ({ comment, videoId, refreshComments }) => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [showOptions, setShowOptions] = useState(false);

  const isOwner = user?.id === comment.userId?._id;

  // Helper to safely get the initial
  const username = comment.userId?.username || "User";
  const avatar = comment.userId?.channelAvatar;
  const firstChar = username.charAt(0).toUpperCase();

  const handleDelete = async () => {
    if (window.confirm("Delete this comment?")) {
      try {
        await api.delete(`/comment/${comment._id}`);
        refreshComments();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };
  // deletes a comment
  const handleUpdate = async () => {
    try {
      await api.put(`/comment/${comment._id}`, { text: editedText });
      setIsEditing(false);
      refreshComments();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="flex gap-3 my-4 group relative">
      {/* AVATAR LOGIC: Image or Initial */}
      {avatar ? (
        <img
          src={avatar}
          className="w-10 h-10 rounded-full object-cover shrink-0"
          alt={username}
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
          {firstChar}
        </div>
      )}

      <div className="flex-1">
        {/* User Info & Time */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-bold text-white">{username}</span>
          <span className="text-xs text-yt-text-secondary">
            {format(comment.createdAt)}
          </span>
        </div>

        {/* Edit Mode vs View Mode */}
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <input
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="bg-transparent border-b border-yt-text-primary outline-none text-sm py-1 w-full text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="text-xs font-bold px-3 py-1 hover:bg-yt-light-gray rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="text-xs font-bold px-3 py-1 bg-yt-blue text-black rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-yt-text-primary leading-relaxed">
            {comment.text}
          </p>
        )}
      </div>

      {/* OPTIONS MENU (Only for owner) */}
      {isOwner && !isEditing && (
        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 hover:bg-yt-light-gray rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <HiDotsVertical className="text-white" />
          </button>

          {showOptions && (
            <div className="absolute right-0 top-8 bg-yt-light-gray border border-yt-border rounded-lg shadow-xl z-10 py-1 w-24">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowOptions(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-yt-border text-white"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-sm hover:bg-yt-border text-red-400"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
