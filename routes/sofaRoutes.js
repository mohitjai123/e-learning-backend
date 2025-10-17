const { createSofa, getAllSofas, getSofaById, updateSofa, deleteSofa } = require("../controllers/sofaController")

const router = require("express").Router()

router.post("/", createSofa)
router.get("/", getAllSofas)
router.get("/:id", getSofaById)
router.put("/:id", updateSofa)
router.delete("/:id", deleteSofa)

module.exports = router