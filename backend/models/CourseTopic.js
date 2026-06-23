import mongoose from "mongoose";

const courseTopicSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    // Main explanation content (markdown-style text)
    content: {
      type: String,
    },
    // Code snippet to demonstrate the concept
    codeSnippet: {
      type: String,
      default: "",
    },
    // Language for the code block (javascript, python, java, etc.)
    codeLanguage: {
      type: String,
      default: "javascript",
      trim: true,
    },
    // URL to a diagram, illustration, or visualization image
    visualizeUrl: {
      type: String,
      default: "",
      trim: true,
    },
    videoUrl: {
      type: String,
    },
    order: {
      type: Number,
    },
    estimatedMinutes: {
      type: Number,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CourseTopic = mongoose.model("CourseTopic", courseTopicSchema);

export default CourseTopic;