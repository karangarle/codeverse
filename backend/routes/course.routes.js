import express from "express";

import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourse,
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

router.get("/:slug", getCourse);

router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  updateCourse
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  deleteCourse
);

export default router;