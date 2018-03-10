const mongoose = require('mongoose');
const Log = mongoose.model('Log');
const fs = require('fs');

function file_upload(id, file) {
  const log = new Log({
    userId: id,
    logFile: file,
  });
  log.save();
}

function file_delete(fileId){
  Log.findByIdAndRemove(fileId, (err, file)=>{
    if (err) throw err;

    console.log("file removed");

    });
}

module.exports = {
  file_upload, file_delete
};
