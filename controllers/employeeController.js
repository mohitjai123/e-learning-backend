const { models } = require('../models');

// Create a new supplier
exports.createSupplier = async (req, res) => {
  try {
    const { name, department, designation, phone, email, address } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name are required" });
    }

    const supplier = await models.Employee.create({
      name,
      department,
      designation,
      phone,
      email,
      address,
    });

    res.status(201).json({ message: "Employee created successfully", supplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await models.Employee.findAll({ order: [['id', 'DESC']] });
    res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await models.Employee.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update supplier
exports.updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, designation, phone, email, address } = req.body;

    const supplier = await models.Employee.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await supplier.update({
      name: name ||supplier.name,
      designation: designation ||supplier.designation,
      department: department ||supplier.department,
      phone: phone ||supplier.phone,
      email: email ||supplier.email,
      address: address ||supplier.address,
    });

    res.status(200).json({ message: "Employee updated successfully", supplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const supplier = await models.Employee.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await supplier.destroy();
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
