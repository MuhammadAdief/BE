// routes/ratingRoutes.js
const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");

// Menambahkan rating baru
router.post("/", ratingController.addRating);

// Mengambil rating berdasarkan ID destinasi
router.get("/:id_destinasi", ratingController.getRatingsByDestinasi);

// Mengambil rating berdasarkan ID pengguna
router.get("/user/:id_pengguna", ratingController.getRatingsByUser);

// Mengupdate rating berdasarkan ID rating
router.put("/:id_rating", ratingController.updateRating);

// Menghapus rating berdasarkan ID rating
router.delete("/:id_rating", ratingController.deleteRating);

module.exports = router;
