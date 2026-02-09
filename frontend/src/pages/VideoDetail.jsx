import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";
import { format } from "timeago.js";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { PiShareFatThin } from "react-icons/pi";
import Loader from "../components/Loader";
import VideoCard from "../components/VideoCard";

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);
      try {
        // Fetch single video details and recommendations simultaneously
        const [videoRes, recsRes] = await Promise.all([
          api.get(`/videos/${id}`),
          api.get("/videos"), // Simplified recommendation: fetching all for now
        ]);
        setVideo(videoRes.data);
        setRecommendations(recsRes.data.filter((v) => v._id !== id));
      } catch (error) {
        console.error("Error loading video details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoData();
  }, [id]);

  if (loading) return <Loader />;
  if (!video) return <div className="text-center mt-10">Video not found.</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-2 md:px-6 py-4">
      {/* LEFT SECTION: Player, Info, and Comments */}
      <div className="flex-1">
        {/* VIDEO PLAYER */}
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-lg">
          <video
            src={video.videoUrl}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        </div>

        {/* VIDEO TITLE */}
        <h1 className="text-xl font-bold mt-4 line-clamp-2">{video.title}</h1>

        {/* ACTION BAR: Channel Info & Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3">
          <div className="flex items-center gap-3">
            <img
              src={video.channelId?.channelAvatar}
              className="w-10 h-10 rounded-full object-cover"
              alt="avatar"
            />
            <div className="flex flex-col">
              <span className="font-bold text-base">
                {video.channelId?.channelName}
              </span>
              <span className="text-yt-text-secondary text-xs">
                1.2M subscribers
              </span>
            </div>
            <button className="ml-4 bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-[#d9d9d9] transition-colors">
              Subscribe
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* LIKE/DISLIKE GROUP */}
            <div className="flex items-center bg-yt-light-gray rounded-full">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-yt-border rounded-l-full border-r border-yt-border transition-colors">
                <AiOutlineLike size={22} />
                <span className="text-sm font-medium">
                  {video.likes?.length || 0}
                </span>
              </button>
              <button className="px-4 py-2 hover:bg-yt-border rounded-r-full transition-colors">
                <AiOutlineDislike size={22} />
              </button>
            </div>
            {/* SHARE BUTTON */}
            <button className="flex items-center gap-2 bg-yt-light-gray px-4 py-2 rounded-full hover:bg-yt-border transition-colors">
              <PiShareFatThin size={22} />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
        </div>

        {/* DESCRIPTION BOX */}
        <div
          className="bg-yt-light-gray mt-4 p-3 rounded-xl cursor-pointer hover:bg-[#323232] transition-colors"
          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
        >
          <div className="flex gap-2 text-sm font-bold">
            <span>{video.views?.toLocaleString()} views</span>
            <span>{format(video.createdAt)}</span>
          </div>
          <pre
            className={`mt-1 text-sm whitespace-pre-wrap font-sans ${!isDescriptionExpanded && "line-clamp-2"}`}
          >
            {video.description}
          </pre>
          <button className="text-sm font-bold mt-1">
            {isDescriptionExpanded ? "Show less" : "...more"}
          </button>
        </div>

        {/* COMMENT SECTION (Placeholder for next step) */}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">
            {video.comments?.length || 0} Comments
          </h3>
          {/* We will build the CommentList component here next */}
        </div>
      </div>

      {/* RIGHT SECTION: Recommendations */}
      <div className="lg:w-100 flex flex-col gap-4">
        <h4 className="font-bold text-sm mb-1">Up next</h4>
        {recommendations.map((rec) => (
          <VideoCard key={rec._id} video={rec} horizontal={true} />
        ))}
      </div>
    </div>
  );
};

export default VideoDetail;
