import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/shared/store/auth.store";
import { api } from "@/shared/api/api";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

// Validation Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { token, setAuth } = useAuthStore();

  // SEO & Headings setup
  useEffect(() => {
    document.title = "Sign In | CodeVerse";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Log in to your CodeVerse account to access your developer dashboard.");
    }
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", data);
      const { user, token } = response.data.data;
      
      setAuth(user, token);
      toast.success("Welcome back! Logging in...");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Invalid credentials. Please check and try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#09090b] text-[#fafafa] px-4 overflow-hidden font-sans">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-25%] left-[-25%] w-[70%] h-[70%] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-25%] right-[-25%] w-[70%] h-[70%] rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" />

      {/* Glassmorphic Container */}
      <main className="w-full max-w-md bg-[#18181b]/50 backdrop-blur-xl border border-[#27272a] rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 transition-all duration-300 hover:border-[#3f3f46]">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mb-3 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">CV</span>
          </div>
          <h1 id="login-title" className="text-3xl font-extrabold tracking-tight bg-gradient-to-b from-[#fafafa] to-[#a1a1aa] bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-sm text-[#a1a1aa] mt-2">
            Enter your credentials to access your dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-labelledby="login-title">
          {/* Email Input Field */}
          <div className="space-y-2">
            <label htmlFor="email-input" className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
              Email Address
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#71717a] group-focus-within:text-indigo-400 transition-colors">
                <Mail size={18} />
              </span>
              <input
                id="email-input"
                type="email"
                placeholder="developer@codeverse.com"
                className={`w-full bg-[#09090b]/80 border ${
                  errors.email ? "border-rose-500/60 focus:border-rose-500" : "border-[#27272a] focus:border-indigo-500"
                } rounded-xl py-3 pl-10 pr-4 text-sm text-[#fafafa] placeholder-[#71717a] outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20`}
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-400 flex items-center mt-1 animate-pulse" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password-input" className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
                Password
              </label>
            </div>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#71717a] group-focus-within:text-indigo-400 transition-colors">
                <Lock size={18} />
              </span>
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full bg-[#09090b]/80 border ${
                  errors.password ? "border-rose-500/60 focus:border-rose-500" : "border-[#27272a] focus:border-indigo-500"
                } rounded-xl py-3 pl-10 pr-10 text-sm text-[#fafafa] placeholder-[#71717a] outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20`}
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#71717a] hover:text-[#a1a1aa] transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-400 flex items-center mt-1 animate-pulse" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            id="login-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] border border-indigo-500/20 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-[#27272a] text-center">
          <p className="text-sm text-[#a1a1aa]">
            Don't have an account?{" "}
            <Link
              id="goto-register-link"
              to="/register"
              className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
