import { Video } from "../models/video.js";

/**
 * Fetch all videos for the Home Page.
 * I've implemented dynamic filtering by category and title search
 */
export const getAllVideos = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // FEATURE: Filtering by category (e.g., Music, Gaming)
    // This allows the "Filter Buttons" on the frontend to work dynamically.
    if (category && category !== "All") {
      query.category = category;
    }

    // FEATURE: Search by title using Regex
    // The 'i' flag ensures the search is case-insensitive, improving UX.
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Fetching videos and 'populating' channel data so we can show
    // the Channel Name and Avatar on the home page grid.
    const videos = await Video.find(query)
      .populate("channelId", "channelName channelAvatar")
      .sort({ createdAt: -1 }); // Showing newest videos first

    res.status(200).json(videos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching videos", error: error.message });
  }
};

/**
 * Fetch details for a single video.
 * This is used for the Video Player page to display the title, description, and views.
 */
export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id).populate(
      "channelId",
      "channelName subscribers",
    );

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // OPTIONAL: Increment views whenever a video is opened
    video.views += 1;
    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching video details", error: error.message });
  }
};