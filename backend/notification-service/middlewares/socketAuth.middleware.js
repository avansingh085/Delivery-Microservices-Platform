import jwt from "jsonwebtoken";
import cookie from 'cookie';
import { JWT_ACCESS_SECRET } from "../config/server.config";

const socketAuth=(socket,next)=>{
    try{
           const cookies=socket.handshake.headers.cookie;
           if(!cookies){
            return next(new Error("No cookie found"));
           }

           const parsedCookies=cookie.parse(cookies);

           if(!token)
            return next(new Error("Authentication token missing"));

           const decoded=jwt.verify(token,JWT_ACCESS_SECRET);
           socket.user=decoded;
           next();

    }catch(err){

        next(new Error("Authentication failed!"));

    }
}

export default socketAuth;