// routes/pemesananRoutes.js
const express = require("express");
const pemesananController = require("../controllers/pemesananController");

const router = express.Router();

// Rute untuk membuat pemesanan baru
router.post("/", pemesananController.createPemesanan);

module.exports = router;
