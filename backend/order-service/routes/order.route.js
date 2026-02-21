import express from 'express';
import { createOrder, getOrders, updateStatus } from '../controllers/order.controllers.js';
const router=express.Router();

router.get("/",getOrders);
router.post("/",createOrder);
router.patch("/itemId",updateStatus);

export default router;