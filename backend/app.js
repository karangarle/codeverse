import express from "express";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CodeVerse API Running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use(errorHandler);

export default app;