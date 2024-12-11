const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Fungsi untuk registrasi
exports.register = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    // Validasi input
    if (!nama || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Harap isi semua field yang diperlukan" });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = new User({ nama, email, password: hashedPassword, role });
    const savedUser = await newUser.save();

    res.status(201).json({ message: "Registrasi berhasil", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fungsi untuk login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email dan password harus diisi" });
    }

    // Cek apakah user terdaftar
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Periksa password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password salah" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ message: "Login berhasil", token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
