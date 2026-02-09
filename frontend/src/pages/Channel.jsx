import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";

const Channel = () => {
  const { id } = useParams(); // Channel ID from URL
  const { user } = useContext(AuthContext);

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Videos");

  const isOwner = user?.id === channel?.owner;
    console.log(isOwner)
  useEffect(() => {
    const fetchChannelData = async () => {
      setLoading(true);
      try {
        // Fetch channel details and the channel's videos
        const [channelRes, videosRes] = await Promise.all([
          api.get(`/channel/${id}`),
          api.get(`/channel/${id}/videos`),
        ]);
        setChannel(channelRes.data);
        setVideos(videosRes.data);
      } catch (err) {
        console.error("Error fetching channel data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [id]);


  if (loading) return <Loader />;
  if (!channel)
    return <div className="text-center mt-20">Channel not found.</div>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. CHANNEL BANNER */}
      <div className="w-full h-[15vw] min-h-37.5 max-h-62.5 bg-yt-light-gray">
        {channel.channelBanner ? (
          <img
            src={channel.channelBanner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-r from-[#212121] to-[#3f3f3f]" />
        )}
      </div>

      {/* 2. CHANNEL HEADER INFO */}
      <div className="px-4 md:px-16 py-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <img
          src={channel.channelAvatar || "https://via.placeholder.com/160"}
          alt={channel.channelName}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-yt-black shadow-lg"
        />

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{channel.channelName}</h1>
          <div className="text-yt-text-secondary text-sm font-medium flex gap-2">
            <span>
              @{channel.channelName.replace(/\s+/g, "").toLowerCase()}
            </span>
            <span>•</span>
            <span>{videos.length} videos</span>
          </div>
          <p className="text-yt-text-secondary text-sm mt-1 max-w-2xl line-clamp-2">
            {channel.description}
          </p>

          <div className="flex gap-3 mt-2">
            {isOwner ? (
              <button className="bg-yt-light-gray hover:bg-yt-border text-white px-4 py-2 rounded-full text-sm font-bold transition-colors">
                Customize channel
              </button>
            ) : (
              <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-[#d9d9d9] transition-colors">
                Subscribe
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. TABS NAVIGATION */}
      <div className="px-4 md:px-16 border-b border-yt-border flex gap-8">
        {["Home", "Videos", "Playlists", "About"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold transition-all border-b-2 ${
              activeTab === tab
                ? "border-white text-white"
                : "border-transparent text-yt-text-secondary hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 4. VIDEOS GRID */}
      <div className="px-4 md:px-16 py-8">
        {activeTab === "Videos" && (
          <>
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                {videos.map((video) => (
                <VideoCard 
                    key={video._id} 
                    video={video} 
                    isOwner={isOwner} // Only show if user owns the channel
                />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-yt-text-secondary italic">
                  This channel has no videos yet.
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === "About" && (
          <div className="max-w-3xl">
            <h3 className="text-xl font-bold mb-4">Description</h3>
            <p className="whitespace-pre-wrap text-yt-text-primary leading-relaxed">
              {channel.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
