import express from "express";
import {
  createApplication,
  getApplications,
  updateApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", createApplication); // Apply for a job
router.get("/", getApplications); // Get all applications
router.put("/:id", updateApplication); // Update application status

export default router;
