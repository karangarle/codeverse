import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/dashboard/dashboard";
import LoginPage from "@/pages/login/login";
import RegisterPage from "@/pages/register/register";
import ProtectedRoute from "@/router/protected-route";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
]);