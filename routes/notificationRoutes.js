import express from "express";
import {
  createNotification,
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/", createNotification); // Create notification
router.get("/:userId", getNotifications); // Get user notifications
router.put("/:id/read", markAsRead); // Mark as read

export default router;
