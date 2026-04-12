const express = require('express');

const router = express.Router();

/** Demo mode: fixed document analysis (no OCR / OpenAI / DB). */
router.post('/analyze', (req, res) => {
  return res.json({
    summary: 'The document is a standard lease agreement.',
    redFlags: [
      'Clause 12: High risk of sudden eviction',
      'Clause 4: Hidden maintenance charges',
    ],
    riskScore: 75,
  });
});

module.exports = router;
