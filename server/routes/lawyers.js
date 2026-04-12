const express = require('express');
const dbConnect = require('../config/db');
const Lawyer = require('../models/Lawyer');
const { requireUserId } = require('../middleware/requireUserId');

const router = express.Router();

const SPECIALIZATION_ENUM = [
  'criminal',
  'civil',
  'family',
  'consumer',
  'property',
  'cyber',
  'labour',
  'constitutional',
  'corporate',
  'tax',
  'immigration',
  'human_rights',
];

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function computeMatchScore(lawyer, isEmergency) {
  const base = 1.0;
  const ratingPart = (Number(lawyer.rating) || 0) / 5;
  const ratingWeight = ratingPart * 0.3;
  const bonus =
    isEmergency && lawyer.isEmergencyAvailable ? 0.2 : 0;
  const raw = base + ratingWeight + bonus;
  const normalized = Math.round(Math.min(1, raw / 1.5) * 100) / 100;
  return { raw, matchScore: normalized };
}

/** Demo mode: all lawyers, no query filters. */
router.get('/', async (req, res) => {
  try {
    await dbConnect();
    return res.json(await Lawyer.find({}));
  } catch (err) {
    console.error('GET /lawyers error:', err);
    return res.status(500).json({ error: 'Failed to list lawyers' });
  }
});

/** TRD §4.4 — Smart match (top 3 verified) */
router.post('/match', requireUserId, async (req, res) => {
  try {
    await dbConnect();

    const { legalDomain, city, isEmergency = false } = req.body || {};

    if (!legalDomain || typeof legalDomain !== 'string') {
      return res.status(400).json({ error: 'legalDomain is required' });
    }

    const domain = legalDomain.trim();
    const filter = { isVerified: true };

    if (SPECIALIZATION_ENUM.includes(domain)) {
      filter.specializations = domain;
    }

    if (city && typeof city === 'string' && city.trim()) {
      filter['location.city'] = new RegExp(`^${escapeRegex(city.trim())}$`, 'i');
    }

    const candidates = await Lawyer.find(filter)
      .populate('userId', 'name avatar email')
      .lean();

    const isEmergencyFlag = Boolean(isEmergency);

    const ranked = candidates
      .map((lawyer) => {
        const { raw, matchScore } = computeMatchScore(lawyer, isEmergencyFlag);
        return { lawyer, raw, matchScore };
      })
      .sort((a, b) => b.raw - a.raw || (b.lawyer.rating || 0) - (a.lawyer.rating || 0))
      .slice(0, 3)
      .map((row, index) => ({
        rank: index + 1,
        lawyer: row.lawyer,
        matchScore: row.matchScore,
      }));

    return res.json({ matches: ranked });
  } catch (err) {
    console.error('POST /lawyers/match error:', err);
    return res.status(500).json({ error: 'Failed to match lawyers' });
  }
});

module.exports = router;
