// models/Chat.js

const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  id_chat: {
    type: String,
    required: true,
    unique: true,
  },
  id_pemandu: {
    type: String,
    required: true,
    ref: "Pemandu",
  },
  id_pengguna: {
    type: String,
    required: true,
    ref: "User",
  },
  profile_picture: {
    type: String,
  },
  isi_chat: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
