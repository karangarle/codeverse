import { body } from "express-validator";

export const createCourseTopicValidation = [
  body("course")
    .isMongoId()
    .withMessage("course must be a valid id"),
  body("title")
    .notEmpty()
    .withMessage("Title is required"),
  body("slug")
    .notEmpty()
    .withMessage("Slug is required"),
  body("shortDescription")
    .notEmpty()
    .withMessage("Short description is required"),
  body("order")
    .optional()
    .isNumeric()
    .withMessage("Order must be a number"),
  body("estimatedMinutes")
    .optional()
    .isNumeric()
    .withMessage("Estimated minutes must be a number"),
  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be true or false"),
];

export const updateCourseTopicValidation = [
  body("course")
    .optional()
    .isMongoId()
    .withMessage("course must be a valid id"),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title cannot be empty"),
  body("slug")
    .optional()
    .notEmpty()
    .withMessage("Slug cannot be empty"),
  body("shortDescription")
    .optional()
    .notEmpty()
    .withMessage("Short description cannot be empty"),
  body("order")
    .optional()
    .isNumeric()
    .withMessage("Order must be a number"),
  body("estimatedMinutes")
    .optional()
    .isNumeric()
    .withMessage("Estimated minutes must be a number"),
  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be true or false"),
];
