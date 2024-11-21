const {
    getAllGuides,
    addGuide,
    updateAvailability,
    deleteGuide,
  } = require("../controllers/guideController");
  const verifyToken = require("../middleware/authMiddleware"); // Middleware untuk verifikasi token
  