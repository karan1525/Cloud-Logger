const passport = require('passport');
const fs = require('fs');
const fileFunctions = require('../file/fileFunctions.js');
module.exports = app => {
  app.post('/test', function(req, res) {
    fs.readFile('/Users/cdub/Desktop/test.txt', function(err, data) {
      fileFunctions.file_upload('dummyUserId', data);
    });
    res.status(200).send('file was uploaded');
  });
};
