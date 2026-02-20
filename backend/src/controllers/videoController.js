import { Video } from "../models/Video.js";
import { Channel } from "../models/Channel.js";
/**
 * Fetch all videos for the Home Page.
 * I've implemented dynamic filtering by category and title search
 * api/videos/
 */
export const getAllVideos = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // FEATURE: Filtering by category (e.g., Music, Gaming)
    // This allows the "Filter Buttons" on the frontend to work dynamically.
    if (category && category !== "All") {
      query.category = { $regex: `^${category}$`, $options: "i" };
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
 * api/videos/:id
 */
export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id).populate(
      "channelId",
      "channelName subscribers channelAvatar owner",
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

/**
 * Uploads a new video 
 * I am automatically linking the video to the logged-in user's channel 
 * to ensure data consistency.
 * api/videos/:channelId
 */
export const addVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, category, channelId } = req.body;

    // 1. Basic Validation
    if (!title) {
      return res.status(400).json({ message: "Title required." });
    }else if(!videoUrl){
      return res.status(400).json({ message: "Video URL is required." });
    }else if(!thumbnailUrl) {
      return res.status(400).json({ message: "Thumbnail URL is required." });
    }else if(!category) {
      return res.status(400).json({ message: "Category is required." });
    }

    // 2. Find the Channel
    // If frontend sends channelId, use it. Otherwise, find the user's first channel.
    let targetChannel;
    
    if (channelId) {
      targetChannel = await Channel.findById(channelId);
    } else {
      targetChannel = await Channel.findOne({ owner: req.user._id });
    }

    if (!targetChannel) {
      return res.status(400).json({ 
        message: "You must create a channel before uploading a video." 
      });
    }

    // 3. Verify Ownership (Security)
    // Ensure the logged-in user actually owns the channel they are uploading to
    if (targetChannel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to upload to this channel." });
    }

    // 4. Create Video Document
    const newVideo = await Video.create({
      channelId: targetChannel._id, // The channel it belongs to
      uploader: req.user._id,
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
    });

    // 5. Update Channel's Video List
    // We push the new video ID into the Channel's 'videos' array
    targetChannel.videos.push(newVideo._id);
    await targetChannel.save();

    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ message: "Error uploading video", error: error.message });
  }
};

/**
 * Logic to handle video likes.
 * I have implemented this to be mutually exclusive: if a user likes a video,
 * any existing dislike from that user is automatically removed.
 * api/videos/:videoId/like
 */
export const likeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user._id; // From authMiddleware

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // Check if user has already liked the video (Toggle functionality)
    const isLiked = video.likes.includes(userId);

    if (isLiked) {
      // If already liked, clicking again removes the like
      video.likes = video.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      // Add like and ensure the user is removed from dislikes
      video.likes.push(userId);
      video.dislikes = video.dislikes.filter((id) => id.toString() !== userId.toString());
    }

    await video.save();
    res.status(200).json({ 
      likesCount: video.likes.length, 
      dislikesCount: video.dislikes.length,
      isLiked: !isLiked 
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing like", error: error.message });
  }
};

/**
 * Logic to handle video dislikes.
 * Similar to the like logic, this ensures that a user cannot 
 * simultaneously like and dislike a video.
 * api/videos/:videoId/dislike
 */
export const dislikeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user._id;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const isDisliked = video.dislikes.includes(userId);

    if (isDisliked) {
      video.dislikes = video.dislikes.filter((id) => id.toString() !== userId.toString());
    } else {
      video.dislikes.push(userId);
      video.likes = video.likes.filter((id) => id.toString() !== userId.toString());
    }

    await video.save();
    res.status(200).json({ 
      likesCount: video.likes.length, 
      dislikesCount: video.dislikes.length,
      isDisliked: !isDisliked 
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing dislike", error: error.message });
  }
};