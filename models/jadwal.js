const mongoose = require("mongoose");

// Skema untuk Jadwal
const jadwalSchema = new mongoose.Schema(
  {
    id_penawaran: {
      type: String,
      required: [true, "Penawaran ID is required"],
    },
    id_pemandu: {
      type: String,
      required: [true, "Guide ID is required"],
    },
    tanggal: {
      type: Date,
      required: [true, "Tanggal is required"],
    },
  },
  { timestamps: true } // Menambahkan createdAt dan updatedAt
);

// Ekspor model
module.exports = mongoose.model("Jadwal", jadwalSchema);
