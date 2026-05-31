import { api } from "@/shared/api/api";

export const registerUser = (
  data: unknown
) =>
  api.post(
    "/auth/register",
    data
  );

export const loginUser = (
  data: unknown
) =>
  api.post(
    "/auth/login",
    data
  );

export const getCurrentUser =
  () => api.get("/auth/me");