const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

// Inisialisasi aplikasi Express
const app = express();

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Rute dasar untuk menangani GET ke '/'
app.get('/', (req, res) => {
  res.send('Hello World! Server is running.');
});

// Middleware dan routing lainnya (misalnya userRoutes)
app.use(express.json());

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
