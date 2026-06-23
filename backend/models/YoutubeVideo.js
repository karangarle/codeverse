import mongoose from "mongoose";

const youtubeVideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    channelName: {
      type: String,
      required: true,
      trim: true,
    },
    videoId: {
      type: String,
      required: true,
      trim: true,
    },
    // Subject category e.g. "Java", "DSA", "Python", "DBMS", "OS"
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    playlistName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("YoutubeVideo", youtubeVideoSchema);
