const express = require("express");
const router = express.Router();
const laptopController = require("../controllers/laptopController");

// CRUD routes
router.post("/", laptopController.createLaptop);          // Create
router.get("/", laptopController.getAllLaptops);         // List all
router.get("/:id", laptopController.getLaptopById);      // Get by ID
router.put("/:id", laptopController.updateLaptop);       // Update
router.delete("/:id", laptopController.deleteLaptop);    // Delete

module.exports = router;
