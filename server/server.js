// server/server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const session = require('express-session');
const passportInit = require('./config/passport');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(helmet());
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

// CORS
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cors());

// Session (required for Passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard_cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
}));

// Initialize passport
passportInit();
app.use(passport.initialize());
app.use(passport.session());

const auth = require('./middleware/auth');
app.get('/api/profile', auth, (req, res) => {
  res.json({ ok: true, user: req.user });
});

// Routes
app.use('/auth', authRoutes);

// Health
app.get('/api/ping', (req, res) => res.json({ ok: true, ts: Date.now() }));
app.get('/', (req, res) => res.send('SkillSwap server is running'));

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
