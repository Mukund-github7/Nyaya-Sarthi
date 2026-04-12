const express = require('express');

const router = express.Router();

/** Fail-safe stub: UI expects an immediate success response. */
router.post('/', (req, res) => {
  return res.json({ success: true });
});

module.exports = router;
