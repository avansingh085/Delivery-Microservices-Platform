import express from 'express';
import { checkout, paymentVerification, getKey } from '../controllers/payment.controllers.js';

const router = express.Router();

router.route('/checkout').post(checkout);
router.route('/verify').post(paymentVerification);
router.route('/getkey').get(getKey);

export default router;