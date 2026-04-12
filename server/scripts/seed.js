/**
 * CLI: full re-seed (wipes prior seed emails / lawyers / tagged case studies, then inserts).
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const mongoose = require('mongoose');
const dbConnect = require('../config/db');
const { runMvpSeed } = require('../lib/mvpSeed');

dbConnect()
  .then(() => runMvpSeed({ wipe: true }))
  .then(() => mongoose.connection.close())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
