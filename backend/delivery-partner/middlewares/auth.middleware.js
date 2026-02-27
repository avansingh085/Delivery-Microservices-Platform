import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../config/server.config.js";
export const protect = (req, res, next) => {
  try {
    
    const token = req.cookies.accessToken;
   
    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
   
    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
