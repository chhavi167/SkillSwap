// server/config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

module.exports = function initPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_ROOT_URL}/auth/google/callback`
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const googleId = profile.id;
          const email = profile.emails && profile.emails[0] && profile.emails[0].value;

          // try find user by googleId or email (prevents duplicate accounts)
          let user = await User.findOne({ googleId }) || (email && await User.findOne({ email }));

          if (user) {
            // attach googleId if previously signed up with email
            if (!user.googleId) {
              user.googleId = googleId;
              await user.save();
            }
            return done(null, user);
          }

          // create new user
          const newUser = await User.create({
            googleId,
            name: profile.displayName,
            email,
            photo: profile.photos && profile.photos[0] && profile.photos[0].value
          });

          return done(null, newUser);
        } catch (err) {
          console.error('Passport Google error', err);
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
