import express from "express";
import {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification
} from "../controllers/notificationController.js";
import  {protect} from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/",protect, createNotification);

router.get("/",protect, getNotifications);

router.patch("/read/:id",protect, markAsRead);

router.delete("/:id",protect, deleteNotification);

export default router;