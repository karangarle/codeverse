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
  ];