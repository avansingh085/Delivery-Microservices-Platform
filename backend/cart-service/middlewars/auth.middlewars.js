import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../config/server.config.js";
export const protect = (req, res, next) => {
  try {
    console.log("helloooo")
    const token = req.cookies.accessToken;
    console.log(token,"hellow token");
    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    console.log(decoded);
    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
