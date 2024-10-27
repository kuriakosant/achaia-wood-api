import express from 'express';
import productRoutes from './routes/productRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

// Routes
app.use('/api', productRoutes);

 