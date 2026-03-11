import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false, // Prevent terminal spam
  })
  : new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    logging: false,
  });

export default sequelize;
