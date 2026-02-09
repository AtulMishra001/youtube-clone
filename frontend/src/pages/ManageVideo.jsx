import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import Loader from "../components/Loader";

const ManageVideo = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const categories = [
    "Music",
    "Gaming",
    "News",
    "Sports",
    "Education",
    "Tech",
    "Movie",
  ];

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { data } = await api.get(`/videos/${id}`);

        // Security Check: Redirect if user is not the owner
        if (
          data.channelId?.owner !== user?.id &&
          data.uploader !== user?.id
        ) {
          alert("You are not authorized to manage this video.");
          navigate("/");
          return;
        }

        setFormData({
          title: data.title,
          description: data.description,
          thumbnailUrl: data.thumbnailUrl,
          category: data.category || "All",
        });
      } catch (err) {
        console.error("Failed to fetch video", err);
        alert("Video not found.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchVideo();
    else navigate("/login");
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      // PDF Route: channel/video/:videoId
      await api.put(`/channel/video/${id}`, formData);
      alert("Video updated successfully!");
      navigate(`/video/${id}`); // Go back to watch the video
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to PERMANENTLY delete this video? This cannot be undone.",
      )
    ) {
      try {
        await api.delete(`/channel/video/${id}`);
        alert("Video deleted.");
        navigate(`/channel/${user._id}`); // Go back to channel
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex justify-center items-center min-h-[90vh] py-10 px-4">
      <div className="bg-yt-light-gray p-8 rounded-2xl w-full max-w-2xl border border-yt-border shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Video</h1>
          <button
            type="button"
            onClick={handleDelete}
            className="text-red-500 font-bold text-sm border border-red-500 px-4 py-2 rounded-full hover:bg-red-500/10 transition-colors"
          >
            DELETE VIDEO
          </button>
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col gap-5">
          {/* THUMBNAIL PREVIEW */}
          <div className="w-full aspect-video bg-black rounded-lg overflow-hidden mb-2 relative group">
            <img
              src={formData.thumbnailUrl}
              className="w-full h-full object-cover opacity-80"
              alt="Preview"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-black/70 px-3 py-1 rounded text-sm font-bold">
                Preview
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-yt-text-secondary">
              TITLE
            </label>
            <input
              required
              name="title"
              value={formData.title}
              className="bg-yt-black border border-yt-border rounded-lg px-4 py-3 outline-none focus:border-yt-blue text-white"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-yt-text-secondary">
              THUMBNAIL URL
            </label>
            <input
              required
              name="thumbnailUrl"
              value={formData.thumbnailUrl}
              className="bg-yt-black border border-yt-border rounded-lg px-4 py-3 outline-none focus:border-yt-blue text-white"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-yt-text-secondary">
              DESCRIPTION
            </label>
            <textarea
              required
              name="description"
              rows="5"
              value={formData.description}
              className="bg-yt-black border border-yt-border rounded-lg px-4 py-3 outline-none focus:border-yt-blue resize-none text-white"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-yt-text-secondary">
              CATEGORY
            </label>
            <select
              name="category"
              value={formData.category}
              className="bg-yt-black border border-yt-border rounded-lg px-4 py-3 outline-none focus:border-yt-blue text-white"
              onChange={handleChange}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 font-bold hover:bg-yt-border rounded-full transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="px-8 py-2 bg-yt-blue text-black font-bold rounded-full hover:bg-blue-500 disabled:opacity-50 transition-all"
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageVideo;
