const { models } = require("../models");

exports.updateItemStatus = async (req, res) => {
    try {
      const { item_id, assigned_to, assigned_to_supplier, status, action_by, remarks } = req.body;
  
      // 1️⃣ Fetch the item
      const item = await models.Item.findByPk(item_id);
      if (!item) return res.status(404).json({ message: "Item not found" });
  
      const previous_status = item.status;
  
      // 2️⃣ Update item assignment and status
      item.assigned_to = assigned_to || item.assigned_to;
      item.status = status || previous_status;
      await item.save();
  
      // 3️⃣ Create StatusLog
      await models.StatusLogs.create({
        item_id,
        assigned_to,
        previous_status,
        new_status: item.status,
        assigned_to_supplier,
        action_by,
        action_date: new Date(),
        remarks,
      });
  
      res.status(200).json({ message: "Item assigned and status logged", item });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };