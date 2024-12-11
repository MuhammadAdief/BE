// models/rating.js
const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  id_rating: { type: String, required: true, unique: true },
  id_pengguna: { type: String, required: true, ref: "User" },
  id_destinasi: { type: String, required: true, ref: "Destinasi" },
  profile_picture: { type: String, default: "" },
  star_rate: { type: mongoose.Schema.Types.Decimal128, required: true },
  komen: { type: String, default: "" },
}, { timestamps: true });

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
