const router = require("express").Router()
const suppilerRoutes = require("./Suppiler")
const laptopRoutes = require("./laptopRoutes")
const employeRoutes = require("./employeeRoutes")
const sofaRoutes = require("./sofaRoutes")
const itemsRoutes = require("./itemRoutes")
const { login } = require("./authRoutes")
const verifyToken = require("../middleware/auth")

router.use("/suppliers", verifyToken, suppilerRoutes)
router.use("/laptops", verifyToken, laptopRoutes)
router.use("/employees", verifyToken, employeRoutes)
router.use("/sofas", verifyToken, sofaRoutes)
router.use("/items", verifyToken, itemsRoutes)
router.post("/auth/login", login)

module.exports = router