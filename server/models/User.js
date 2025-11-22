// server/models/User.js
const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, default: 'beginner' } // beginner|intermediate|advanced
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  photo: String,
  googleId: String,
  bio: { type: String, default: '' },
  roles: { type: [String], default: ['learner'] },
  skillsTeach: [SkillSchema],
  skillsLearn: [String],
  hourlyRate: { type: Number, default: 0 },
  availability: { type: Boolean, default: false },
  stripeAccountId: String
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
