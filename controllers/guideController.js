const Guide = require("../models/Guide");

// Get all guides
exports.getAllGuides = async (req, res) => {
  try {
    const guides = await Guide.find();
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ message: "Error fetching guides", error });
  }
};

// Get a single guide by ID
exports.getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }
    res.status(200).json(guide);
  } catch (error) {
    res.status(500).json({ message: "Error fetching guide", error });
  }
};

// Create a new guide
exports.createGuide = async (req, res) => {
  const { nama, pengalaman, kebiasaan, gender, alamat, harga, status_aktif } =
    req.body;

  try {
    const newGuide = new Guide({
      nama,
      pengalaman,
      kebiasaan,
      gender,
      alamat,
      harga,
      status_aktif,
    });

    await newGuide.save();
    res.status(201).json(newGuide);
  } catch (error) {
    res.status(500).json({ message: "Error creating guide", error });
  }
};

// Update a guide
exports.updateGuide = async (req, res) => {
  const { nama, pengalaman, kebiasaan, gender, alamat, harga, status_aktif } =
    req.body;

  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    guide.nama = nama || guide.nama;
    guide.pengalaman = pengalaman || guide.pengalaman;
    guide.kebiasaan = kebiasaan || guide.kebiasaan;
    guide.gender = gender || guide.gender;
    guide.alamat = alamat || guide.alamat;
    guide.harga = harga || guide.harga;
    guide.status_aktif = status_aktif || guide.status_aktif;

    await guide.save();
    res.status(200).json(guide);
  } catch (error) {
    res.status(500).json({ message: "Error updating guide", error });
  }
};

// Delete a guide
exports.deleteGuide = async (req, res) => {
  try {
    const guide = await Guide.findByIdAndDelete(req.params.id);
    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }
    res.status(200).json({ message: "Guide deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting guide", error });
  }
};
