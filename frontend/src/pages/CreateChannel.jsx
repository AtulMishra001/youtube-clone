import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const CreateChannel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    channelName: "",
    description: "",
    channelAvatar: "", // Stores the URL string
    channelBanner: "", // Stores the URL string
  });
  const [loading, setLoading] = useState(false);

  // SECURITY CHECK: Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/channel/create", formData);

      alert("Channel created successfully!");
      navigate(`/channel/${response.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create channel");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 py-8">
      <div className="bg-yt-light-gray p-8 rounded-2xl w-full max-w-lg border border-yt-border shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-2">
          Create your channel
        </h1>
        <p className="text-yt-text-secondary text-sm text-center mb-8">
          Enter your channel details and paste image URLs to get started.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* AVATAR PREVIEW & INPUT */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-full bg-yt-black border-2 border-yt-border overflow-hidden flex items-center justify-center">
              {formData.channelAvatar ? (
                <img
                  src={formData.channelAvatar}
                  className="w-full h-full object-cover"
                  alt="Avatar Preview"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : (
                <span className="text-3xl font-bold text-yt-text-secondary">
                  {user.username?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <input
              type="text"
              name="channelAvatar"
              placeholder="Paste Avatar Image URL..."
              value={formData.channelAvatar}
              onChange={handleChange}
              className="w-full bg-yt-black border border-yt-border rounded px-3 py-2 text-sm outline-none focus:border-yt-blue transition-colors text-white"
            />
          </div>

          {/* BANNER PREVIEW & INPUT */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-yt-text-secondary ml-1">
              BANNER IMAGE URL
            </label>
            {/* Small Banner Preview */}
            {formData.channelBanner && (
              <div className="w-full h-16 bg-yt-black rounded overflow-hidden mb-1">
                <img
                  src={formData.channelBanner}
                  className="w-full h-full object-cover"
                  alt="Banner Preview"
                />
              </div>
            )}
            <input
              type="text"
              name="channelBanner"
              placeholder="Paste Banner Image URL..."
              value={formData.channelBanner}
              onChange={handleChange}
              className="bg-yt-black border border-yt-border rounded px-3 py-2 text-sm outline-none focus:border-yt-blue transition-colors text-white"
            />
          </div>

          {/* CHANNEL NAME */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-yt-text-secondary ml-1">
              CHANNEL NAME
            </label>
            <input
              required
              type="text"
              name="channelName"
              value={formData.channelName}
              placeholder="e.g. Coding with Atul"
              className="bg-yt-black border border-yt-border rounded px-3 py-2 outline-none focus:border-yt-blue transition-colors text-white"
              onChange={handleChange}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-yt-text-secondary ml-1">
              DESCRIPTION
            </label>
            <textarea
              required
              name="description"
              value={formData.description}
              placeholder="Tell viewers about your channel..."
              rows="3"
              className="bg-yt-black border border-yt-border rounded px-3 py-2 outline-none focus:border-yt-blue transition-colors resize-none text-white"
              onChange={handleChange}
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-2 font-bold hover:bg-yt-border rounded-full transition-colors text-yt-text-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-yt-blue text-black font-bold rounded-full hover:bg-blue-500 disabled:opacity-50 transition-all"
            >
              {loading ? "Creating..." : "Create Channel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannel;
