import { Link } from "react-router-dom";
import { format } from "timeago.js"; // Converts timestamp to "2 days ago"
import { FaCheckCircle } from "react-icons/fa"; // Verified badge icon

const VideoCard = ({ video }) => {
  return (
    <div className="flex flex-col gap-2 cursor-pointer group">
      {/* THUMBNAIL SECTION */}
      {/* Clicking the thumbnail takes us to the video player */}
      <Link to={`/video/${video._id}`} className="relative">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-xl hover:rounded-none transition-all duration-200"
        />
        {/* Optional: Hardcoded duration badge for that authentic YouTube look */}
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
          12:45
        </span>
      </Link>

      {/* METADATA SECTION */}
      <div className="flex gap-3 items-start mt-1">
        {/* Channel Avatar (Link to Channel Page) */}
        <Link to={`/channel/${video.channelId?._id}`}>
          <img
            src={
              video.channelId?.channelAvatar || "https://via.placeholder.com/40"
            }
            alt="Channel Avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
        </Link>

        {/* Text Details */}
        <div className="flex flex-col">
          {/* Title: Truncated to 2 lines max using Tailwind's line-clamp */}
          <h3 className="text-yt-text-primary text-sm font-bold leading-tight line-clamp-2 group-hover:text-white">
            {video.title}
          </h3>

          {/* Channel Name */}
          <Link
            to={`/channel/${video.channelId?._id}`}
            className="text-yt-text-secondary text-xs mt-1 hover:text-white flex items-center gap-1"
          >
            {video.channelId?.channelName || "Unknown Channel"}
            <FaCheckCircle className="text-yt-text-secondary text-[10px]" />
          </Link>

          {/* Views & Time */}
          <div className="text-yt-text-secondary text-xs">
            <span>{video.views?.toLocaleString()} views</span>
            <span className="mx-1">•</span>
            {/* Using timeago to automatically format the createdAt date */}
            <span>{format(video.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
