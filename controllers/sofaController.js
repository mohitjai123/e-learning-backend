const { Supplier, models } = require("../models");
const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");

// Create a new sofa
exports.createSofa = async (req, res) => {
  try {
    // 1️⃣ Create the sofa
    const sofa = await models.Sofa.create(req.body);

    // 2️⃣ Generate QR code data (link to sofa API)
    const qrData = `${process.env.API_URL}/api/sofas/${sofa.id}`;

    // 3️⃣ Prepare QR image path
    const qrImagePath = path.join(
      __dirname,
      "../public/qrcodes",
      `item_${sofa.id}.png`
    );

    // Ensure folder exists
    fs.mkdirSync(path.dirname(qrImagePath), { recursive: true });

    // 4️⃣ Generate QR code
    await QRCode.toFile(qrImagePath, qrData, { width: 300 });

    // 5️⃣ Update sofa with asset_tag
    sofa.asset_tag = `/qrcodes/item_${sofa.id}.png`;
    await sofa.save();

    res.status(201).json(sofa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create sofa" });
  }
};

// Get all sofas
exports.getAllSofas = async (req, res) => {
  try {
    const sofas = await models.Sofa.findAll({
      include: [{ model: models.Supplier, as: "Supplier" }],
      order: [["id", "DESC"]],
    });
    res.json(sofas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch sofas" });
  }
};

// Get single sofa
exports.getSofaById = async (req, res) => {
  try {
    const { id } = req.params;
    const sofa = await models.Sofa.findByPk(id, {
      include: [{ model: models.Supplier, as: "Supplier" }],
    });
    if (!sofa) return res.status(404).json({ message: "Sofa not found" });
    res.json(sofa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch sofa" });
  }
};

// Update sofa
exports.updateSofa = async (req, res) => {
  try {
    const { id } = req.params;
    const sofa = await models.Sofa.findByPk(id);
    if (!sofa) return res.status(404).json({ message: "Sofa not found" });

    await sofa.update(req.body);
    res.json(sofa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update sofa" });
  }
};

// Delete sofa
exports.deleteSofa = async (req, res) => {
  try {
    const { id } = req.params;
    const sofa = await models.Sofa.findByPk(id);
    if (!sofa) return res.status(404).json({ message: "Sofa not found" });

    await sofa.destroy();
    res.json({ message: "Sofa deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete sofa" });
  }
};
