// models/StatusLog.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StatusLog = sequelize.define("StatusLog", {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assigned_to: {
      type: DataTypes.INTEGER, // employee ID
      allowNull: true,
    },
    previous_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    new_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  StatusLog.associate = (models) => {
    StatusLog.belongsTo(models.Item, { foreignKey: "item_id", as: "item" });
    StatusLog.belongsTo(models.Employee, { foreignKey: "assigned_to", as: "Employee" });
  };

  return StatusLog;
};
