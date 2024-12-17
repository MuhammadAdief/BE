const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    id_pengguna: { type: String, required: true, ref: "User" },
    id_destinasi: { type: String, required: true, ref: "Destinasi" },
    profile_picture: { type: String, default: "" },
    star_rate: { type: Number, required: true, min: 0, max: 5 },
    komen: { type: String, default: "" }
  },
  { timestamps: true } // Untuk createdAt & updatedAt otomatis
);

module.exports = mongoose.model("Rating", ratingSchema);
