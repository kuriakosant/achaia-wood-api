import express from 'express';
import productRoutes from './routes/productRoutes';
import dotenv from 'dotenv';
import { sequelize } from './db'; // Import MySQL connection

dotenv.config();

const app = express();
app.use(express.json());

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log('Connected to MySQL database'))
  .catch((err) => console.error('Failed to connect to MySQL:', err));

// Routes
app.use('/api', productRoutes);

export default app;
