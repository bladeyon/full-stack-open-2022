require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    require: true,
    rejectUnauthorized: false
  }
});

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.close();
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

main();
