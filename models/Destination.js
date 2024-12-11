// models/Destination.js
const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  nama_destinasi: {
    type: String,
    required: true,
  },
  lokasi: {
    type: String,
    required: true,
  },
  harga_tiket: {
    type: Number,
    required: true,
  },
  kategori: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    default: 0.0,
  },
  fasilitas: {
    type: String,
    required: true,
  },
  keterangan: {
    type: String,
    required: true,
  },
});

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
