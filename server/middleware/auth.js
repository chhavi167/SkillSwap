// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ ok: false, message: 'No token' });

  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ ok: false, message: 'Invalid token' });
    req.user = user; // attach user to request
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, message: 'Token invalid or expired' });
  }
};
