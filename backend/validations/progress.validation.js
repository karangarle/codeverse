import { body } from "express-validator";

export const completeTopicValidation = [
  body("courseId")
    .notEmpty()
    .withMessage("courseId is required")
    .isMongoId()
    .withMessage("courseId must be a valid id"),

  body("topicId")
    .notEmpty()
    .withMessage("topicId is required")
    .isMongoId()
    .withMessage("topicId must be a valid id"),
];
