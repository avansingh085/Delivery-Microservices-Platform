import express from 'express';
import cors from 'cors';
import cartRoutes from '../cart-service/routes/cart.routes.js';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './middlewars/error.middlewars.js';
import connectDB from './config/db.js';
import { connectConsumer, connectProducer } from './config/kafka.js';
import { consumeCartEvents } from './kafka/cart.consumer.js';
const app=express();
connectDB()
connectProducer();
connectConsumer();
consumeCartEvents();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use("/",cartRoutes);

app.get("/ok",(req,res)=>{
    return res.send("llllllllllllllll")
})
app.use(globalErrorHandler);


app.listen(5006,()=>{
    console.log("cart server running on port ",5006);
})