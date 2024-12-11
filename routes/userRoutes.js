const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");

// Mendapatkan semua pengguna (hanya admin yang dapat mengakses)
router.get("/", verifyToken, verifyRole("admin"), userController.getAllUsers);

// Mendapatkan data pengguna berdasarkan ID
router.get("/:id", verifyToken, userController.getUserById);

// Memperbarui data pengguna berdasarkan ID
router.put("/:id", verifyToken, userController.updateUser);

// Menghapus pengguna berdasarkan ID
router.delete(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  userController.deleteUser
);

module.exports = router;
