const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class WishlistItem extends Model {}

WishlistItem.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    wishlistId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'WishlistItem',
    tableName: 'wishlist_items',
    timestamps: false,
    indexes: [{ unique: true, fields: ['wishlistId', 'productId'] }],
  }
);

module.exports = WishlistItem;
