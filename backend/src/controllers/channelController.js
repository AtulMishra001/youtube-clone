import { Channel } from "../models/Channel.js";
import { Video } from "../models/Video.js";
import { Subscription } from "../models/Subscription.js"
/**
 * Creates a new channel for the authenticated user.
 * I've implemented this to ensure that a user must be logged in
 * before they can establish a channel identity.
 */
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner, channelAvatar } = req.body;

    if (!channelName) {
      return res.status(400).json({ message: "Channel name is required." });
    }

    // Creating the channel and linking it to the logged-in user's ID
    const newChannel = await Channel.create({
      channelName,
      description,
      channelBanner,
      channelAvatar,
      owner: req.user._id, // Set by the 'protect' middleware
    });

    res.status(201).json(newChannel);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating channel", error: error.message });
  }
};

/**
 * Fetches all videos belonging to a specific channel.
 * This satisfies the requirement to display channel-specific content.
 */
export const getChannelVideos = async (req, res) => {
  try {
    const { channelId } = req.params;
    const videos = await Video.find({ channelId })
      .populate("channelId", "channelName channelAvatar")
      .sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching channel videos", error: error.message });
  }
};

/**
 * Updates video metadata (Title, Description, etc.).
 * I've added a security check to ensure only the uploader can edit the video.
 */
export const updateVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);

    if (!video) return res.status(404).json({ message: "Video not found" });

    // SECURITY: Verifying that the person editing is the owner
    if (video.uploader.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this video." });
    }

    const updatedVideo = await Video.findByIdAndUpdate(videoId, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Video updated successfully", updatedVideo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating video", error: error.message });
  }
};

/**
 * Deletes a video from the database.
 * This fulfills the requirement for full CRUD operations on the channel page.
 */
export const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);

    if (!video) return res.status(404).json({ message: "Video not found" });

    // SECURITY: Verifying owner before deletion
    if (video.uploader.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this video." });
    }

    await Video.findByIdAndDelete(videoId);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting video", error: error.message });
  }
};

export const getChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json(channel);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching channel details",
        error: error.message,
      });
  }
};

export const getMyChannels = async (req, res) => {
  try {
    // req.user._id comes from your 'protect' middleware
    const channels = await Channel.find({ owner: req.user._id });
    res.status(200).json(channels);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching channels", error: error.message });
  }
};


// 1. Toggle Subscribe / Unsubscribe
export const toggleSubscription = async (req, res) => {
  try {
    const { channelId } = req.params;
    const userId = req.user._id;

    const existingSub = await Subscription.findOne({ 
      subscriber: userId, 
      channel: channelId 
    });

    if (existingSub) {
      await Subscription.findByIdAndDelete(existingSub._id);
      // Update subscriber count on Channel model if you added that field
      await Channel.findByIdAndUpdate(channelId, { $inc: { subscribers: -1 } });
      return res.status(200).json({ message: "Unsubscribed", subscribed: false });
    } else {
      await Subscription.create({ subscriber: userId, channel: channelId });
      await Channel.findByIdAndUpdate(channelId, { $inc: { subscribers: 1 } });
      return res.status(200).json({ message: "Subscribed", subscribed: true });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Get Videos from Subscribed Channels (For the Subscriptions Page)
export const getSubscribedVideos = async (req, res) => {
  try {
    // Step A: Find all channels the logged-in user subscribes to
    const subscriptions = await Subscription.find({ subscriber: req.user._id });
    
    // Step B: Extract just the Channel IDs into a simple array
    const channelIds = subscriptions.map((sub) => sub.channel);

    // Step C: Find videos where the 'channelId' matches ANY in our list
    const videos = await Video.find({ channelId: { $in: channelIds } })
      .populate("channelId", "channelName channelAvatar")
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Helper to check subscription status 
export const checkSubscriptionStatus = async (req, res) => {
  try {
    const { channelId } = req.params;
    const isSubscribed = await Subscription.exists({ 
      subscriber: req.user._id, 
      channel: channelId 
    });
    res.status(200).json({ subscribed: !!isSubscribed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};