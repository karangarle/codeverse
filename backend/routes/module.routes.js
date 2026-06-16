import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import {
  getRevisions,
  getInterviewQuestions,
  getGitCommands,
  getResourcePdfs,
  getYoutubeVideos,
  getAdminAnalytics,
} from "../controllers/module.controller.js";

const router = express.Router();

router.get("/revisions", authMiddleware, getRevisions);
router.get("/interviews", authMiddleware, getInterviewQuestions);
router.get("/git-commands", authMiddleware, getGitCommands);
router.get("/pdfs", authMiddleware, getResourcePdfs);
router.get("/videos", authMiddleware, getYoutubeVideos);

// Admin only route
router.get("/analytics", authMiddleware, authorize("admin"), getAdminAnalytics);

export default router;
