// controllers/pemesananController.js
const Pemesanan = require("../models/Pemesanan");
const Guide = require("../models/Guide");
const Destination = require("../models/Destination");
const User = require("../models/User");

exports.createPemesanan = async (req, res) => {
  try {
    // Menerima data pemesanan dari request body
    const { id_pengguna, id_pemandu, id_destinasi, alamat } = req.body;

    // Validasi jika pemandu dan destinasi ada
    const guide = await Guide.findById(id_pemandu);
    const destination = await Destination.findById(id_destinasi);
    const user = await User.findById(id_pengguna);

    if (!guide || !destination || !user) {
      return res
        .status(404)
        .json({ message: "Guide, Destination, or User not found" });
    }

    // Membuat pemesanan baru
    const pemesanan = new Pemesanan({
      id_pengguna,
      id_pemandu,
      id_destinasi,
      alamat,
    });

    // Menyimpan pemesanan ke database
    const savedPemesanan = await pemesanan.save();
    res.status(201).json(savedPemesanan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create Pemesanan", error });
  }
};
