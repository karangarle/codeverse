import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseTopic",
      required: true,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

progressSchema.index(
  {
    user: 1,
    topic: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "Progress",
  progressSchema
);