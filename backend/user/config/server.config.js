import dotenv from 'dotenv';
dotenv.config();
export const {
PORT,
JWT_REFRESH_EXPIRES,
JWT_ACCESS_EXPIRES,
MONGO_URI,
JWT_ACCESS_SECRET,
JWT_REFRESH_SECRET,
REDIS_PASS,
REDIS_ENDPOINT

}=process.env;