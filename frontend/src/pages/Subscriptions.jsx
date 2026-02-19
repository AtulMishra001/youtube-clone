import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";
import { MdOutlineSubscriptions } from "react-icons/md";

const Subscriptions = () => {
  const { user } = useContext(AuthContext);

  // Data States
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);

  // UI States
  const [loading, setLoading] = useState(true);
  const [selectedChannelId, setSelectedChannelId] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Run both fetches in parallel for speed
        const [videosRes, channelsRes] = await Promise.all([
          api.get("/channel/subscriptions/videos"),
          api.get("/channel/subscriptions/channels"),
        ]);
        setVideos(videosRes.data);
        const extractedChannels = channelsRes.data.map((sub) => sub.channel);
        setChannels(extractedChannels);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [user]);

  // Filter Logic: If 'all' is selected, show everything. Else, filter by channel._id
  const filteredVideos =
    selectedChannelId === "all"
      ? videos
      : videos.filter((video) => video.channelId._id === selectedChannelId);


  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <MdOutlineSubscriptions
          size={100}
          className="text-yt-text-secondary mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">Don't miss new videos</h2>
        <p className="text-yt-text-secondary">
          Sign in to see updates from your favorite YouTube channels.
        </p>
      </div>
    );
  if (loading) return <Loader />;


  return (
    <div className="px-4 py-6 text-white min-h-screen">
      {/* 1. HORIZONTAL CHANNEL LIST (The New Feature) */}
      {channels.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-4 mb-6 no-scrollbar items-center">
          {/* 'All' Filter Button */}
          <button
            onClick={() => setSelectedChannelId("all")}
            className={`shrink-0 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              selectedChannelId === "all"
                ? "bg-white text-black"
                : "bg-yt-light-gray hover:bg-yt-border text-white"
            }`}
          >
            All
          </button>

          {/* Channel Avatars */}
          {channels.map((channel) => (
            <div
              key={channel._id}
              onClick={() => setSelectedChannelId(channel._id)}
              className={`flex flex-col items-center gap-2 cursor-pointer group shrink-0 min-w-17.5 ${
                selectedChannelId === channel._id
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={channel.channelAvatar}
                alt={channel.channelName}
                className={`w-14 h-14 rounded-full object-cover border-2 transition-all ${
                  selectedChannelId === channel._id
                    ? "border-white scale-110"
                    : "border-transparent"
                }`}
              />
              <span className="text-xs text-center truncate w-20 text-yt-text-secondary group-hover:text-white transition-colors">
                {channel.channelName}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 2. VIDEO GRID */}
      <h1 className="text-xl font-bold mb-6">
        {selectedChannelId === "all" ? "Latest" : "Channel Videos"}
      </h1>

      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {filteredVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 opacity-60">
          <p>Subscribe to channels to see Videos here.</p>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
