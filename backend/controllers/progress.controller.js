import ApiResponse from "../utils/ApiResponse.js";

import {
  markTopicCompletedService,
} from "../services/progress.service.js";

export const markTopicCompleted =
  async (
    req,
    res,
    next
  ) => {
    try {
      const {
        courseId,
        topicId,
      } = req.body;

      const result =
        await markTopicCompletedService(
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