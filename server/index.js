import express from 'express';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

const app = express();
const PORT = 3000;

const DB_PATH = './server/db.json';

// middleware
app.use(express.json());
app.use(express.static('public'));

// helpers
function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

/* =========================
   CREATE
========================= */
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  const db = readDB();

  const user = {
    id: crypto.randomUUID(),
    name,
    email
  };

  db.users.push(user);
  writeDB(db);

  res.json(user);
});

/* =========================
   READ
========================= */
app.get('/api/users', (req, res) => {
  const db = readDB();
  res.json(db.users);
});

/* =========================
   DELETE
========================= */
app.delete('/api/users/:id', (req, res) => {
  const db = readDB();

  db.users = db.users.filter(u => u.id !== req.params.id);
  writeDB(db);

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
