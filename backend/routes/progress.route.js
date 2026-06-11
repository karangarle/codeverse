import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  markTopicComplete,
} from "../controllers/progress.controller.js";
import authorize from "../middlewares/role.middleware.js";

const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  markTopicComplete
); 

export default router;