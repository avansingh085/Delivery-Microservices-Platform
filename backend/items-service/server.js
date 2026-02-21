import express from 'express';
import { globalErrorHandler } from './middlewars/error.middlewars.js';
import connectDB from './config/db.js';
import cors from 'cors';
import ItemRoutes from './routes/item.routes.js';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(cookieParser());
connectDB();
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cors({ origin: 'http://localhost:5173' }));
app.get('/health', (req, res) => {
    return res.send("server running!");
})

app.use("/", ItemRoutes);

app.use(globalErrorHandler);

app.listen(5002, () => {
    console.log("server running port", 5002);
});