import express from 'express';
import productRoutes from './routes/productRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Test database connection
import sequelize from './sequelize'; // Import your Sequelize instance here
sequelize
  .authenticate()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Failed to connect to PostgreSQL:', err));

// Routes
app.use('/api', productRoutes);

export default app;
