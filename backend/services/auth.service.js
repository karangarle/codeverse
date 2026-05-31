import ApiError from "../utils/ApiError.js";

import {
  findUserByEmail,
  createUser,
} from "../repositories/auth.repository.js";

import { generateToken } from "../utils/jwt.js";

export const registerService = async (payload) => {
  const existing = await findUserByEmail(payload.email);

  if (existing) {
    throw new ApiError(409, "Email already exists");
  }

  // Prevent privilege escalation: force role to "user"
  const { role, ...userData } = payload;
  const user = await createUser({
    ...userData,
    role: "user",
  });

  const token = generateToken(user);

  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return {
    user: userResponse,
    token,
  };
};

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user);

  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return {
    user: userResponse,
    token,
  };
};
