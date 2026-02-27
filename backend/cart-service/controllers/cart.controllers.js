import { RedisGet, RedisSet } from "../config/redis.config.js";
import Cart from "../models/cart.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess, sendError } from "../utils/response.js";
import HttpStatus from "../utils/httpStatus.js";

export const getCartItems = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  let cartItems = await RedisGet(`cart_items_${userId}`);
  if (!cartItems) {
    cartItems = await Cart.find({ userId }).lean();
    await RedisSet(`cart_items_${userId}`, cartItems);
  }

  return sendSuccess(res, cartItems, HttpStatus.SUCCESS, "Cart items fetched successfully");
});

export const addToCart = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user.userId;

  if (!itemId) return sendError(res, "Invalid item", HttpStatus.BAD_REQUEST);

  const newCart = await Cart.create({ itemId, userId });

  const cartItems = await Cart.find({ userId }).lean();
  await RedisSet(`cart_items_${userId}`, cartItems);

  return sendSuccess(
    res,
    { _id: newCart._id, itemId, quantity: 1, userId },
    HttpStatus.CREATED,
    "Item added to cart successfully"
  );
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const itemId = req.params.itemId;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) return sendError(res, "Invalid quantity must be positive", HttpStatus.BAD_REQUEST);

  const cartItem = await Cart.findOne({ userId, itemId });
  if (!cartItem) return sendError(res, "Item not found in cart", HttpStatus.NOT_FOUND);

  cartItem.quantity = quantity;
  await cartItem.save();

  const cartItems = await Cart.find({ userId }).lean();
  await RedisSet(`cart_items_${userId}`, cartItems);

  return sendSuccess(res, cartItem, HttpStatus.SUCCESS, "Cart item updated successfully");
});

export const deleteCartItem = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const itemId = req.params.itemId;

  const deletedItem = await Cart.findOneAndDelete({ userId, itemId });
  if (!deletedItem) return sendError(res, "Failed to delete cart item", HttpStatus.BAD_REQUEST);

  const cartItems = await Cart.find({ userId }).lean();
  await RedisSet(`cart_items_${userId}`, cartItems);

  return sendSuccess(res, deletedItem, HttpStatus.SUCCESS, "Cart item deleted successfully");
});