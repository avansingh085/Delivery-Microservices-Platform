import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import paymentRoutes from '../src/routes/payment.route.js';
import { globalErrorHandler } from './middlewars/error.middlewars.js';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.config.js';
import { connectConsumer, connectProducer } from './config/kafka.js';
dotenv.config();
connectDB();
connectConsumer();
connectProducer();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/', paymentRoutes);

app.use(globalErrorHandler);

app.listen(5007, () => {
  console.log("payment service running port", 5007);
})