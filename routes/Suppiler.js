const { createSupplier, getAllSuppliers, getSupplierById, updateSupplier, deleteSupplier } = require("../controllers/Suppiler.controller")

const router = require("express").Router()

router.post("/", createSupplier)
router.get("/", getAllSuppliers)
router.get("/:id", getSupplierById)
router.put("/:id", updateSupplier)
router.delete("/:id", deleteSupplier)

module.exports = router