import { RedisGet, RedisSet } from '../config/redis.config.js';
import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendError } from '../utils/response.js';
import HttpStatus from '../utils/httpStatus.js';

// GET PROFILE
export const profile = asyncHandler(async (req, res) => {
  let user = await RedisGet(`profile_by_id_${req.user.userId}`);

  if (!user) {
    user = await User.findById(req.user.userId);
    if (!user) return sendError(res, "User not found", HttpStatus.NOT_FOUND);
  }

  const data = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    location: user.location
  };

  await RedisSet(`profile_by_id_${req.user.userId}`, data);

  return sendSuccess(res, data, HttpStatus.SUCCESS);
});

// UPDATE PROFILE
export const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, location } = req.body;
  const userId = req.user.userId;

  const user = await User.findById(userId);
  if (!user) return sendError(res, "User not found", HttpStatus.NOT_FOUND);

  user.firstName = firstName ?? user.firstName;
  user.lastName = lastName ?? user.lastName;
  user.phone = phone ?? user.phone;
  user.location = location ?? user.location;
  await user.save();

  const data = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    location: user.location
  };

  await RedisSet(`profile_by_id_${req.user.userId}`, data);

  return sendSuccess(res, data, HttpStatus.SUCCESS);
});