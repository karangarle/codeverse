import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuthStore }
  from "@/shared/store/auth.store";

export default function ProtectedRoute() {
  const { token } =
    useAuthStore();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}