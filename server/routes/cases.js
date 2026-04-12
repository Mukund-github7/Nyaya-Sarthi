const express = require('express');
const mongoose = require('mongoose');
const dbConnect = require('../config/db');
const { requireUserId } = require('../middleware/requireUserId');
const Case = require('../models/Case');

const router = express.Router();

const CASE_DOMAINS = [
  'criminal',
  'civil',
  'family',
  'consumer',
  'property',
  'cyber',
  'labour',
  'constitutional',
];

const CASE_STATUSES = ['open', 'active', 'hearing', 'decided', 'closed'];

function timelineActor(req) {
  const role = (req.get('x-user-role') || 'user').toLowerCase();
  if (role === 'lawyer') return 'lawyer';
  return 'user';
}

/** TRD §4.6 — List cases for user */
router.get('/', requireUserId, async (req, res) => {
  try {
    await dbConnect();

    const page = Math.max(1, parseInt(String(req.query.page || '1'), 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(String(req.query.limit || '10'), 10) || 10));
    const skip = (page - 1) * limit;

    const filter = { userId: req.userId };
    if (req.query.status && CASE_STATUSES.includes(String(req.query.status))) {
      filter.status = req.query.status;
    }
    if (req.query.legalDomain && CASE_DOMAINS.includes(String(req.query.legalDomain))) {
      filter.legalDomain = req.query.legalDomain;
    }

    const [cases, total] = await Promise.all([
      Case.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit).lean(),
      Case.countDocuments(filter),
    ]);

    return res.json({
      cases,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (err) {
    console.error('GET /cases error:', err);
    return res.status(500).json({ error: 'Failed to list cases' });
  }
});

/** TRD §4.6 — Create case */
router.post('/', requireUserId, async (req, res) => {
  try {
    await dbConnect();

    const { title, description, legalDomain, caseNumber, courtName, sourceSessionId } = req.body || {};

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'title is required' });
    }
    if (!description || typeof description !== 'string' || !description.trim()) {
      return res.status(400).json({ error: 'description is required' });
    }
    if (!legalDomain || !CASE_DOMAINS.includes(String(legalDomain))) {
      return res.status(400).json({ error: 'valid legalDomain is required' });
    }

    const c = await Case.create({
      userId: req.userId,
      title: title.trim(),
      description: description.trim(),
      legalDomain,
      caseNumber: caseNumber && String(caseNumber).trim() ? String(caseNumber).trim() : null,
      courtName: courtName && String(courtName).trim() ? String(courtName).trim() : null,
      sourceSessionId:
        sourceSessionId && String(sourceSessionId).trim()
          ? String(sourceSessionId).trim()
          : null,
    });

    return res.status(201).json({ case: c });
  } catch (err) {
    console.error('POST /cases error:', err);
    return res.status(500).json({ error: 'Failed to create case' });
  }
});

/** TRD §4.6 — Partial update */
router.patch('/:id', requireUserId, async (req, res) => {
  try {
    await dbConnect();

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid case id' });
    }

    const existing = await Case.findOne({ _id: id, userId: req.userId });
    if (!existing) {
      return res.status(404).json({ error: 'Case not found' });
    }

    const allowed = ['status', 'nextHearingDate', 'courtName', 'lawyerId', 'caseNumber', 'title', 'description'];
    const update = {};
    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        update[key] = req.body[key];
      }
    }

    if (update.status != null && !CASE_STATUSES.includes(update.status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    if (update.lawyerId != null && !mongoose.Types.ObjectId.isValid(String(update.lawyerId))) {
      return res.status(400).json({ error: 'Invalid lawyerId' });
    }
    if (update.nextHearingDate != null) {
      const d = new Date(update.nextHearingDate);
      if (Number.isNaN(d.getTime())) {
        return res.status(400).json({ error: 'Invalid nextHearingDate' });
      }
      update.nextHearingDate = d;
    }

    const updated = await Case.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    );

    return res.json({ case: updated });
  } catch (err) {
    console.error('PATCH /cases/:id error:', err);
    return res.status(500).json({ error: 'Failed to update case' });
  }
});

/** TRD §4.6 — Timeline entry */
router.post('/:id/timeline', requireUserId, async (req, res) => {
  try {
    await dbConnect();

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid case id' });
    }

    const { date, event } = req.body || {};
    if (!date) {
      return res.status(400).json({ error: 'date is required' });
    }
    if (!event || typeof event !== 'string' || !event.trim()) {
      return res.status(400).json({ error: 'event is required' });
    }

    const when = new Date(date);
    if (Number.isNaN(when.getTime())) {
      return res.status(400).json({ error: 'date must be a valid date' });
    }

    const actor = timelineActor(req);
    const updated = await Case.findOneAndUpdate(
      { _id: id, userId: req.userId },
      {
        $push: {
          timeline: {
            date: when,
            event: event.trim(),
            addedBy: actor,
            addedById: req.userId,
          },
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Case not found' });
    }

    return res.status(201).json({ case: updated });
  } catch (err) {
    console.error('POST /cases/:id/timeline error:', err);
    return res.status(500).json({ error: 'Failed to update timeline' });
  }
});

module.exports = router;
