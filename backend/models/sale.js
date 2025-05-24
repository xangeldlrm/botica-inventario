const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');

const Sale = sequelize.define('Sale', {
  quantity_sold: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sale_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Product.hasMany(Sale, { foreignKey: 'product_id' });
Sale.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Sale;
