import jwt from "jsonwebtoken";
import { JWT_ACCESS_EXPIRES,JWT_ACCESS_SECRET,JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES } from "../config/server.config.js";

export const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
   JWT_ACCESS_SECRET,
    { expiresIn: JWT_ACCESS_EXPIRES }
  );
};

export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    JWT_REFRESH_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES }
  );
};
