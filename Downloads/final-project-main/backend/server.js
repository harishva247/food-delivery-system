import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

// CORS configuration (optional)
const corsOptions = {
  origin: 'http://localhost:3000', // Your React app's URL
  methods: 'GET,POST',            // Define allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Define allowed headers
};

app.use(cors()); // Enable CORS for the specified origin
app.use(express.json());
app.use(express.urlencoded())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
