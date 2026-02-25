import express from 'express';
import { PORT } from './config/server.config.js';
import authRoutes from './routes/auth.routes.js';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { globalErrorHandler } from './middlewars/error.middlewars.js';
import { connectProducer, connectConsumer } from './config/kafka.js';

import { consumeUserEvents } from './kafka/item.consumer.js';

const app = express();
connectDB();
connectProducer();
connectConsumer();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
consumeUserEvents();

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


app.use('/', userRoutes);
app.use('/auth', authRoutes);
app.use(globalErrorHandler);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
