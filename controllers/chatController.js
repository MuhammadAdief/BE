const Chat = require("../models/Chat");

// Mendapatkan semua chat
exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find().populate(
      "id_pemandu id_pengguna",
      "nama profile_picture"
    );
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan chat berdasarkan ID
exports.getChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findById(id).populate(
      "id_pemandu id_pengguna",
      "nama profile_picture"
    );
    if (!chat) {
      return res.status(404).json({ message: "Chat tidak ditemukan" });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat chat baru
exports.createChat = async (req, res) => {
  try {
    const { id_pemandu, id_pengguna, profile_picture, isi_chat } = req.body;

    // Validasi input
    if (!id_pemandu || !id_pengguna || !isi_chat) {
      return res
        .status(400)
        .json({ message: "Harap isi semua field yang diperlukan" });
    }

    const newChat = new Chat({
      id_pemandu,
      id_pengguna,
      profile_picture,
      isi_chat,
    });

    const savedChat = await newChat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus chat berdasarkan ID
exports.deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChat = await Chat.findByIdAndDelete(id);
    if (!deletedChat) {
      return res.status(404).json({ message: "Chat tidak ditemukan" });
    }
    res.status(200).json({ message: "Chat berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
