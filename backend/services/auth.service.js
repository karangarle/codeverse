import ApiError from "../utils/ApiError.js";

import {
  findUserByEmail,
  createUser,
} from "../repositories/auth.repository.js";

import { generateToken } from "../utils/jwt.js";

export const registerService =
  async (payload) => {
    const existing =
      await findUserByEmail(
        payload.email
      );

    if (existing) {
      throw new ApiError(
        409,
        "Email already exists"
      );
    }

    const user =
      await createUser(payload);

    const token =
      generateToken(user);

    return {
      user,
      token,
    };
  };

export const loginService =
  async (email, password) => {
    const user =
      await findUserByEmail(email);

    if (!user) {
      throw new ApiError(
        401,
        "Invalid credentials"
      );
    }

    const isMatch =
      await user.comparePassword(
        password
      );

    if (!isMatch) {
      throw new ApiError(
        401,
        "Invalid credentials"
      );
    }

    const token =
      generateToken(user);

    return {
      user,
      token,
    };
  };