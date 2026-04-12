const mongoose = require('mongoose');

function parseObjectId(raw) {
  if (!raw || !mongoose.Types.ObjectId.isValid(raw)) return null;
  return new mongoose.Types.ObjectId(raw);
}

function requireUserId(req, res, next) {
  const id = parseObjectId(req.get('x-user-id'));
  if (!id) {
    return res.status(401).json({
      error: 'Unauthorized',
      hint: 'Send a valid MongoDB user id in the X-User-Id header until app auth is wired.',
    });
  }
  req.userId = id;
  next();
}

module.exports = { requireUserId, parseObjectId };
