// routes/jobRoutes.js
import express from "express";
import { getJobs, createJob, deleteJob } from "../controllers/jobController.js";

const router = express.Router();

router.get("/getJobs", getJobs); // ✅ Anyone (admin/seeker) can fetch all jobs
router.post("/createJob", createJob); // ✅ Admin adds job
router.delete("/:id", deleteJob); // ✅ Admin deletes job

export default router;
