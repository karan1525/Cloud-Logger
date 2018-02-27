const keys = require('./config/keys');
const mongoose = require ('mongoose');
const Log = require('./models/Log.js');
const fs = require('fs');

function file_upload(userId, file) {
  var instance = new Log();
  instance.userId = userId;
  instance.logFile = fs.readFileSync(file);
  // instance.userId = profile.id;
  // instance.name = profile.displayName;
  // instance.email = profile.emails[0].value;
  // instance.imageUrl = profile.photos[0].value;
  instance.save(function (err) {
    console.log(err);
  });
}

modules.exports{
  file_upload
}
