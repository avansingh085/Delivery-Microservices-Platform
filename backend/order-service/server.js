import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cookieParser());

import orderRoutes from './routes/order.route.js';
import { globalErrorHandler } from './middlewars/error.middlewars.js';
import connectDB from './config/db.config.js';
import { connectConsumer, connectProducer } from './config/kafka.config.js';
import { consumeOrderEvents } from './kafka/order.consumer.js';

connectDB();
connectConsumer();
connectProducer();
consumeOrderEvents();

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use("/", orderRoutes);


app.use(globalErrorHandler);

app.listen(5003, () => {
    console.log("server running!");
})