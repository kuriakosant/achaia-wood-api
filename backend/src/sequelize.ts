import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', // Set to 'postgres' for PostgreSQL
    logging: false, // Optional, disables SQL query logging
  }
);

export default sequelize;
