const Log = require('.././models/Log.js');
const fs = require('fs');

function file_upload(userId, file) {
  var instance = new Log();
  instance.userId = userId;
  instance.logFile = file;
  // instance.userId = profile.id;
  // instance.name = profile.displayName;
  // instance.email = profile.emails[0].value;
  // instance.imageUrl = profile.photos[0].value;
  instance.save(function (err) {
    if (err)
      console.log(err);
  });
}

module.exports = {
  file_upload
}
