import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DATABASE_CONNECTION_URI, {
  dialectOptions: {
    charset: "utf8mb4"
  }
});

(async function() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Error connecting to database', error);
  }
  console.log('Connected to databse');
})();