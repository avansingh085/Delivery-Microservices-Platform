import express from 'express';
import { protect } from '../middlewares/auth.middlewars.js';
import { addNewItem, deleteItem, updateItem, getItemById, getListOfItem } from '../controllers/item.controllers.js';
const app = express();
app.get("/", getListOfItem);
app.post('/', protect, addNewItem);
app.get("/:id", getItemById);

app.delete('/:id', protect, deleteItem);
app.patch('/:id', protect, updateItem);

export default app;