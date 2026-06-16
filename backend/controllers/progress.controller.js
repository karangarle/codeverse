import ApiResponse from "../utils/ApiResponse.js";
import {
  getCourseProgressService,
  toggleTopicCompletionService,
} from "../services/progress.service.js";

/**
 * Get progress details for a course
 */
export const getCourseProgress = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    if (!courseId) {
      return res.status(400).json(
        new ApiResponse(400, "courseId is required")
      );
    }

    const result = await getCourseProgressService(userId, courseId);

    return res.status(200).json(
      new ApiResponse(200, "Progress retrieved successfully", result)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Toggle completion of a topic (mark complete / incomplete)
 */
export const toggleTopicCompletion = async (req, res, next) => {
  try {
    const { courseId, topicId } = req.body;
    const userId = req.user._id;

    if (!courseId || !topicId) {
      return res.status(400).json(
        new ApiResponse(400, "courseId and topicId are required")
      );
    }

    const result = await toggleTopicCompletionService(userId, courseId, topicId);

    return res.status(200).json(
      new ApiResponse(
        200,
        result.isCompleted
          ? "Topic marked completed"
          : "Topic marked incomplete",
        result
      )
    );
  } catch (error) {
    next(error);
  }
};