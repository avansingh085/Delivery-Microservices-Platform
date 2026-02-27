import User from "../models/user.model.js";
import Otp from "../models/otp.model.js";
import jwt from "jsonwebtoken";

import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { accessCookieOptions, refreshCookieOptions } from "../config/cookie.js";
// import sendMail from "../utils/sendMail.js";
import generateOTP from "../utils/generateOtp.js";

import asyncHandler from "../utils/asyncHandler.js";
import HttpStatus from "../utils/httpStatus.js"
import { sendSuccess, sendError } from "../utils/response.js";
import { JWT_REFRESH_SECRET } from "../config/server.config.js";

export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, otp } = req.body;

  if (!firstName || !lastName || !email || !password || !otp) {
    return sendError(res, "All fields are required", HttpStatus.BAD_REQUEST);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return sendError(res, "User already exists", HttpStatus.BAD_REQUEST);

  const otpRecord = await Otp.findOne({ email });
  if (!otpRecord || otpRecord.otp != otp) {
    return sendError(res, "Invalid or expired OTP", HttpStatus.BAD_REQUEST);
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    isVerified: true,
  });

  await Otp.deleteMany({ email });

  sendSuccess(res, {
    id: user._id,
    email: user.email,
    role: user.role,
  }, HttpStatus.CREATED);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, "Email and password are required", HttpStatus.BAD_REQUEST);
  }

  const user = await User.findOne({ email }).select("+password +refreshToken");
  if (!user) return sendError(res, "Invalid credentials", HttpStatus.UNAUTHORIZED);

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return sendError(res, "Invalid credentials", HttpStatus.UNAUTHORIZED);

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res
    .cookie("accessToken", accessToken, accessCookieOptions)
    .cookie("refreshToken", refreshToken, refreshCookieOptions);

  sendSuccess(res, { message: "Login successful" }, HttpStatus.SUCCESS);
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return sendError(res, "Refresh token missing", HttpStatus.UNAUTHORIZED);

  const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.userId).select("+refreshToken");
  if (!user || user.refreshToken !== refreshToken) {
    return sendError(res, "Invalid refresh token", HttpStatus.UNAUTHORIZED);
  }

  const newAccessToken = generateAccessToken(user._id);

  res.cookie("accessToken", newAccessToken, accessCookieOptions);
  sendSuccess(res, { message: "Access token refreshed" }, HttpStatus.SUCCESS);
});

export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) return sendError(res, "Invalid email", HttpStatus.BAD_REQUEST);

  await Otp.deleteMany({ email });

  const newOtp = generateOTP();
  await Otp.create({ email, otp: newOtp });

  //await sendMail(email, "Delivery OTP", `Your delivery OTP is ${newOtp}`);

  sendSuccess(res, { otp: newOtp, message: "OTP sent successfully" }, HttpStatus.SUCCESS);
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { password, otp, email } = req.body;

  const savedOtp = await Otp.findOne({ email });
  if (!savedOtp || savedOtp.otp != otp) {
    return sendError(res, "Invalid OTP", HttpStatus.BAD_REQUEST);
  }

  const user = await User.findOne({ email }).select("password");
  user.password = password;
  await user.save();

  sendSuccess(res, { message: "Password changed successfully" }, HttpStatus.SUCCESS);
});