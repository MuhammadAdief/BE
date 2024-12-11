const express = require("express");
const router = express.Router();
const jadwalController = require("../controllers/jadwalController");

// Rute untuk Jadwal
router.post("/", jadwalController.addJadwal);
router.get("/", jadwalController.getAllJadwal);
router.get("/:id", jadwalController.getJadwalById);
router.put("/:id", jadwalController.updateJadwal);
router.delete("/:id", jadwalController.deleteJadwal);

module.exports = router;
