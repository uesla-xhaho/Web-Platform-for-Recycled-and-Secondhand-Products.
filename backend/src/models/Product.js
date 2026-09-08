const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

const asJsonArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

class Product extends Model {}

Product.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    category: {
      type: DataTypes.ENUM('second-hand', 'upcycled'),
      allowNull: false,
    },
    subcategory: { type: DataTypes.STRING(120), allowNull: false },
    materials: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '[]',
      get() {
        return asJsonArray(this.getDataValue('materials'));
      },
      set(value) {
        this.setDataValue('materials', JSON.stringify(asJsonArray(value)));
      },
    },
    condition: {
      type: DataTypes.ENUM('new-like', 'good', 'fair', 'worn', 'not_applicable'),
      allowNull: false,
      defaultValue: 'not_applicable',
    },
    ecoImpact: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
    },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    artisanId: { type: DataTypes.INTEGER, allowNull: false },
    artisanName: { type: DataTypes.STRING(120), allowNull: false },
    artisanLocation: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    shippingMethod: { type: DataTypes.STRING(100), allowNull: false, defaultValue: 'Standard' },
    shippingCost: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    shippingDays: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 5 },
    images: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '[]',
      get() {
        return asJsonArray(this.getDataValue('images'));
      },
      set(value) {
        this.setDataValue('images', JSON.stringify(asJsonArray(value)));
      },
    },
    averageRating: { type: DataTypes.DECIMAL(3, 2), allowNull: false, defaultValue: 0 },
    reviewCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    featured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
  }
);

module.exports = Product;
