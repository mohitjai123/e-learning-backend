// models/Item.js

const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const Item = sequelize.define("Item", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    model_number: DataTypes.STRING,
    serial_number: DataTypes.STRING,
    purchase_date: DataTypes.DATE,
    purchase_price: DataTypes.DECIMAL(10, 2),
    supplier_id: DataTypes.INTEGER,
    location: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM(
        "in_stock",
        "assigned",
        "under_repair",
        "disposed"
      ),
      defaultValue: "in_stock",
    },
    assigned_to: DataTypes.INTEGER,
    warranty_expiry: DataTypes.DATE,
    asset_tag: DataTypes.STRING,
    remarks: DataTypes.TEXT,
  });

  return Item;
};
