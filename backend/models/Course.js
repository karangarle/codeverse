import mongoose from "mongoose";

const courseSchema =
  new mongoose.Schema(
    {
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

      description: {
        type: String,
        required: true,
      },

      thumbnail: {
        type: String,
        default: "",
      },

      language: {
        type: String,
        enum: [
          "english",
          "hindi",
          "gujarati",
        ],
        default: "english",
      },

      level: {
        type: String,
        enum: [
          "beginner",
          "intermediate",
          "advanced",
        ],
        default: "beginner",
      },

      duration: {
        type: Number,
        default: 0,
      },

      isPublished: {
        type: Boolean,
        default: false,
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Course =
  mongoose.model(
    "Course",
    courseSchema
  );

export default Course;