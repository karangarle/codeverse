import express from "express";

import {
  register,
  login,
  getCurrentUser,
  logout,
} from "../controllers/auth.controller.js";

import {
  registerValidation,
  loginValidation,
} from "../validations/auth.validation.js";

import { validate } from "../middlewares/validate.middleware.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import { adminDashboard } from "../controllers/admin.controller.js";
import authorize from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validate,
  register
);

router.post(
  "/login",
  loginValidation,
  validate,
  login
);

router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

router.post(
  "/logout",
  authMiddleware,
  logout
);

router.get(
  "/dashboard",
  authMiddleware,
  authorize("admin"),
  adminDashboard
);

export default router;