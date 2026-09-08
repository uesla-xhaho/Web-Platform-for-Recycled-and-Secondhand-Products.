const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/sequelize');

class User extends Model {
  matchPassword(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(120), allowNull: false },
    email: { type: DataTypes.STRING(160), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: {
      type: DataTypes.ENUM('customer', 'artisan', 'admin'),
      allowNull: false,
      defaultValue: 'customer',
    },
    profileImage: { type: DataTypes.STRING(255), allowNull: false, defaultValue: '' },
    bio: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    location: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
    artisanApproved: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeSave: async (user) => {
        user.email = String(user.email).toLowerCase().trim();

        if (user.role !== 'artisan') {
          user.artisanApproved = false;
        }

        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

module.exports = User;
