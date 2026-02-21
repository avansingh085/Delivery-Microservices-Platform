import { instance } from '../config/razorpay.js';
import crypto from 'crypto';
import Payment from '../models/payment.model.js';

export const checkout = async (req, res) => {
  try {
    console.log(req.body);
    const options = {
      amount: Number(req.body.amount * 100), 
      currency: "INR",
    };
    
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    console.log("payment verify ",req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
   
     const newPay=await Payment.create({ 
        razorpay_order_id, 
        razorpay_payment_id, 
        razorpay_signature 
      });
      console.log(newPay)
      res.status(302).redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
    } else {
      console.log("invalid signature");
      res.status(400).json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    console.log("internal server error",error);
    res.status(500).json({ success: false, message: "Error verifying payment", error });
  }
};

export const getKey = (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
};