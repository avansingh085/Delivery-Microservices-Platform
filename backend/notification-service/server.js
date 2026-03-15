
import express from 'express';
import { PORT } from './config/server.config.js';
import { connectConsumer, connectProducer } from './config/kafka.js';
import { consumeNotificationEvents } from './kafka/notification.consumer.js';
import initSocket from './config/socket.config.js';
const app=express();
app.use(express.json());
connectConsumer();
connectProducer();

consumeNotificationEvents();
initSocket(app);

app.listen(PORT,()=>{
    console.log("notification server running!");
})