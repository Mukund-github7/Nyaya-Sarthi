const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dbConnect = require('./config/db');

const app = express();
const PORT = 5001;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json({ limit: '512kb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState });
});

app.use('/api/lexbot', require('./routes/lexbot'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/lawyers', require('./routes/lawyers'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/cases', require('./routes/cases'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'AI Brain Error', message: err.message });
});

async function start() {
  await dbConnect();
  try {
    await seedIfLawyerCollectionEmpty();
  } catch (seedErr) {
    console.error('MVP auto-seed failed (server still starting):', seedErr.message || seedErr);
  }
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
module.exports = app;