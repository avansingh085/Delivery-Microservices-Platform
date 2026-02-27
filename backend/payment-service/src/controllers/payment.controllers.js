import { instance } from "../config/razorpay.js";
import crypto from "crypto";
import Payment from "../models/payment.model.js";
import { sendEvent } from "../kafka/item.producer.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess, sendError } from "../utils/response.js";
import HttpStatus from "../utils/httpStatus.js";

export const checkout = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const { userId } = req.user;

  if (!amount) return sendError(res, "Amount required", HttpStatus.BAD_REQUEST);

  const options = {
    amount: Math.round(amount * 100), 
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  const transaction = await Payment.create({
    razorpay_order_id: order.id,
    amount: options.amount,
    userId,
    status: "CREATED",
  });

  return sendSuccess(res, { order, transaction }, HttpStatus.SUCCESS, "Checkout order created successfully");
});

export const paymentVerification = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems } = req.body;
  const { userId } = req.user;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return sendError(res, "Invalid Signature", HttpStatus.BAD_REQUEST);
  }

  const existingPayment = await Payment.findOne({ razorpay_payment_id });
  if (existingPayment) {
    return sendSuccess(res, existingPayment, HttpStatus.SUCCESS, "Payment already processed");
  }

  const payment = await Payment.findOneAndUpdate(
    { razorpay_order_id },
    {
      razorpay_payment_id,
      razorpay_signature,
      status: "SUCCESS",
    },
    { new: true }
  );

  await sendEvent("order-topic", "CREATE_ORDER", {
    userId: payment.userId,
    paymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
    amount: payment.amount,
    items: cartItems.map(c => ({
      itemId: c.itemId._id,
      quantity: c.quantity,
      price: c.itemId.price,
      cartId: c._id
    }))
  });

  return sendSuccess(res, payment, HttpStatus.SUCCESS, "Payment verified successfully");
});

export const getKey = asyncHandler(async (req, res) => {
  return sendSuccess(res, { key: process.env.RAZORPAY_KEY_ID }, HttpStatus.SUCCESS, "Razorpay key fetched successfully");
});