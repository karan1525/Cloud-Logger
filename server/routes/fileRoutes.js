const fs = require('fs');
const fileFunctions = require('../file/fileFunctions.js');
const formidable = require('formidable');

module.exports = app => {
  app.post('/upload', function(req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      if (err) {
        console.log(err.stack);
        res.status(500).send('parsing failed');
      }

      fs.readFile(files.fileUploaded.path, function(err, data) {
        if (err) {
          console.log(err.stack);
          res.status(500).send('upload failed');
        }

        fileFunctions.file_upload(fields.userId, data);
      });
    });

    res.status(200).send('file was uploaded');
  });
};
