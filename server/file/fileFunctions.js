const mongoose = require("mongoose");
const Log = mongoose.model("Log");
const fs = require("fs");

function file_upload(id, fileName, file) {
  const log = new Log({
    userId: id,
    logFileName: fileName,
    logFile: file
  });
  log.save();
}

function file_delete(userId, fileName) {
  Log.findOneAndRemove(
    { userId: userId, logFileName: fileName },
    (err, file) => {
      if (err) throw err;

      if (file) {
        console.log("file removed");
      } else {
        console.log("file not found");
      }
    }
  );
}

function file_overwrite(userId, fileName, file) {
  Log.findOneAndUpdate(
    { userId: userId, logFileName: fileName },
    { logFile: file },
    (err, file) => {
      if (err) throw err;

      if (file) {
        console.log("file overwrote");
      } else {
        console.log("file not found");
      }
    }
  );
}

function file_find(userId, fileName, callback) {
  Log.find({ userId: userId }, (err, files) => {
    if (err) callback(err, false);

    if (files) {
      if (files.length >= 2) {
        callback(err, "maxLimit");
      } else {
        if (files.filter(x => x.logFileName == fileName).length >= 1) {
          callback(err, "fileNameExist");
        } else {
          callback(err, "validFile");
        }
      }
    } else {
      callback(err, "validFile");
    }
  });
}

function file_rename(userId, oldFileName, newFileName) {
  Log.findOneAndUpdate(
    { userId: userId, logFileName: oldFileName },
    { logFileName: newFileName },
    (err, entry) => {
      if (err) throw err;

      if (entry) {
        console.log("file renamed");
      } else {
        console.log("file not found");
      }
    }
  );
}

module.exports = {
  file_upload,
  file_delete,
  file_overwrite,
  file_find,
  file_rename
};
