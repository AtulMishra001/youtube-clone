import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/axios";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Requirement: Filter buttons for categories
  const categories = ["All", "Education", "Music", "Movie", "Gaming", "Tech"];
  const currentCategory = searchParams.get("category") || "All";
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        // I am using the dynamic URL structure we built in the backend
        // to fetch videos based on both search queries and category filters.
        const response = await api.get(
          `/videos?category=${currentCategory}&search=${searchQuery}`,
        );
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [currentCategory, searchQuery]);

  const handleCategoryClick = (category) => {
    // When a category is clicked, we update the URL params.
    // This makes the filter 'shareable' and ensures the back button works.
    setSearchParams({ category });
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-4">
      {/* CATEGORY BAR: Fixed-width buttons with a horizontal scroll on mobile */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
              ${
                currentCategory === cat
                  ? "bg-yt-text-primary text-yt-black"
                  : "bg-yt-light-gray text-yt-text-primary hover:bg-yt-border"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* VIDEO GRID: Responsive columns for different screen sizes */}
      {/* I've used Tailwind's grid system to ensure the layout is perfect:
          1 column on mobile, 2 on tablets, 3 on small laptops, and 4 on large screens. */}
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mt-4">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-xl font-semibold">No videos found</h2>
          <p className="text-yt-text-secondary">
            Try searching for something else or changing categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
