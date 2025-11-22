// server/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => {
    // req.user is set by Passport
    const user = req.user;
    // sign a JWT that frontend can use for API calls
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Redirect to the client with token in URL fragment
    res.redirect(`${process.env.CLIENT_URL}/auth/success#token=${token}`);
  }
);

// Optional: return user info if session cookie is active (used when session-based)
router.get('/me', (req, res) => {
  if (!req.user) return res.status(401).json({ ok: false });
  const safe = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    photo: req.user.photo,
    roles: req.user.roles,
    skillsTeach: req.user.skillsTeach
  };
  res.json({ ok: true, user: safe });
});

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect(process.env.CLIENT_URL);
  });
});

module.exports = router;
