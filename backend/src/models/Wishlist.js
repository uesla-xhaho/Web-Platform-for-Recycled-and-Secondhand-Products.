const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Wishlist extends Model {}

Wishlist.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: 'Wishlist',
    tableName: 'wishlists',
    timestamps: true,
  }
);

module.exports = Wishlist;
