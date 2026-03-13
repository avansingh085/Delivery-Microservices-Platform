import Notification from "../models/notificationModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess, sendError } from "../utils/responseHelpers.js";
import HttpStatus from "../utils/httpStatus.js";

export const createNotification = asyncHandler(async (req, res) => {
  const { title, message, userId } = req.body;
  if (!title || !message || !userId) {
    return sendError(res, "All fields are required", HttpStatus.BAD_REQUEST);
  }
  const notification = new Notification({ title, message, userId });
  await notification.save();
  sendSuccess(res, notification, HttpStatus.CREATED);
});

export const getNotifications = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  let { page = 1, limit = 10 } = req.query; 
  page = parseInt(page);
  limit = parseInt(limit);

  const total = await Notification.countDocuments({ userId });
  const notifications = await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  sendSuccess(res, {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    notifications,
  });
});

export const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notification = await Notification.findByIdAndUpdate(
    id,
    { read: true },
    { new: true }
  );
  if (!notification) return sendError(res, "Notification not found", HttpStatus.NOT_FOUND);
  sendSuccess(res, notification);
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notification = await Notification.findByIdAndDelete(id);
  if (!notification) return sendError(res, "Notification not found", HttpStatus.NOT_FOUND);
  sendSuccess(res, null, HttpStatus.SUCCESS, "Notification deleted successfully");
});