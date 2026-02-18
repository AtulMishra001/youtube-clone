import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { FaCheckCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs"; // The "kebab" menu icon

const VideoCard = ({ video, horizontal = false, isOwner = false }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const handleManageClick = (e) => {
    e.preventDefault(); // Prevent navigating to video player
    navigate(`/manage/video/${video._id}`);
  };

  return (
    <div
      className={`flex flex-col gap-2 group relative cursor-pointer`}
      onMouseLeave={() => setShowMenu(false)} // Close menu when mouse leaves card
    >
      <Link
        to={`/video/${video._id}`}
        className={`flex ${horizontal ? "flex-row gap-2" : "flex-col gap-2"}`}
      >
        {/* THUMBNAIL */}
        <div
          className={`relative flex-none ${horizontal ? "w-40 h-24" : "w-full aspect-video"}`}
        >
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className={`w-full h-full object-cover rounded-xl transition-all duration-200 
              ${!horizontal && "group-hover:rounded-none"}`}
          />
        </div>

        {/* METADATA */}
        <div className="flex gap-3 items-start pr-6 relative">
          {" "}
          {!horizontal && (
            <img
              src={
                video.channelId?.channelAvatar ||
                "https://via.placeholder.com/40"
              }
              className="w-9 h-9 rounded-full object-cover shrink-0 mt-1"
              alt="avatar"
            />
          )}
          <div className="flex flex-col w-full">
            <h3
              className={`text-yt-text-primary font-bold leading-tight line-clamp-2 
              ${horizontal ? "text-[14px]" : "text-sm"}`}
            >
              {video.title}
            </h3>

              <Link to={`/channel/${video.channelId._id}`}>
            <div className="text-yt-text-secondary text-[12px] flex items-center gap-1 mt-1">
                {video.channelId?.channelName}{" "}
                <FaCheckCircle className="text-[10px]" />
            </div>
              </Link>
            <div className="text-yt-text-secondary text-[12px]">
              {video.views?.toLocaleString()} views • {format(video.createdAt)}
            </div>
          </div>
        </div>
      </Link>

      {/* THREE DOTS MENU (Only visible to Owner) */}
      {isOwner && (
        <div className="absolute bottom-4 right-0">
          {" "}
          {/* Positioning: Bottom Right of card area */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowMenu(!showMenu);
            }}
            className="p-2 text-yt-text-primary hover:bg-yt-light-gray rounded-full transition-colors"
          >
            <BsThreeDotsVertical size={18} />
          </button>
          {/* DROPDOWN MENU */}
          {showMenu && (
            <div className="absolute right-0 bottom-full mb-2 bg-yt-light-gray border border-yt-border rounded-lg shadow-xl z-50 w-32 overflow-hidden">
              <button
                onClick={handleManageClick}
                className="w-full text-left px-4 py-3 text-sm hover:bg-yt-border text-white font-medium"
              >
                Manage Video
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoCard;
