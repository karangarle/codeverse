import Joi from "joi";

export const completeTopicValidation =
  Joi.object({
    courseId: Joi.string().required(),
    topicId: Joi.string().required(),
  });