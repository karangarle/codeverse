import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import courseTopicRoutes from "./routes/courseTopic.routes.js";
import progressRoutes from "./routes/progress.route.js";
import moduleRoutes from "./routes/module.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// Security Headers
app.use(helmet());

// CORS — must come before routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Gzip Compression
app.use(compression());

// Rate Limiting (100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Body Parser
app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CodeVerse API Running",
  });
});

// API Routes
app.use("/api/v1/auth", authRoutes);

app.use(
  "/api/v1/courses",
  courseRoutes
);

app.use(
  "/api/v1/course-topics",
  courseTopicRoutes
);

app.use("/api/v1/progress", progressRoutes);

app.use("/api/v1/modules", moduleRoutes);

// Global Error Handler (must be last)
app.use(errorHandler);

export default app;