// models/Guide.js
const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  no_telepon: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pengalaman: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const Guide = mongoose.model("Guide", guideSchema);

module.exports = Guide;
