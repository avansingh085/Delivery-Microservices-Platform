import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cookieParser());
import { globalErrorHandler } from './middlewars/error.middlewars.js';
import connectDB from './config/db.config.js';
import { connectConsumer, connectProducer } from './config/kafka.config.js';
connectDB();
connectConsumer();
connectProducer();


app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(globalErrorHandler);

app.listen(5008, () => {
    console.log("server running!");
})