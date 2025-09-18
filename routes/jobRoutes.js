import express from "express";
import { addJob, getJobs } from "../controllers/jobController.js";

const router = express.Router();

router.post("/addJob", addJob); // Create a new job
router.get("/getJobs", getJobs); // Get all jobs

export default router;
//api/jobs/getJobs
//api/jobs/addJob
