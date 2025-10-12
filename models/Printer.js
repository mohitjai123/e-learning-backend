// models/Printer.js
const { DataTypes } =  require("sequelize");

module.exports = (sequelize) => {
  const Printer = sequelize.define("Printer", {
    printer_type: DataTypes.STRING,
    color_support: DataTypes.BOOLEAN,
    duplex_printing: DataTypes.BOOLEAN,
    connectivity: DataTypes.STRING,
    paper_size_support: DataTypes.STRING,
    cartridge_model: DataTypes.STRING,
    page_count: DataTypes.INTEGER,
    maintenance_date: DataTypes.DATE,
  });

  Printer.associate = (models) => {
    Printer.belongsTo(models.Item, { foreignKey: "item_id", onDelete: "CASCADE" });
  };

  return Printer;
};
