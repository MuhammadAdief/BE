// controllers/ratingController.js
const Rating = require("../models/Rating");
const { v4: uuidv4 } = require("uuid");

// Menambahkan rating
const addRating = async (req, res) => {
  try {
    const { id_pengguna, id_destinasi, star_rate, komen, profile_picture } = req.body;

    // Membuat id_rating baru
    const id_rating = uuidv4();

    // Membuat rating baru
    const newRating = new Rating({
      id_rating,
      id_pengguna,
      id_destinasi,
      star_rate,
      komen,
      profile_picture
    });

    await newRating.save();
    res.status(201).json({ message: "Rating added successfully", rating: newRating });
  } catch (err) {
    res.status(500).json({ error: "Failed to add rating", details: err.message });
  }
};

// Mendapatkan rating berdasarkan id_destinasi
const getRatingsByDestinasi = async (req, res) => {
  try {
    const { id_destinasi } = req.params;

    const ratings = await Rating.find({ id_destinasi }).populate("id_pengguna", "nama email profile_picture");
    res.status(200).json({ ratings });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ratings", details: err.message });
  }
};

// Mendapatkan rating berdasarkan id_pengguna
const getRatingsByUser = async (req, res) => {
  try {
    const { id_pengguna } = req.params;

    const ratings = await Rating.find({ id_pengguna }).populate("id_destinasi", "nama_destinasi kategori");
    res.status(200).json({ ratings });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ratings", details: err.message });
  }
};

// Mengupdate rating berdasarkan id_rating
const updateRating = async (req, res) => {
  try {
    const { id_rating } = req.params;
    const { star_rate, komen, profile_picture } = req.body;

    const updatedRating = await Rating.findOneAndUpdate(
      { id_rating },
      { star_rate, komen, profile_picture },
      { new: true }
    );

    if (!updatedRating) {
      return res.status(404).json({ error: "Rating not found" });
    }

    res.status(200).json({ message: "Rating updated successfully", rating: updatedRating });
  } catch (err) {
    res.status(500).json({ error: "Failed to update rating", details: err.message });
  }
};

// Menghapus rating berdasarkan id_rating
const deleteRating = async (req, res) => {
  try {
    const { id_rating } = req.params;

    const deletedRating = await Rating.findOneAndDelete({ id_rating });

    if (!deletedRating) {
      return res.status(404).json({ error: "Rating not found" });
    }

    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete rating", details: err.message });
  }
};

module.exports = {
  addRating,
  getRatingsByDestinasi,
  getRatingsByUser,
  updateRating,
  deleteRating
};
