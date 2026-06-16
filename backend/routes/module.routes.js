import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  moduleResourceBodyValidation,
  moduleResourceIdValidation,
  moduleResourceParamValidation,
} from "../validations/module.validation.js";
import {
  getRevisions,
  getInterviewQuestions,
  getGitCommands,
  getResourcePdfs,
  getYoutubeVideos,
  getAdminAnalytics,
  createModuleResource,
  updateModuleResource,
  deleteModuleResource,
} from "../controllers/module.controller.js";

const router = express.Router();

router.get("/revisions", authMiddleware, getRevisions);
router.get("/interviews", authMiddleware, getInterviewQuestions);
router.get("/git-commands", authMiddleware, getGitCommands);
router.get("/pdfs", authMiddleware, getResourcePdfs);
router.get("/videos", authMiddleware, getYoutubeVideos);

// Admin only route
router.get("/analytics", authMiddleware, authorize("admin"), getAdminAnalytics);

router.post(
  "/admin/:resource",
  authMiddleware,
  authorize("admin"),
  moduleResourceParamValidation,
  moduleResourceBodyValidation,
  validate,
  createModuleResource
);

router.put(
  "/admin/:resource/:id",
  authMiddleware,
  authorize("admin"),
  moduleResourceIdValidation,
  moduleResourceBodyValidation,
  validate,
  updateModuleResource
);

router.delete(
  "/admin/:resource/:id",
  authMiddleware,
  authorize("admin"),
  moduleResourceIdValidation,
  validate,
  deleteModuleResource
);

export default router;
