import express from 'express';
import { login, register, sendOtp } from '../controllers/auth.controllers.js';
const app=express();

app.post('/register',register);
app.post('/login',login);
app.post('/send-otp',sendOtp);

export default app;