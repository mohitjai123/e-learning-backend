// models/Sofa.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Sofa = sequelize.define("Sofa", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: DataTypes.STRING,
    type: DataTypes.STRING, // e.g., Recliner, Sectional, Sofa Bed
    material: DataTypes.STRING, // e.g., Leather, Fabric
    color: DataTypes.STRING,
    seating_capacity: DataTypes.INTEGER,
    condition: {
      type: DataTypes.ENUM("New", "Used", "Repair"),
      defaultValue: "New",
    },
    purchase_date: DataTypes.DATE,
    purchase_price: DataTypes.DECIMAL(10, 2),
    warranty_expiry: DataTypes.DATE,
    location: DataTypes.STRING,
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    asset_tag: {
      type: DataTypes.STRING, // QR code filename or unique identifier
      allowNull: true,
    },
    remarks: DataTypes.TEXT,
  });

  // Relationships
  Sofa.associate = (models) => {
    Sofa.belongsTo(models.Supplier, { foreignKey: "supplier_id", as: "Supllier" });
  };

  return Sofa;
};
