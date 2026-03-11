import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test database connection
import sequelize from './sequelize'; // Import your Sequelize instance here
sequelize
  .authenticate()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Failed to connect to PostgreSQL:', err));

// Health Check & Root Route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Achaia Wood Shop API is running successfully on Vercel!' });
});
// Ignore browser favicon requests
app.get('/favicon.ico', (req, res) => { res.status(204).end(); });
app.get('/favicon.png', (req, res) => { res.status(204).end(); });

// Routes
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);

export default app;
