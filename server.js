// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import routes
import employerRoutes from "./routes/employerRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import seekerRoutes from "./routes/seekerRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

// Import middlewares
import errorHandler from "./middleware/errorHandler.js";
import authenticateToken from "./middleware/authMiddleware.js";

// Import utils if needed globally
import { generateToken, verifyToken } from "./utils/jwt.js";
import { sendEmail } from "./utils/email.js";
import { validateEmail, validatePassword } from "./utils/validator.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/employers", employerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/seekers", seekerRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/notifications", notificationRoutes);

// Optional test route for protected routes
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed!", user: req.user });
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
