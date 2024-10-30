import { Sequelize } from 'sequelize';

// Database connection details
export const sequelize = new Sequelize('achaia_wood_db', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Disable logging, set to true to enable
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
