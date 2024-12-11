// routes/penawaranRoutes.js
const express = require("express");
const penawaranController = require("../controllers/penawaranController");

const router = express.Router();

// Rute untuk membuat penawaran baru
router.post("/", penawaranController.createPenawaran);

// Rute untuk memperbarui status penawaran (Accepted/Rejected)
router.put("/status", penawaranController.updatePenawaranStatus);

// Rute untuk mendapatkan penawaran berdasarkan pemandu
router.get("/:id_pemandu", penawaranController.getPenawaranByPemandu);

module.exports = router;
