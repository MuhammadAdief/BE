const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// Route untuk mendapatkan semua chat
router.get("/", chatController.getAllChats);

// Route untuk mendapatkan chat berdasarkan ID
router.get("/:id", chatController.getChatById);

// Route untuk membuat chat baru
router.post("/", chatController.createChat);

// Route untuk menghapus chat berdasarkan ID
router.delete("/:id", chatController.deleteChat);

module.exports = router;
