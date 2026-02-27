import { instance } from "../config/razorpay.js";
import crypto from "crypto";
import Payment from "../models/payment.model.js";
import { sendEvent } from "../kafka/item.producer.js";


export const checkout = async (req, res) => {
  try {
    const { amount } = req.body;
    const {userId}=req.user;
    if (!amount) {
      console.log("err","amount")
      return res.status(400).json({
        success: false,
        message: "Amount required",
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
    };

    const order = await instance.orders.create(options);
   

    const tran=await Payment.create({
      razorpay_order_id: order.id,
      amount: options.amount,
      userId,
      status: "CREATED",
    });
    console.log(tran);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Checkout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment initialization failed",
    });
  }
};


export const paymentVerification = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems
    } = req.body;
    const userId=req.user.userId;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }

    const existingPayment = await Payment.findOne({
      razorpay_payment_id,
    });

    if (existingPayment) {
      return res.json({
        success: true,
        message: "Payment already processed",
      });
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

    return res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error("Verification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error verifying payment",
    });
  }
};



export const getKey = (req, res) => {
  return res.status(200).json({
    key: process.env.RAZORPAY_KEY_ID,
  });
};