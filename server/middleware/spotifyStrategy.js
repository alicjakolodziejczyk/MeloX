const passport = require('passport');
const { Strategy: SpotifyStrategy } = require('passport-spotify');

const { User } = require('../models/user');

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.SPOTIFY_CALLBACK_URL
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ spotifyId: profile.id });

        if (!user) {
          // Create a new user if they don't exist
          user = new User({
            spotifyId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
          });
          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

module.exports = passport.authenticate('spotify', { scope: ['user-read-email'] });