const Destination = require("../models/Destination");

// Get all destinations
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: "Failed to get destinations", error });
  }
};

// Get a single destination by ID
exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: "Failed to get destination", error });
  }
};

// Create a new destination
exports.createDestination = async (req, res) => {
  const {
    nama_destinasi,
    lokasi,
    harga_tiket,
    kategori,
    rate,
    fasilitas,
    keterangan,
  } = req.body;

  try {
    const newDestination = new Destination({
      nama_destinasi,
      lokasi,
      harga_tiket,
      kategori,
      rate,
      fasilitas,
      keterangan,
    });

    await newDestination.save();
    res
      .status(201)
      .json({ message: "Destination created successfully", newDestination });
  } catch (error) {
    res.status(500).json({ message: "Failed to create destination", error });
  }
};

// Update a destination
exports.updateDestination = async (req, res) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDestination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json({
      message: "Destination updated successfully",
      updatedDestination,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update destination", error });
  }
};

// Delete a destination
exports.deleteDestination = async (req, res) => {
  try {
    const deletedDestination = await Destination.findByIdAndDelete(
      req.params.id
    );
    if (!deletedDestination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete destination", error });
  }
};
