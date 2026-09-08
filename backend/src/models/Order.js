const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Order extends Model {}

Order.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    customerId: { type: DataTypes.INTEGER, allowNull: false },
    subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    commissionPercent: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    commissionAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    paymentStatus: {
      type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
      allowNull: false,
      defaultValue: 'pending',
    },
    orderStatus: {
      type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
    shippingFullName: { type: DataTypes.STRING(120), allowNull: false },
    shippingLine1: { type: DataTypes.STRING(255), allowNull: false },
    shippingLine2: { type: DataTypes.STRING(255), allowNull: false, defaultValue: '' },
    shippingCity: { type: DataTypes.STRING(120), allowNull: false },
    shippingPostalCode: { type: DataTypes.STRING(60), allowNull: false },
    shippingCountry: { type: DataTypes.STRING(120), allowNull: false },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
  }
);

module.exports = Order;
