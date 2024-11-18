const fs = require("fs");
const path = require("path");

// Konfigurasi lokasi file log
const logFilePath = path.join(__dirname, "app.log");

// Fungsi untuk mencatat log
function logMessage(message, level = "INFO") {
  const timestamp = new Date().toISOString(); // Tanggal dan waktu sekarang
  const logEntry = `[${timestamp}] [${level}] ${message}\n`;

  // Tampilkan log di konsol
  console.log(logEntry);

  // Simpan log ke file
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error(`[ERROR] Failed to write log to file: ${err.message}`);
    }
  });
}

// Fungsi log untuk level tertentu
function info(message) {
  logMessage(message, "INFO");
}

function warn(message) {
  logMessage(message, "WARN");
}

function error(message) {
  logMessage(message, "ERROR");
}

// Ekspor fungsi log
module.exports = { info, warn, error };
