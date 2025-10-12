// models/Employee.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Employee = sequelize.define("Employee", {
    name: DataTypes.STRING,
    email:DataTypes.STRING,
    phone:DataTypes.STRING,
    address:DataTypes.STRING,
    department: DataTypes.STRING,
    designation: DataTypes.STRING,
  });
  Employee.associate = (models) => {
    Employee.hasMany(models.Item, { foreignKey: "assigned_to" });
  };

  return Employee;
};
