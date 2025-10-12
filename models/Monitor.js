// models/Monitor.js
const { DataTypes } =  require("sequelize");

module.exports = (sequelize) => {
  const Monitor = sequelize.define("Monitor", {
    screen_size: DataTypes.STRING,
    resolution: DataTypes.STRING,
    panel_type: DataTypes.STRING,
    refresh_rate: DataTypes.STRING,
    ports: DataTypes.STRING,
    stand_adjustable: DataTypes.BOOLEAN,
  });

  Monitor.associate = (models) => {
    Monitor.belongsTo(models.Item, { foreignKey: "item_id", onDelete: "CASCADE" });
  };

  return Monitor;
};
