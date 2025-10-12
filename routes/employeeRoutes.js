const express = require("express");
const router = express.Router();
const laptopController = require("../controllers/employeeController");

// CRUD routes
router.post("/", laptopController.createSupplier);          // Create
router.get("/", laptopController.getAllSuppliers);         // List all
router.get("/:id", laptopController.getSupplierById);      // Get by ID
router.put("/:id", laptopController.updateSupplier);       // Update
router.delete("/:id", laptopController.deleteSupplier);    // Delete

module.exports = router;
