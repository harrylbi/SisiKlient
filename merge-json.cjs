const fs = require('fs');
const path = require('path');

const dbFolder = path.join(__dirname, 'db');
const outputFile = path.join(__dirname, 'db.json');

// Ambil semua file JSON dalam folder /db
const files = fs.readdirSync(dbFolder).filter(f => f.endsWith('.json'));

const combined = {};

// Gabungkan semua file JSON menjadi satu objek
files.forEach(file => {
  const key = path.basename(file, '.json').toLowerCase(); // Lowercase agar cocok dengan URL JSON Server
  const content = fs.readFileSync(path.join(dbFolder, file), 'utf-8');
  combined[key] = JSON.parse(content);
});

// Tulis hasil gabungan ke db.json
fs.writeFileSync(outputFile, JSON.stringify(combined, null, 2));

console.log('✅ Berhasil generate db.json dari folder /db (pakai lowercase key)');
