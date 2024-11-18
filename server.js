const express = require('express');
const mongoose = require('mongoose');

// Inisialisasi aplikasi Express
const app = express();
app.use(express.json()); // Middleware untuk parsing JSON

// Konfigurasi port
const PORT = 5000;

// URI MongoDB (ganti dengan URI Anda)
const MONGO_URI = 'mongodb+srv://daffafariz:Password123@cluster1.pquyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

// Koneksi ke MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));


// Skema dan Model MongoDB untuk koleksi 'destinations'
const DestinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    accessible: { type: Boolean, default: true }
});
const Destination = mongoose.model('Destination', DestinationSchema);

// Endpoint untuk mendapatkan semua data dari koleksi 'destinations'
app.get('/destinations', async (req, res) => {
    try {
        const destinations = await Destination.find(); // Mengambil semua data
        res.json(destinations); // Kirim data dalam format JSON
    } catch (err) {
        res.status(500).json({ message: 'Error fetching data', error: err });
    }
});

// Endpoint untuk menambahkan data baru ke koleksi 'destinations'
app.post('/destinations', async (req, res) => {
    try {
        const newDestination = new Destination(req.body); // Buat dokumen baru
        const savedDestination = await newDestination.save(); // Simpan ke database
        res.status(201).json(savedDestination); // Kirim data yang disimpan sebagai respon
    } catch (err) {
        res.status(400).json({ message: 'Error saving data', error: err });
    }
});

// Endpoint dasar untuk memastikan server berjalan
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
