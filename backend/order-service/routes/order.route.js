import express from 'express';
import { createOrder, getOrders, updateStatus } from '../controllers/order.controllers.js';
import { protect } from '../middlewars/auth.middlewars.js';
const router=express.Router();

router.get("/",protect,getOrders);
router.post("/",protect,createOrder);
router.patch("/itemId",protect,updateStatus);

export default router;