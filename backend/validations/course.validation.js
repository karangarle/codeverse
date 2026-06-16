import { body } from "express-validator";

export const createCourseValidation =
  [
    body("title")
      .notEmpty()
      .withMessage(
        "Title is required"
      ),

    body("slug")
      .notEmpty()
      .withMessage(
        "Slug is required"
      ),

    body("description")
      .notEmpty()
      .withMessage(
        "Description is required"
      ),

    body("language")
      .optional()
      .isIn(["english", "hindi", "gujarati"])
      .withMessage("Invalid language"),

    body("level")
      .optional()
      .isIn(["beginner", "intermediate", "advanced"])
      .withMessage("Invalid level"),

    body("duration")
      .optional()
      .isNumeric()
      .withMessage("Duration must be a number"),

    body("isPublished")
      .optional()
      .isBoolean()
      .withMessage("isPublished must be true or false"),
  ];

export const updateCourseValidation = [
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("slug").optional().notEmpty().withMessage("Slug cannot be empty"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("language")
    .optional()
    .isIn(["english", "hindi", "gujarati"])
    .withMessage("Invalid language"),
  body("level")
    .optional()
    .isIn(["beginner", "intermediate", "advanced"])
    .withMessage("Invalid level"),
  body("duration")
    .optional()
    .isNumeric()
    .withMessage("Duration must be a number"),
  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be true or false"),
];
