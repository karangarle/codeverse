import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { completeTopicValidation } from "../validations/progress.validation.js";
import {
  getCourseProgress,
  toggleTopicCompletion,
} from "../controllers/progress.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  completeTopicValidation,
  validate,
  toggleTopicCompletion
);
router.get("/:courseId", authMiddleware, getCourseProgress);

export default router;
