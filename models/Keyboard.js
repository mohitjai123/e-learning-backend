// models/Keyboard.js
const { DataTypes } = require("sequelize");

module.exports =  (sequelize) => {
  const Keyboard = sequelize.define("Keyboard", {
    keyboard_type: {
      type: DataTypes.STRING,
      allowNull: false, // e.g., Mechanical, Membrane
    },
    connectivity: DataTypes.STRING, // e.g., Wired, Wireless, Bluetooth
    layout: DataTypes.STRING, // e.g., QWERTY, AZERTY
    key_switch_type: DataTypes.STRING, // e.g., Cherry MX Red
    backlight: DataTypes.BOOLEAN,
    color: DataTypes.STRING,
    battery_type: DataTypes.STRING, // For wireless
    is_rechargeable: DataTypes.BOOLEAN,
  });

  Keyboard.associate = (models) => {
    Keyboard.belongsTo(models.Item, { foreignKey: "item_id", onDelete: "CASCADE" });
  };

  return Keyboard;
};
