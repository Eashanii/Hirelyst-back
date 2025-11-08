// routes/applicationRoutes.js
import express from "express";
import {
  createApplication,
  getApplicationsBySeeker,
} from "../controllers/applicationController.js";
const router = express.Router();
router.post("/", createApplication);
router.get("/seeker/:seekerId", getApplicationsBySeeker);
export default router;
