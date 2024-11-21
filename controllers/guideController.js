const Guide = require("../models/Guide");
const { validationResult } = require("express-validator");

// Get semua pemandu
exports.getAllGuides = async (req, res) => {
  try {
    const guides = await Guide.find();
    if (!guides || guides.length === 0) {
      return res.status(404).json({ message: "No guides found" });
    }
    res.status(200).json(guides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch guides", error: err });
  }
};

// Menambahkan pemandu Baru
exports.addGuide = async (req, res) => {
  const { name, email, phone, availability } = req.body;

  // Validasi input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const existingGuide = await Guide.findOne({ email });

    if (existingGuide) {
      return res
        .status(400)
        .json({ message: "Guide with this email already exists" });
    }

    const guide = new Guide({
      name,
      email,
      phone,
      availability: availability || true, // Default: available
    });

    await guide.save();
    res.status(201).json({ message: "Guide added successfully", guide });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add guide", error: err });
  }
};

// Perbarui ketersediaan pemandu
exports.updateAvailability = async (req, res) => {
  const { guideId } = req.params;
  const { availability } = req.body;

  if (typeof availability !== "boolean") {
    return res
      .status(400)
      .json({ message: "Availability must be a boolean value" });
  }

  try {
    const guide = await Guide.findById(guideId);

    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    guide.availability = availability;
    await guide.save();

    res
      .status(200)
      .json({ message: "Guide availability updated successfully", guide });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to update guide availability", error: err });
  }
};

// Hapus Pemandu
exports.deleteGuide = async (req, res) => {
  const { guideId } = req.params;

  try {
    const guide = await Guide.findByIdAndDelete(guideId);

    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    res.status(200).json({ message: "Guide deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete guide", error: err });
  }
};