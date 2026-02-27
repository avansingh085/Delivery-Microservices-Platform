import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { profile,updateProfile } from '../controllers/user.controllers.js';
const app = express();

app.get('/', protect, profile);
app.patch('/',protect,updateProfile);
// app.delete('/',protect);

export default app;