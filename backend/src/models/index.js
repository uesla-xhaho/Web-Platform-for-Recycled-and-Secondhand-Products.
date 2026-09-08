const sequelize = require('../config/sequelize');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Review = require('./Review');
const Wishlist = require('./Wishlist');
const WishlistItem = require('./WishlistItem');

let initialized = false;

const initModels = () => {
  if (initialized) {
    return;
  }

  User.hasMany(Product, { as: 'products', foreignKey: 'artisanId' });
  Product.belongsTo(User, { as: 'artisan', foreignKey: 'artisanId' });

  User.hasMany(Order, { as: 'customerOrders', foreignKey: 'customerId' });
  Order.belongsTo(User, { as: 'customer', foreignKey: 'customerId' });

  Order.hasMany(OrderItem, { as: 'items', foreignKey: 'orderId', onDelete: 'CASCADE' });
  OrderItem.belongsTo(Order, { as: 'order', foreignKey: 'orderId' });

  Product.hasMany(OrderItem, { as: 'orderItems', foreignKey: 'productId' });
  OrderItem.belongsTo(Product, { as: 'product', foreignKey: 'productId' });

  User.hasMany(OrderItem, { as: 'artisanOrderItems', foreignKey: 'artisanId' });
  OrderItem.belongsTo(User, { as: 'artisan', foreignKey: 'artisanId' });

  Product.hasMany(Review, { as: 'reviews', foreignKey: 'productId', onDelete: 'CASCADE' });
  Review.belongsTo(Product, { as: 'product', foreignKey: 'productId' });

  User.hasMany(Review, { as: 'reviews', foreignKey: 'userId', onDelete: 'CASCADE' });
  Review.belongsTo(User, { as: 'user', foreignKey: 'userId' });

  User.hasOne(Wishlist, { as: 'wishlist', foreignKey: 'userId', onDelete: 'CASCADE' });
  Wishlist.belongsTo(User, { as: 'user', foreignKey: 'userId' });

  Wishlist.belongsToMany(Product, {
    through: WishlistItem,
    as: 'products',
    foreignKey: 'wishlistId',
    otherKey: 'productId',
  });
  Product.belongsToMany(Wishlist, {
    through: WishlistItem,
    as: 'wishlists',
    foreignKey: 'productId',
    otherKey: 'wishlistId',
  });

  Wishlist.hasMany(WishlistItem, { as: 'items', foreignKey: 'wishlistId', onDelete: 'CASCADE' });
  WishlistItem.belongsTo(Wishlist, { as: 'wishlist', foreignKey: 'wishlistId' });

  Product.hasMany(WishlistItem, { as: 'wishlistItems', foreignKey: 'productId', onDelete: 'CASCADE' });
  WishlistItem.belongsTo(Product, { as: 'product', foreignKey: 'productId' });

  initialized = true;
};

module.exports = {
  sequelize,
  initModels,
  User,
  Product,
  Order,
  OrderItem,
  Review,
  Wishlist,
  WishlistItem,
};
