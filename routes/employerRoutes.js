import express from "express";
import Employer from "../models/employer.js";
import authenticateToken from "../middleware/authMiddleware.js";
import {
  registerEmployer,
  loginEmployer,
} from "../controllers/employerController.js";
import { loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

// POST /api/employers — registration route
router.post("/registerEmployer", registerEmployer);
router.post("/loginEmployer", loginEmployer);

// GET /api/employers/me — protected route to get employer info
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const employer = await Employer.findById(req.userId).select("-password");
    if (!employer)
      return res.status(404).json({ message: "Employer not found" });
    res.json(employer);
  } catch (err) {
    console.error("Error fetching employer:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
