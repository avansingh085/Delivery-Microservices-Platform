
import express from 'express';
import { PORT } from './config/server.config.js';
import { startNotificationConsumer } from './consumers/email.consumer.js';
const app=express();
app.use(express.json());

startNotificationConsumer();




app.listen(PORT,()=>{
    console.log("notification server running!");
})