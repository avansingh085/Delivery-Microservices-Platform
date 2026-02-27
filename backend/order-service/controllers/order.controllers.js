import orderModel from "../models/order.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess, sendError } from "../utils/response.js";
import HttpStatus from "../utils/httpStatus.js";


export const createOrder = asyncHandler(async (req, res) => {
  const { itemId, quantity, price } = req.body;
  const userId = req.user.userId;

  if (!itemId || !quantity || !price || !userId) {
    return sendError(res, "Invalid order data!", HttpStatus.BAD_REQUEST);
  }

  const newOrder = await orderModel.create({ itemId, quantity, price, userId });

  return sendSuccess(res, newOrder, HttpStatus.CREATED);
});


export const updateStatus = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { status } = req.body;

  const updatedOrder = await orderModel.findByIdAndUpdate(
    itemId,
    { status },
    { new: true }
  );

  if (!updatedOrder) {
    return sendError(res, "Failed to update: invalid order detail", HttpStatus.BAD_REQUEST);
  }

  return sendSuccess(res, updatedOrder, HttpStatus.SUCCESS, "Order status updated successfully");
});


export const getOrders = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) return sendError(res, "Client error: missing userId", HttpStatus.BAD_REQUEST);

  const allOrders = await orderModel.find({ userId });

  return sendSuccess(res, allOrders, HttpStatus.SUCCESS, "Orders fetched successfully");
});