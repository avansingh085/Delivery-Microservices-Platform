import express from 'express';
import cookieParser from 'cookie-parser';
const app=express();
app.use(express.json());
app.use(cookieParser());

import orderRoutes from './routes/order.route.js';
import { globalErrorHandler } from './middlewars/error.middlewars.js';

app.use("/api/order",orderRoutes);


app.use(globalErrorHandler);

app.listen(5003,()=>{
    console.log("server running!");
})