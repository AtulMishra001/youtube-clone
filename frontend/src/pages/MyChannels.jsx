import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import { FaPlusSquare } from "react-icons/fa";
import Loader from "../components/Loader";

const MyChannels = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. PREVENT PREMATURE REDIRECT
    // If no user is loaded yet, but we have a token, STOP and wait.
    const token = localStorage.getItem("token");

    if (!user && !token) {
      navigate("/login");
      return;
    }

    if (!user && token) {
      // User is logging in (restoring state), wait for next render
      return;
    }

    // 2. FETCH CHANNELS (Only if user exists)
    const fetchMyChannels = async () => {
      try {
        const { data } = await api.get("/channel/my-channels"); // Try plural first (standard convention)
        setChannels(data);
      } catch (err) {
        console.error("Failed to fetch channels", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyChannels();
    }
  }, [user, navigate]);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center min-h-[80vh] py-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-8">My Channels</h1>

      {channels.length === 0 ? (
        <div className="text-center flex flex-col items-center gap-4">
          <p className="text-yt-text-secondary">
            You haven't created any channels yet.
          </p>
          <Link
            to="/create-channel"
            className="flex items-center gap-2 bg-yt-blue text-black px-6 py-2 rounded-full font-bold hover:bg-blue-500 transition-colors"
          >
            <FaPlusSquare /> Create Your First Channel
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {channels.map((channel) => (
            <Link
              to={`/channel/${channel._id}`}
              key={channel._id}
              className="bg-yt-light-gray p-6 rounded-xl flex flex-col items-center gap-4 hover:bg-yt-border transition-colors border border-transparent hover:border-yt-text-secondary group"
            >
              <img
                src={channel.channelAvatar}
                alt={channel.channelName}
                className="w-24 h-24 rounded-full object-cover border-2 border-yt-black shadow-lg group-hover:scale-105 transition-transform"
              />
              <div className="text-center">
                <h3 className="font-bold text-lg truncate w-40">
                  {channel.channelName}
                </h3>
                <p className="text-xs text-yt-text-secondary">
                  {channel.subscribers || 0} subscribers
                </p>
              </div>
              <button className="text-sm text-yt-blue font-bold mt-2">
                View Channel
              </button>
            </Link>
          ))}

          <Link
            to="/create-channel"
            className="border-2 border-dashed border-yt-text-secondary rounded-xl flex flex-col items-center justify-center gap-2 text-yt-text-secondary hover:text-white hover:border-white transition-all min-h-50"
          >
            <FaPlusSquare size={30} />
            <span className="font-bold">Create New Channel</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyChannels;
