const mongoose = require('mongoose');
const Log = mongoose.model('Log');
const fs = require('fs');


function file_upload(id, file) {
  const log = new Log({
    userId: id,
    logFile: file
  });
  log.save();
}

module.exports = {
  file_upload
};
