import dotenv from 'dotenv';
dotenv.config();
export const {
    PORT,
    MONGO_URI,
    JWT_ACCESS_SECRET,
    REDIS_PASS,
    REDIS_ENDPOINT
} = process.env;