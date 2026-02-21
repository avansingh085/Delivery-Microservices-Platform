import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import { RAZORPAY_KEY_ID ,RAZORPAY_KEY_SECRET} from './server.config.js';

dotenv.config();

export const instance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});