import express from "express";

import {
  register,
  login,
} from "../controllers/auth.controller.js";

import {
  registerValidation,
  loginValidation,
} from "../validations/auth.validation.js";

import { validate } from "../middlewares/validate.middleware.js";

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

export default router;