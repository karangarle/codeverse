import mongoose from "mongoose";

const progressSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      course: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },

      completedTopics: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "CourseTopic",
        },
      ],

      lastTopic: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "CourseTopic",
      },

      progressPercentage: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

progressSchema.index(
  {
    user: 1,
    course: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "Progress",
  progressSchema
);