const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/squelize');

const Admin = sequelize.define('Admins', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'superadmin'),
    allowNull: false,
    defaultValue: 'admin',
  },
  access_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'admins',
  timestamps: true,
});

module.exports = Admin;
