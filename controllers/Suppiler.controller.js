const { models } = require('../models');

// Create a new supplier
exports.createSupplier = async (req, res) => {
  try {
    const { name, contact_person, phone, email, address } = req.body;

    if (!name || !contact_person) {
      return res.status(400).json({ message: "Name and contact person are required" });
    }

    const supplier = await models.Supplier.create({
      name,
      contact_person,
      phone,
      email,
      address,
    });

    res.status(201).json({ message: "Supplier created successfully", supplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await models.Supplier.findAll({ order: [['id', 'DESC']] });
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
    const supplier = await models.Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
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
    const { name, contact_person, phone, email, address } = req.body;

    const supplier = await models.Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    await supplier.update({
      name: name || supplier.name,
      contact_person: contact_person || supplier.contact_person,
      phone: phone || supplier.phone,
      email: email || supplier.email,
      address: address || supplier.address,
    });

    res.status(200).json({ message: "Supplier updated successfully", supplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const supplier = await models.Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    await supplier.destroy();
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
