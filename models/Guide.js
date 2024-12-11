const mongoose = require("mongoose");

// Define the schema for Guide
const guideSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    pengalaman: { type: Number, required: true }, // years of experience
    kebiasaan: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    alamat: { type: String, required: true },
    harga: { type: mongoose.Types.Decimal128, required: true },
    status_aktif: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guide", guideSchema);
