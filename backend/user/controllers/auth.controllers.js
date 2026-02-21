import User from "../models/user.models.js";
import Otp from "../models/otp.models.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";
import {
  accessCookieOptions,
  refreshCookieOptions,
} from "../config/cookie.js";
import sendMail from "../utils/sendMail.js";
import generateOTP from "../utils/generateOtp.js";
import sendResponse from "../utils/sendResponce.js";
import { producer } from "../config/kafka.js";
import { sendMessage } from "../producers/producerMessage.js";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, otp } = req.body;
    console.log("new register user", req.body);
    if (!firstName || !lastName || !email || !password || !otp) {
      throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const otpRecord = await Otp.findOne({ email });
    console.log(otpRecord, otp);
    if (!otpRecord || otpRecord.otp != otp) {
      console.log("opppp");
      throw new Error("Invalid or expired OTP");
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      isVerified: true,
    });
    console.log("new user", user);

    await Otp.deleteMany({ email });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    console.log('hellow how are you')
    const { email, password } = req.body;


    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password +refreshToken");
    if (!user) throw new Error("Invalid credentials");
    user.password=password;
    await user.save();
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) throw new Error("Invalid credentials");

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    sendMessage("notification-topic",{email,mess:"login successfully!"})
    res
      .cookie("accessToken", accessToken, accessCookieOptions)
      .cookie("refreshToken", refreshToken, refreshCookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Login successful",
      });
  } catch (err) {
    next(err);
  }
};


export const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new Error("Refresh token missing");

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decoded.userId).select("+refreshToken");
    if (!user || user.refreshToken !== refreshToken) {
      throw new Error("Invalid refresh token");
    }

    const newAccessToken = generateAccessToken(user._id);

    res
      .cookie("accessToken", newAccessToken, accessCookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Access token refreshed",
      });
  } catch (err) {
    next(err);
  }
};

export const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log("otp email", req.body);
    await Otp.deleteMany({ email });
    if (!email || email == undefined) {
      return sendResponse(res, 400, false,"invalid email");
    }
    const newOtp = generateOTP();
    await Otp.create({ email, otp: newOtp });

    await sendMail(email, "Delivery Otp", `delivery otp +${newOtp}`);

    return res.status(200).json({ message: "otp send successfully", success: false, otp: 9999 });

  }
  catch (err) {
    console.log(err);
    next(err);
  }
}

export const forgotPassowrd = async (req, res, next) => {
  try {
    const { password, otp, email } = req.body;
    const savedOtp = await Otp.findOne({ email });
    if (savedOtp && savedOtp.otp == otp) {
      const user = await User.findOne({ email }).select('password');
      user.password = password;
      await user.save();
      return sendResponse(res, 200,true, "password changed successfully!")
    }
    else {
      return sendResponse(res, 302,false, "invalid otp");

    }

  }
  catch (err) {
    return sendResponse(res, 501, "server error");

  }
}



