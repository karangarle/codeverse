import ApiResponse from "../utils/ApiResponse.js";
import { markTopicCompleteService } from "../services/progress.service.js";

export const markTopicComplete = async (
  req,
  res,
  next
) => {
  try {
    const { courseId, topicId } = req.body;

    if (!courseId || !topicId) {
      return res.status(400).json(
        new ApiResponse(
          400,
          "courseId and topicId are required"
        )
      );
    }

    const result = await markTopicCompleteService(
      req.user._id,
      courseId,
      topicId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Topic completed successfully",
        result
      )
    );
  } catch (error) {
    next(error);
  }
};