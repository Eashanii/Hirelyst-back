import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import employerRoutes from "./routes/employerRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import seekerRoutes from "./routes/seekerRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";

import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.1.41:3000",
      "http://192.168.1.43:3000",
      "http://192.168.1.68:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());

// API routes
app.use("/api/employers", employerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/seekers", seekerRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/recommendations", recommendationRoutes);

// Default route
app.get("/", (req, res) => res.send("Hirelyst Backend API is running ✅"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
