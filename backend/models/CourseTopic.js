// create models/CourseTopic.js
import mongoose  from "mongoose";

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
        content: {
            type: String,
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