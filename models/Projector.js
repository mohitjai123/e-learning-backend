// models/Projector.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Projector = sequelize.define("Projector", {
    brightness: DataTypes.STRING,
    resolution: DataTypes.STRING,
    lamp_hours_used: DataTypes.INTEGER,
    lamp_life: DataTypes.INTEGER,
    connectivity: DataTypes.STRING,
    mount_type: DataTypes.STRING,
    remote_available: DataTypes.BOOLEAN,
  });

  Projector.associate = (models) => {
    Projector.belongsTo(models.Item, { foreignKey: "item_id", onDelete: "CASCADE" });
  };

  return Projector;
};
