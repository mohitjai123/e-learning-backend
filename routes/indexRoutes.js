const router = require("express").Router()
const suppilerRoutes = require("./Suppiler")
const laptopRoutes = require("./laptopRoutes")
const employeRoutes = require("./employeeRoutes")
const itemsRoutes = require("./itemRoutes")

router.use("/suppliers", suppilerRoutes)
router.use("/laptops", laptopRoutes)
router.use("/employees", employeRoutes)
router.use("/items", itemsRoutes)

module.exports = router