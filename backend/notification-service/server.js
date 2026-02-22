
import express from 'express';
import { PORT } from './config/server.config.js';
import { connectConsumer, connectProducer } from './config/kafka.js';
import { consumeNotificationEvents } from './kafka/notification.consumer.js';
const app=express();
app.use(express.json());
connectConsumer();
connectProducer();

consumeNotificationEvents();






app.listen(PORT,()=>{
    console.log("notification server running!");
})