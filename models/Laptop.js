// models/Laptop.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Laptop = sequelize.define("Laptop", {
    processor: DataTypes.STRING,
    ram: DataTypes.STRING,
    storage_type: DataTypes.STRING,
    storage_capacity: DataTypes.STRING,
    os: DataTypes.STRING,
    graphics_card: DataTypes.STRING,
    battery_health: DataTypes.STRING,
    screen_size: DataTypes.STRING,
    mac_address: DataTypes.STRING,
    ip_address: DataTypes.STRING,
  });

  // Relationships
  Laptop.associate = (models) => {
    Laptop.belongsTo(models.Item, { foreignKey: "item_id", onDelete: "CASCADE" });
  };

  return Laptop;
};
