const express = require("express");
const destinationController = require("../controllers/destinationController");

const router = express.Router();

// Routes for destinations
router.get("/", destinationController.getAllDestinations);
router.get("/:id", destinationController.getDestinationById);
router.post("/", destinationController.createDestination);
router.put("/:id", destinationController.updateDestination);
router.delete("/:id", destinationController.deleteDestination);

module.exports = router;
