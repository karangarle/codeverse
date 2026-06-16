import Revision from "../models/Revision.js";
import InterviewQuestion from "../models/InterviewQuestion.js";
import GitCommand from "../models/GitCommand.js";
import ResourcePdf from "../models/ResourcePdf.js";
import YoutubeVideo from "../models/YoutubeVideo.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Progress from "../models/Progress.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getRevisions = async (req, res, next) => {
  try {
    const revisions = await Revision.find({});
    return res.status(200).json(
      new ApiResponse(200, "Revisions retrieved successfully", revisions)
    );
  } catch (error) {
    next(error);
  }
};

export const getInterviewQuestions = async (req, res, next) => {
  try {
    const questions = await InterviewQuestion.find({});
    return res.status(200).json(
      new ApiResponse(200, "Interview questions retrieved successfully", questions)
    );
  } catch (error) {
    next(error);
  }
};

export const getGitCommands = async (req, res, next) => {
  try {
    const commands = await GitCommand.find({});
    return res.status(200).json(
      new ApiResponse(200, "Git commands retrieved successfully", commands)
    );
  } catch (error) {
    next(error);
  }
};

export const getResourcePdfs = async (req, res, next) => {
  try {
    const pdfs = await ResourcePdf.find({});
    return res.status(200).json(
      new ApiResponse(200, "PDF resources retrieved successfully", pdfs)
    );
  } catch (error) {
    next(error);
  }
};

export const getYoutubeVideos = async (req, res, next) => {
  try {
    const videos = await YoutubeVideo.find({});
    return res.status(200).json(
      new ApiResponse(200, "YouTube videos retrieved successfully", videos)
    );
  } catch (error) {
    next(error);
  }
};

export const getAdminAnalytics = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalCourses = await Course.countDocuments({});
    const totalCompletions = await Progress.countDocuments({ isCompleted: true });

    // Calculate completions per course
    const completionsByCourse = await Progress.aggregate([
      { $match: { isCompleted: true } },
      { $group: { _id: "$course", count: { $sum: 1 } } },
      { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "courseDetails" } },
      { $unwind: "$courseDetails" },
      { $project: { title: "$courseDetails.title", count: 1 } }
    ]);

    return res.status(200).json(
      new ApiResponse(200, "Admin analytics retrieved successfully", {
        totalUsers,
        totalCourses,
        totalCompletions,
        completionsByCourse,
      })
    );
  } catch (error) {
    next(error);
  }
};
