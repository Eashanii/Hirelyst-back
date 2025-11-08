// routes/recommendationRoutes.js
import express from "express";
import { getRecommendedJobs } from "../controllers/recommendationController.js";

const router = express.Router();
router.get("/get/:seekerId", getRecommendedJobs);
export default router;
