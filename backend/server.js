const express = require('express');
const cors = require('cors');
const db = require('./database');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Welcome to Orbit API!');
});

app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/products/:id', (req, res) => {
  db.get("SELECT * FROM products WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "Product not found" });
    res.json(row);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
