const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const mongoose = require ('mongoose');
const User = require('./models/User.js');
const fileFunctions = require('./file/fileFunctions.js')
const fs = require('fs');
const app = express();

//connect to mLab with mongoose
mongoose.connect(keys.mongoUrl);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'mLab connection error'));

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) =>{
        // console.log('access token', accessToken);
        // console.log('refresh token', refreshToken);
        // console.log('profile: ', profile);
        // console.log('------------------')
        User.count({userId: profile.id}, function (err, count){
          if(count==0){
            var instance = new User();
            instance.userId = profile.id;
            instance.name = profile.displayName;
            instance.email = profile.emails[0].value;
            instance.imageUrl = profile.photos[0].value;
            instance.save(function (err) {
              if (err)
                console.log(err);
            });
          }
        });
        }
    )
);

app.post('/test', function(req,res) {
  fs.readFile("/Users/cdub/Desktop/test.txt", function (err, data) {
      fileFunctions.file_upload('dummyUserId' , data)

  });
//
});

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback', passport.authenticate('google'));
const PORT = process.env.PORT || 5000;
app.listen(5000);
