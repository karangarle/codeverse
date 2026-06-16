import { body, param } from "express-validator";

const resources = [
  "revisions",
  "interviews",
  "git-commands",
  "pdfs",
  "videos",
];

export const moduleResourceParamValidation = [
  param("resource")
    .isIn(resources)
    .withMessage("Invalid resource type"),
];

export const moduleResourceIdValidation = [
  ...moduleResourceParamValidation,
  param("id")
    .isMongoId()
    .withMessage("Resource id must be valid"),
];

export const moduleResourceBodyValidation = [
  body("title")
    .if(param("resource").isIn(["revisions", "pdfs", "videos"]))
    .notEmpty()
    .withMessage("Title is required"),
  body("category")
    .if(param("resource").isIn(["revisions", "interviews", "git-commands", "pdfs"]))
    .notEmpty()
    .withMessage("Category is required"),
  body("content")
    .if(param("resource").equals("revisions"))
    .notEmpty()
    .withMessage("Content is required"),
  body("keyPoints")
    .optional()
    .isArray()
    .withMessage("Key points must be an array"),
  body("question")
    .if(param("resource").equals("interviews"))
    .notEmpty()
    .withMessage("Question is required"),
  body("answer")
    .if(param("resource").equals("interviews"))
    .notEmpty()
    .withMessage("Answer is required"),
  body("difficulty")
    .optional()
    .isIn(["easy", "medium", "hard"])
    .withMessage("Invalid difficulty"),
  body("command")
    .if(param("resource").equals("git-commands"))
    .notEmpty()
    .withMessage("Command is required"),
  body("description")
    .if(param("resource").isIn(["git-commands", "pdfs"]))
    .notEmpty()
    .withMessage("Description is required"),
  body("pdfUrl")
    .if(param("resource").equals("pdfs"))
    .isURL()
    .withMessage("PDF URL must be valid"),
  body("videoId")
    .if(param("resource").equals("videos"))
    .notEmpty()
    .withMessage("Video id is required"),
  body("playlistName")
    .if(param("resource").equals("videos"))
    .notEmpty()
    .withMessage("Playlist name is required"),
  body("order")
    .optional()
    .isNumeric()
    .withMessage("Order must be a number"),
];
