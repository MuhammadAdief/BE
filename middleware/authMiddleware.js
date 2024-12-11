const jwt = require("jsonwebtoken");

// Middleware untuk memverifikasi token JWT
exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Akses ditolak, token tidak ditemukan" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Menyimpan data user dari token

    next();
  } catch (error) {
    res.status(401).json({ message: "Token tidak valid" });
  }
};

// Middleware untuk memverifikasi role tertentu
exports.verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ message: "Akses ditolak, role tidak sesuai" });
    }
    next();
  };
};
