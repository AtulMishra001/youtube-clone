import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import { RiVideoUploadLine } from "react-icons/ri";
import Loader from "../components/Loader";

const UploadVideo = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    category: "All", // Default category
  });

  const categories = [
    "Music",
    "Gaming",
    "News",
    "Sports",
    "Education",
    "Tech",
    "Movie",
    "All",
  ];

  // 1. Fetch User's Channels on Mount
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const { data } = await api.get("/channel/my-channels");
        if (data.length === 0) {
          alert("You need to create a channel before uploading!");
          navigate("/create-channel");
        } else {
          setChannels(data);
          // Auto-select the first channel
          setSelectedChannelId(data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching channels", error);
      }
    };
    if (user) fetchChannels();
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // We send the channelId in the body AND use the URL parameter as requested
      // Route: POST /api/videos/:channelId
      const payload = {
        ...formData,
        channelId: selectedChannelId,
      };

      await api.post(`/videos/${selectedChannelId}`, payload);

      alert("Video uploaded successfully!");
      navigate(`/channel/${selectedChannelId}`); // Redirect to the channel page
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null; // Or redirect via useEffect

  return (
    <div className="min-h-screen bg-yt-black text-white pt-20 px-4 flex justify-center">
      {loading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <Loader />
        </div>
      )}

      <div className="w-full max-w-2xl bg-[#1F1F1F] p-8 rounded-xl border border-yt-border shadow-2xl">
        <div className="flex items-center gap-4 mb-6 border-b border-yt-border pb-4">
          <div className="p-3 bg-yt-light-gray rounded-full">
            <RiVideoUploadLine size={28} className="text-yt-blue" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Upload Video</h1>
            <p className="text-sm text-yt-text-secondary">
              Share your content with the world
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* CHANNEL SELECTOR */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-yt-text-secondary">
              Upload to Channel
            </label>
            <select
              value={selectedChannelId}
              onChange={(e) => setSelectedChannelId(e.target.value)}
              className="bg-yt-black border border-yt-border rounded-lg p-3 text-white focus:border-yt-blue outline-none"
            >
              {channels.map((ch) => (
                <option key={ch._id} value={ch._id}>
                  {ch.channelName}
                </option>
              ))}
            </select>
          </div>

          {/* VIDEO URL & PREVIEW */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-yt-text-secondary">
              Video URL
            </label>
            <input
              type="url"
              name="videoUrl"
              placeholder="e.g., https://www.w3schools.com/html/mov_bbb.mp4"
              value={formData.videoUrl}
              onChange={handleChange}
              required
              className="bg-yt-black border border-yt-border rounded-lg p-3 text-white focus:border-yt-blue outline-none placeholder-gray-600"
            />

            {/* LIVE VIDEO PREVIEW */}
            {formData.videoUrl && (
              <div className="mt-2 w-full aspect-video bg-black rounded-lg overflow-hidden border border-yt-border shadow-lg relative group">
                <video
                  src={formData.videoUrl}
                  controls
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Optional: Hide player if link is broken
                    e.target.style.display = "none";
                    // You could also show an error message here using state
                  }}
                />
                {/* Optional Label */}
                <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white pointer-events-none">
                  Preview
                </div>
              </div>
            )}
          </div>

          {/* THUMBNAIL URL & PREVIEW */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-yt-text-secondary">
              Thumbnail URL
            </label>
            <input
              type="url"
              name="thumbnailUrl"
              placeholder="e.g., https://example.com/image.jpg"
              value={formData.thumbnailUrl}
              onChange={handleChange}
              required
              className="bg-yt-black border border-yt-border rounded-lg p-3 text-white focus:border-yt-blue outline-none placeholder-gray-600"
            />
            {/* Live Preview of Thumbnail */}
            {formData.thumbnailUrl && (
              <div className="mt-2 w-full h-40 bg-black rounded-lg overflow-hidden border border-yt-border">
                <img
                  src={formData.thumbnailUrl}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
          </div>

          {/* TITLE */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-yt-text-secondary">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Video Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-yt-black border border-yt-border rounded-lg p-3 text-white focus:border-yt-blue outline-none"
            />
          </div>

          {/* CATEGORY */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-yt-text-secondary">
              Category
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`cursor-pointer text-center py-2 rounded-lg text-sm transition-all border ${
                    formData.category === cat
                      ? "bg-white text-black border-white font-bold"
                      : "bg-yt-black text-yt-text-secondary border-yt-border hover:bg-yt-light-gray"
                  }`}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-yt-text-secondary">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Tell viewers about your video..."
              rows="5"
              value={formData.description}
              onChange={handleChange}
              className="bg-yt-black border border-yt-border rounded-lg p-3 text-white focus:border-yt-blue outline-none resize-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-yt-blue text-black font-bold py-3 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
