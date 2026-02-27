import express from 'express';
import { checkout, paymentVerification, getKey } from '../controllers/payment.controllers.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/checkout", protect,checkout);
router.post("/verify",protect,paymentVerification);
router.get('/getkey',protect,getKey);

export default router;