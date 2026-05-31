import {
  registerService,
  loginService,
} from "../services/auth.service.js";

import ApiResponse from "../utils/ApiResponse.js";

export const register = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await registerService(req.body);

    return res.status(201).json(
      new ApiResponse(
        201,
        "User registered successfully",
        result
      )
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } =
      req.body;

    const result =
      await loginService(
        email,
        password
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Login successful",
        result
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser =
  async (req, res, next) => {
    try {
      return res.status(200).json(
        new ApiResponse(
          200,
          "User fetched successfully",
          req.user
        )
      );
    } catch (error) {
      next(error);
    }
  };

export const logout = async (
  req,
  res
) => {
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};