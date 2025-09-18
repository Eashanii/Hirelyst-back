import express from "express";
import { createBlog, getBlogs } from "../controllers/blogController.js";

const router = express.Router();

router.post("/", createBlog); // Add new blog
router.get("/getBlogs", getBlogs); // Get all blogs

export default router;
