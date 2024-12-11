const express = require("express");
const router = express.Router();
const guideController = require("../controllers/guideController");

// Get all guides
router.get("/guides", guideController.getAllGuides);

// Get a guide by ID
router.get("/guides/:id", guideController.getGuideById);

// Create a new guide
router.post("/guides", guideController.createGuide);

// Update a guide
router.put("/guides/:id", guideController.updateGuide);

// Delete a guide
router.delete("/guides/:id", guideController.deleteGuide);

module.exports = router;
