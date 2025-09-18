import express from "express";
import {
  registerSeeker,
  getAllSeekers,
  loginSeeker,
} from "../controllers/seekerController.js";

const router = express.Router();

router.post("/register", registerSeeker);
router.post("/login", loginSeeker); // Added login route
router.get("/", getAllSeekers);

export default router;
