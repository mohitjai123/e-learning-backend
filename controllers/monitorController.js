const { models } = require("../models");
const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");

// Create a new laptop
exports.createLaptop = async (req, res) => {
  try {
    const {
      name,
      brand,
      model_number,
      serial_number,
      processor,
      ram,
      storage_type,
      storage_capacity,
      os,
      graphics_card,
      battery_health,
      screen_size,
      purchase_date,
      purchase_price,
      warranty_expiry,
      location,
      supplier_id,
      remarks,
      ip_address,
      mac_address
    } = req.body;

    if (!name || !brand) {
      return res.status(400).json({ message: "Name and Brand are required" });
    }

    const item = await models.Item.create({
        name,
        brand,
        model_number,
        serial_number,
        purchase_date,
        purchase_price,
        supplier_id,
        location,
        warranty_expiry,
        remarks
    })
    const laptop = await models.Monitor.create({
      item_id:item.id,
      processor,
      ram,
      storage_type,
      storage_capacity,
      os,
      graphics_card,
      battery_health,
      screen_size,
      ip_address,
      mac_address
     });
     const qrData = process.env.API_URL+"/api/monitor/"+item.id;

     const qrImagePath = path.join(__dirname, "../public/qrcodes", `item_${item.id}.png`);

     // Ensure folder exists
     fs.mkdirSync(path.dirname(qrImagePath), { recursive: true });
 
     await QRCode.toFile(qrImagePath, qrData, { width: 300 });
 
     // 4️⃣ Update Item with QR code image path
     item.qr_code_image = `/qrcodes/item_${item.id}.png`;
     await item.save();
    
    res.status(201).json({ message: "Laptop added successfully", laptop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all laptops
exports.getAllLaptops = async (req, res) => {
  try {
    const laptops = await models.Monitor.findAll({ order: [["id", "DESC"]], include: [
        {
          model: models.Item,
          // as: "item", // use this if you set `as: "item"` in Monitor.associate
        },
      ], });
    res.status(200).json(laptops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get laptop by ID
exports.getLaptopById = async (req, res) => {
  try {
    const { id } = req.params;
    const laptop = await models.Monitor.findByPk(id, {
        include: [
          {
            model: models.Item,
            // as: "item", // use this if you set `as: "item"` in Monitor.associate
          },
        ],
      });
  
    if (!laptop) return res.status(404).json({ message: "Laptop not found" });
    res.status(200).json(laptop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update laptop
exports.updateLaptop = async (req, res) => {
  try {
    const { id } = req.params;
    const laptop = await models.Monitor.findByPk(id);
    const item = await models.Item.findByPk(Monitor.item_id)
    if (!laptop || !item) return res.status(404).json({ message: "Laptop not found" });
    await Monitor.update(req.body);
    await item.update(req.body)
    res.status(200).json({ message: "Laptop updated successfully", laptop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete laptop
exports.deleteLaptop = async (req, res) => {
  try {
    const { id } = req.params;
    const laptop = await models.Monitor.findByPk(id);
    const item = await models.Item.findByPk(Monitor.item_id)
    if (!laptop || !item) return res.status(404).json({ message: "Laptop not found" });
    await Monitor.destroy();
    await item.destroy();
    res.status(200).json({ message: "Laptop deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
