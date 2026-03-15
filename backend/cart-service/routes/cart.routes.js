import express from 'express';
import { addToCart, deleteCartItem, getCartItems, updateCartItem } from '../controllers/cart.controllers.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.use(protect);
router.get("/", getCartItems);
router.post("/:itemId", addToCart);
router.patch("/:itemId", updateCartItem);
router.delete("/:itemId", deleteCartItem);


export default router;