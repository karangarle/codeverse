import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  markTopicCompleted,
} from "../controllers/progress.controller.js";

const router =
  express.Router();

router.post(
  "/complete",
  authMiddleware,
  markTopicCompleted
);

export default router;