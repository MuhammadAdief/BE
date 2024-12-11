// controllers/penawaranController.js
const Penawaran = require("../models/Penawaran");
const Pemesanan = require("../models/Pemesanan");
const Guide = require("../models/Guide");

exports.createPenawaran = async (req, res) => {
  try {
    const { id_pemesanan, id_pemandu } = req.body;

    // Cek apakah pemesanan dan pemandu ada
    const pemesanan = await Pemesanan.findById(id_pemesanan);
    const pemandu = await Pemandu.findById(id_pemandu);

    if (!pemesanan || !pemandu) {
      return res
        .status(400)
        .json({ message: "Pemesanan atau Pemandu tidak ditemukan." });
    }

    // Membuat penawaran baru
    const penawaran = new Penawaran({
      id_pemesanan,
      id_pemandu,
      status_penawaran: "Pending",
    });

    // Menyimpan penawaran ke database
    const savedPenawaran = await penawaran.save();
    res.status(201).json(savedPenawaran);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create Penawaran", error });
  }
};

exports.updatePenawaranStatus = async (req, res) => {
  try {
    const { id_penawaran, status_penawaran } = req.body;

    // Validasi status
    if (!["Accepted", "Rejected"].includes(status_penawaran)) {
      return res.status(400).json({ message: "Status Penawaran tidak valid." });
    }

    // Update status penawaran
    const updatedPenawaran = await Penawaran.findByIdAndUpdate(
      id_penawaran,
      { status_penawaran },
      { new: true }
    );

    if (!updatedPenawaran) {
      return res.status(404).json({ message: "Penawaran tidak ditemukan." });
    }

    res.status(200).json(updatedPenawaran);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update Penawaran", error });
  }
};

exports.getPenawaranByPemandu = async (req, res) => {
  try {
    const { id_pemandu } = req.params;
    const penawaran = await Penawaran.find({ id_pemandu }).populate(
      "id_pemesanan"
    );

    if (!penawaran || penawaran.length === 0) {
      return res.status(404).json({ message: "Penawaran tidak ditemukan." });
    }

    res.status(200).json(penawaran);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve Penawaran", error });
  }
};
