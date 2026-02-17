import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { PiShareFatThin } from "react-icons/pi";
import { AuthContext } from "../context/AuthContext";
import { format } from "timeago.js";
import api from "../utils/axios";
import Loader from "../components/Loader";
import VideoCard from "../components/VideoCard";
import CommentSection from "../components/CommentSection"; // Ensure you have this component

const VideoDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [video, setVideo] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Interaction States
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Video Data & Recommendations
        const [videoRes, recsRes] = await Promise.all([
          api.get(`/videos/${id}`),
          api.get("/videos"), // Fetching all videos for recommendations
        ]);

        const videoData = videoRes.data;
        setVideo(videoData);
        setLikesCount(videoData.likes?.length || 0);

        // Handle subscriber count safely
        setSubscribersCount(videoData.channelId?.subscribers || 0);

        // Filter out current video from recommendations
        setRecommendations(recsRes.data.filter((v) => v._id !== id));

        // 2. Sync User Interaction States (Like, Dislike, Subscribe)
        if (user && videoData) {
          // Like/Dislike Status
          setIsLiked(videoData.likes?.includes(user.id));
          setIsDisliked(videoData.dislikes?.includes(user.id));

          // Subscribe Status (using the route we created earlier)
          try {
            const subRes = await api.get(
              `/channel/subscribe-status/${videoData.channelId._id}`,
            );
            setIsSubscribed(subRes.data.subscribed);
          } catch (err) {
            console.error("Failed to fetch subscription status", err);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  // --- HANDLERS ---

  const handleLike = async () => {
    if (!user) return alert("Please login to like videos");
    try {
      const { data } = await api.put(`/videos/${id}/like`);
      setIsLiked(data.isLiked);
      setIsDisliked(false);
      setLikesCount(data.likesCount);
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const handleDislike = async () => {
    if (!user) return alert("Please login to dislike videos");
    try {
      const { data } = await api.put(`/videos/${id}/dislike`);
      setIsDisliked(data.isDisliked);
      if (data.isDisliked && isLiked) setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } catch (err) {
      console.error("Dislike failed", err);
    }
  };

  const handleSubscribe = async () => {
    if (!user) return alert("Please login to subscribe");

    // Prevent subscribing to your own channel
    if (video.channelId.owner === user._id) {
      return alert("You cannot subscribe to your own channel");
    }

    try {
      const { data } = await api.get(
        `channel/togelSubscription/${video.channelId._id}`,
      );
      console.log(data)
      setIsSubscribed(data.subscribed);

      // Optimistically update subscriber count on UI
      if (data.subscribed) {
        setSubscribersCount((prev) => prev + 1);
      } else {
        setSubscribersCount((prev) => prev - 1);
      }
    } catch (err) {
      console.error("Subscribe failed", err);
      alert("Failed to update subscription");
    }
  };

  if (loading) return <Loader />;
  if (!video)
    return <div className="text-center mt-10 text-white">Video not found.</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-6 min-h-screen bg-yt-black text-white">
      {/* LEFT SECTION: Player, Info, Comments */}
      <div className="flex-1">
        {/* Video Player */}
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-lg border border-yt-border">
          <video
            src={video.videoUrl}
            controls
            autoPlay
            controlsList="nodownload"
            className="w-full h-full object-contain"
          />
        </div>

        <h1 className="text-xl font-bold mt-4 line-clamp-2">{video.title}</h1>

        {/* Channel & Buttons Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3">
          {/* Channel Info & Subscribe */}
          <div className="flex items-center gap-3">
            <img
              src={
                video.channelId?.channelAvatar ||
                "https://via.placeholder.com/40"
              }
              className="w-10 h-10 rounded-full object-cover border border-yt-border"
              alt="avatar"
            />
            <div className="flex flex-col">
              <span className="font-bold text-base">
                {video.channelId?.channelName}
              </span>
              <span className="text-yt-text-secondary text-xs">
                {subscribersCount} subscribers
              </span>
            </div>

            <button
              onClick={handleSubscribe}
              className={`ml-4 px-4 py-2 rounded-full font-bold text-sm transition-colors ${
                isSubscribed
                  ? "bg-yt-light-gray text-white hover:bg-yt-border" // Subscribed State (Grey)
                  : "bg-white text-black hover:bg-[#d9d9d9]" // Unsubscribed State (White)
              }`}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          {/* Actions: Like, Dislike, Share */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-yt-light-gray rounded-full">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-4 py-2 hover:bg-yt-border rounded-l-full border-r border-yt-border transition-colors"
              >
                {isLiked ? (
                  <AiFillLike size={22} />
                ) : (
                  <AiOutlineLike size={22} />
                )}
                <span className="text-sm font-medium">{likesCount}</span>
              </button>
              <button
                onClick={handleDislike}
                className="px-4 py-2 hover:bg-yt-border rounded-r-full transition-colors"
              >
                {isDisliked ? (
                  <AiFillDislike size={22} />
                ) : (
                  <AiOutlineDislike size={22} />
                )}
              </button>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied!");
              }}
              className="flex items-center gap-2 bg-yt-light-gray px-4 py-2 rounded-full hover:bg-yt-border transition-colors"
            >
              <PiShareFatThin size={22} />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
        </div>

        {/* Description Box */}
        <div className="bg-yt-light-gray mt-4 p-3 rounded-xl text-sm cursor-pointer hover:bg-yt-border transition-colors">
          <div className="flex gap-2 font-bold mb-1">
            <span>{video.views?.toLocaleString()} views</span>
            <span>{format(video.createdAt)}</span>
          </div>
          <p className="whitespace-pre-wrap">{video.description}</p>
        </div>

        {/* Comment Section (Make sure you have this component) */}
        <div className="mt-6">
          <CommentSection videoId={video._id} />
        </div>
      </div>

      {/* RIGHT SECTION: Recommendations */}
      <div className="lg:w-100 flex flex-col gap-4">
        {recommendations.map((rec) => (
          <VideoCard key={rec._id} video={rec} horizontal={true} />
        ))}
      </div>
    </div>
  );
};

export default VideoDetail;
