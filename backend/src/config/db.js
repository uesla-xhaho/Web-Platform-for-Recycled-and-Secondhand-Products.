const sequelize = require('./sequelize');
const { initModels } = require('../models');

const connectDB = async () => {
  try {
    initModels();
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('SQL Server connected and schema synced');
  } catch (error) {
    console.error('SQL Server connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
