const fs = require('fs');
const fileFunctions = require('../file/fileFunctions.js');
const requireLogin = require('../middlewares/requireLogin');
const formidable = require('formidable');

module.exports = app => {
  //upload new file
  app.post('/api/upload', function(req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      if (err) {
        console.log(err.stack);
        res.status(500).send('parsing failed');
      }

      //console.log(files.fileUploaded);
      fileFunctions.file_find(
        fields.userId,
        files.fileUploaded.name,
        (err, valid) => {
          if (err) res.status(500).send('file_find error happened');

          if (valid == 'maxLimit') {
            res.status(500).send('user has reached a max limit');
          } else if (valid == 'fileNameExist') {
            res.status(500).send('fileName already exist');
          } else if (valid == 'validFile') {
            fs.readFile(files.fileUploaded.path, function(err, data) {
              if (err) {
                console.log(err.stack);
                return res.status(500).send('upload failed');
              }

              fileFunctions.file_upload(
                fields.userId,
                files.fileUploaded.name,
                data
              );
            });
            res.status(200).send('file was uploaded');
          }
        }
      );
    });
  });

  //rename file
  app.put('/upload/rename/:userId/:oldFileName/:newFileName', function(
    req,
    res
  ) {
    fileFunctions.file_rename(
      req.params.userId,
      req.params.oldFileName,
      req.params.newFileName
    );

    res.status(200).send('file renamed');
  });

  //overwrite existing file
  app.put('/upload/overwrite', function(req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      if (err) throw err;

      fs.readFile(files.fileUploaded.path, function(err, data) {
        if (err) throw err;

        fileFunctions.file_overwrite(
          fields.userId,
          files.fileUploaded.name,
          data
        );
      });
    });

    res.status(200).send('file was overwritten');
  });

  //delete existing file
  app.delete('/delete/file/:userId/:fileName', function(req, res) {
    fileFunctions.file_delete(req.params.userId, req.params.fileName);

    res.status(200).send('file delete successful');
  });

  // app.get('/files/:userId', function(req, res) {
  //   fileFunctions.file_getAllFiles(req.params.userId, function(err, data) {
  //     if (err) res.status(500).send('cannot find files');
  //
  //     res.status(200).send(data);
  //   });
  // });

  app.get('/api/files', requireLogin, async (req, res) => {
    fileFunctions.file_getAllFiles(req.params.userId, (err, data) => {
      if (err) res.status(500).send('cannot find files');

      res.status(200).send(data);
    });
  });
};
