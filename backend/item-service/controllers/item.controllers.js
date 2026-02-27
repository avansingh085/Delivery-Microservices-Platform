import mongoose from 'mongoose';
import Items from "../models/item.model.js";
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendError } from "../utils/response.js";
import HttpStatus from '../utils/httpStatus.js';
import { RedisGet, RedisSet } from '../config/redis.config.js';


export const addNewItem = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { title, description, price, image, stock = 1 } = req.body;

  if (!title || !description || !price || !image || !userId) {
    return sendError(res, "Invalid item data", HttpStatus.BAD_REQUEST);
  }

  const newItem = await Items.create({ title, description, price, image, stock, userId });
  return sendSuccess(res, newItem, HttpStatus.CREATED);
});


export const getItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let item = await RedisGet(`item_by_id_${id}`);
  if (!item) {
    item = await Items.findById(id).lean();
    if (!item) return sendError(res, "Item not found", HttpStatus.NOT_FOUND);
    await RedisSet(`item_by_id_${id}`, item);
  }

  return sendSuccess(res, item, HttpStatus.SUCCESS);
});


export const updateItem = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  const { title, description, price, stock, image } = req.body;

  const item = await Items.findById(itemId);
  if (!item) return sendError(res, "Invalid itemId or item not found", HttpStatus.NOT_FOUND);

  item.title = title ?? item.title;
  item.description = description ?? item.description;
  item.price = price ?? item.price;
  item.stock = stock ?? item.stock;
  item.image = image ?? item.image;

  await item.save();
  await RedisSet(`item_by_id_${itemId}`, item);

  return sendSuccess(res, item, HttpStatus.SUCCESS, "Item updated successfully");
});


export const getListOfItem = asyncHandler(async (req, res) => {
  const start = parseInt(req.query.start) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (start <= 0 || limit <= 0) return sendError(res, "Invalid query: start and limit must be positive", HttpStatus.BAD_REQUEST);

  const listOfItems = await Items.find().skip(start - 1).limit(limit);
  return sendSuccess(res, listOfItems, HttpStatus.SUCCESS, "Items fetched successfully");
});


export const deleteItem = asyncHandler(async (req, res) => {
  const itemId = req.query.id;

  const deletedItem = await Items.findByIdAndDelete(itemId);
  if (!deletedItem) return sendError(res, "Failed to delete item or invalid item id", HttpStatus.BAD_REQUEST);

  await RedisSet(`item_by_id_${itemId}`, null);
  return sendSuccess(res, deletedItem, HttpStatus.SUCCESS, "Item successfully deleted");
});