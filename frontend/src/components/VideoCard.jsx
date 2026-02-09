import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { FaCheckCircle } from "react-icons/fa";

const VideoCard = ({ video, horizontal = false }) => {
  return (
    <Link
      to={`/video/${video._id}`}
      className={`flex ${horizontal ? "flex-row gap-2 mb-2" : "flex-col gap-2"} group cursor-pointer`}
    >
      {/* THUMBNAIL SECTION */}
      <div
        className={`relative flex-none ${horizontal ? "w-40 h-24" : "w-full aspect-video"}`}
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className={`w-full h-full object-cover rounded-xl transition-all duration-200 
            ${!horizontal && "group-hover:rounded-none"}`}
        />
        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1 rounded">
          10:00
        </span>
      </div>

      {/* METADATA SECTION */}
      <div className={`flex gap-3 ${horizontal ? "gap-1" : "mt-1"}`}>
        {/* Hide Avatar in Horizontal/Sidebar view to match real YouTube */}
        {!horizontal && (
          <div className="flex-none">
            <img
              src={
                video.channelId?.channelAvatar ||
                "https://via.placeholder.com/40"
              }
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-col overflow-hidden">
          {/* Title - Smaller text for sidebar (horizontal) */}
          <h3
            className={`text-yt-text-primary font-bold leading-tight line-clamp-2 group-hover:text-white
            ${horizontal ? "text-[14px] mb-1" : "text-sm"}`}
          >
            {video.title}
          </h3>

          {/* Channel Name */}
          <div className="text-yt-text-secondary text-[12px] flex items-center gap-1 mt-0.5 hover:text-white">
            {video.channelId?.channelName}
            <FaCheckCircle className="text-[10px]" />
          </div>

          {/* Views & Time */}
          <div className="text-yt-text-secondary text-[12px]">
            <span>{video.views?.toLocaleString()} views</span>
            <span className="mx-1">•</span>
            <span>{format(video.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
