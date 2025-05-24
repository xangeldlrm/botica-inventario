const sequelize = require('../config/database');
const Product = require('./product');
const Sale = require('./sale');

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa');
    await sequelize.sync(); // crea tablas si no existen
    console.log('✅ Modelos sincronizados');
  } catch (error) {
    console.error('❌ Error de conexión a la base de datos:', error);
  }
};

module.exports = { sequelize, connectDB, Product, Sale };
