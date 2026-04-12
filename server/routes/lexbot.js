const express = require('express');

const router = express.Router();

/** Demo mode: fixed LexBot response (no OpenAI / DB). */
router.post('/chat', (req, res) => {
  return res.json({
    reply:
      "Based on Indian Law, your situation falls under Property Law. You should review your rental agreement for a 'Notice Period' clause. This is a Medium severity issue.",
    legalDomain: 'Property Law',
    severityLevel: 'Medium',
    citedLaws: ['Rent Control Act', 'Transfer of Property Act'],
  });
});

module.exports = router;
