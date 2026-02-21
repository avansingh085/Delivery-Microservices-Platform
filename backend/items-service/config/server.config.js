import dotenv from 'dotenv';
dotenv.config();
export const {
    PORT,
    MONGO_URI,
    JWT_ACCESS_SECRET
} = process.env;