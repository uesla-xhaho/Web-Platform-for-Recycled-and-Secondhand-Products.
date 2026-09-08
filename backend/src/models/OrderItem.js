const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class OrderItem extends Model {}

OrderItem.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    artisanId: { type: DataTypes.INTEGER, allowNull: false },
    titleSnapshot: { type: DataTypes.STRING(200), allowNull: false },
    priceSnapshot: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items',
    timestamps: false,
  }
);

module.exports = OrderItem;
