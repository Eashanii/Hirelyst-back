import express from "express";
import {
  registerSeeker,
  loginSeeker,
  getSeekerProfile,
  updateSeekerProfile,
  applyForJob,
  getRecommendedJobs,
} from "../controllers/seekerController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerSeeker);
router.post("/login", loginSeeker);
router.get("/profile", authenticateToken, getSeekerProfile);
router.put("/update/:id", authenticateToken, updateSeekerProfile);
router.post("/apply", authenticateToken, applyForJob);
router.get("/recommendations", authenticateToken, getRecommendedJobs);

export default router;
