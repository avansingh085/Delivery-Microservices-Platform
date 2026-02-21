const express = require('express');
const cors = require('cors');
const cookieParser=require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use('/api/users', createProxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true
}));

app.use('/api/orders', createProxyMiddleware({
  target: 'http://localhost:5003',
  changeOrigin: true
}));
app.use('/api/carts', createProxyMiddleware({
  target: 'http://localhost:5006',
  changeOrigin: true
}));
app.use('/api/items', createProxyMiddleware({
  target: 'http://localhost:5002',
  changeOrigin: true
}));

app.use('/api/payments', createProxyMiddleware({
  target: 'http://localhost:5007',
  changeOrigin: true
}));

app.listen(8000, () => {
  console.log("API Gateway running on port 8000");
});
