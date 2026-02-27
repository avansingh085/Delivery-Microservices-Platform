import { JWT_ACCESS_EXPIRES, JWT_REFRESH_EXPIRES } from "./server.config.js";

export const accessCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 60 * 50 * 1000,
};

export const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 60 * 500 * 1000,
};
