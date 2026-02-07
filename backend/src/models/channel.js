import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
      trim: true,
    },
    // Linking the channel to a specific User (owner)
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    channelBanner: {
      type: String,
      default: "",
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    // Storing video references here allows us to quickly fetch a channel's video list
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true },
);


export const Channel = mongoose.model("Channel", channelSchema);
