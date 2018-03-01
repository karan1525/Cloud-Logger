const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('User');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.count({ userId: profile.id }, function(err, count) {
        if (count == 0) {
          var instance = new User();
          instance.userId = profile.id;
          instance.name = profile.displayName;
          instance.email = profile.emails[0].value;
          instance.imageUrl = profile.photos[0].value;
          instance.save(function(err) {
            if (err) console.log(err);
          });
        }
      });
    }
  )
);
