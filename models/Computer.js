// models/Computer.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Computer = sequelize.define("Computer", {
    processor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ram: DataTypes.STRING,
    storage_type: DataTypes.STRING, // SSD / HDD
    storage_capacity: DataTypes.STRING,
    os: DataTypes.STRING,
    motherboard: DataTypes.STRING,
    graphics_card: DataTypes.STRING,
    power_supply: DataTypes.STRING,
    cabinet_type: DataTypes.STRING, // e.g., Mini Tower, Mid Tower
    mac_address: DataTypes.STRING,
    ip_address: DataTypes.STRING,
    peripherals: DataTypes.STRING, // e.g., "Keyboard, Mouse, Monitor"
  });

  Computer.associate = (models) => {
    Computer.belongsTo(models.Item, { foreignKey: "item_id", onDelete: "CASCADE" });
  };

  return Computer;
};
