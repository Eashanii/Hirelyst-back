import express from "express";
import { addReview, getReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", addReview); // Add review
router.get("/", getReviews); // Get reviews

export default router;
