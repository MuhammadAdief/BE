// models/Pemesanan.js
const mongoose = require("mongoose");

const pemesananSchema = new mongoose.Schema({
  id_pengguna: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id_pemandu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
    required: true,
  },
  id_destinasi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  tanggal_pemesanan: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
});

const Pemesanan = mongoose.model("Pemesanan", pemesananSchema);

module.exports = Pemesanan;
