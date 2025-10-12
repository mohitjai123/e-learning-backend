// models/Supplier.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Supplier = sequelize.define("Supplier", {
    name: DataTypes.STRING,
    contact_person: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.TEXT,
  });

  Supplier.associate = (models) => {
    Supplier.hasMany(models.Item, { foreignKey: "supplier_id" });
  };

  return Supplier;
};
