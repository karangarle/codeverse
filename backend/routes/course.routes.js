import express from "express";

import {
  createCourse,
  getAllCourses,
} from "../controllers/course.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import authorize from "../middlewares/role.middleware.js";

const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  createCourse
);

router.get("/", getAllCourses);

export default router;