// models/Mouse.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Mouse = sequelize.define("Mouse", {
    mouse_type: {
      type: DataTypes.STRING,
      allowNull: false, // e.g., Optical, Laser
    },
    connectivity: DataTypes.STRING, // e.g., Wired, Wireless, Bluetooth
    dpi: DataTypes.STRING, // Sensitivity
    color: DataTypes.STRING,
    battery_type: DataTypes.STRING, // For wireless mice
    is_rechargeable: DataTypes.BOOLEAN,
  });

  Mouse.associate = (models) => {
    Mouse.belongsTo(models.Item, { foreignKey: "item_id", onDelete: "CASCADE" });
  };

  return Mouse;
};
