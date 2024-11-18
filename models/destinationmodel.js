const mongoose = require('mongoose');

// Skema untuk koleksi 'destinations'
const DestinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    accessible: { type: Boolean, default: true }
});

// Ekspor model
module.exports = mongoose.model('Destination', DestinationSchema);
