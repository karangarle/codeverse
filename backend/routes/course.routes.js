import express from "express";

import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getAdminCourses,
  getCourse,
  updateCourse,
} from "../controllers/course.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import authorize from "../middlewares/role.middleware.js";
import {
  createCourseValidation,
  updateCourseValidation,
} from "../validations/course.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  createCourseValidation,
  validate,
  createCourse
);

router.get("/", getAllCourses);

router.get(
  "/admin/all",
  authMiddleware,
  authorize("admin"),
  getAdminCourses
);

router.get("/:slug", getCourse);

router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  updateCourseValidation,
  validate,
  updateCourse
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  deleteCourse
);

export default router;
