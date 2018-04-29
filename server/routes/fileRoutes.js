const fs = require('fs');
const fileFunctions = require('../file/fileFunctions.js');
const formidable = require('formidable');
const readline = require('readline');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  //upload new file
  app.post('/api/upload', requireLogin, function(req, res) {
    const form = new formidable.IncomingForm();
    form.maxFileSize = 16 * 1024 * 1024;

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
            res.status(400).send('user has reached a max limit');
          } else if (valid == 'fileNameExist') {
            res.status(400).send('fileName already exist');
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
  app.put('/api/rename', requireLogin, function(req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      if (err) {
        console.log(err.stack);
        res.status(500).send('parsing failed');
      }

      fileFunctions.file_rename(
        req.user.userId,
        fields.oldFileName,
        fields.newFileName,
        found => {
          if (found) res.status(200).send('file renamed');
          else res.status(400).send('file not found');
        }
      );
    });
  });

  //overwrite existing file
  app.put('/upload/overwrite', requireLogin, function(req, res) {
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

  app.delete('/api/delete', requireLogin, function(req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      if (err) {
        console.log(err.stack);
        res.status(500).send('parsing failed');
      }

      fileFunctions.file_delete(req.user.userId, fields.fileName);

      res.status(200).send('file delete successful');
    });
  });

  // app.get('/files/:userId', function(req, res) {
  //   fileFunctions.file_getAllFiles(req.params.userId, function(err, data) {
  //     if (err) res.status(500).send('cannot find files');
  //
  //     res.status(200).send(data);
  //   });
  // });

  app.get('/api/files', requireLogin, async (req, res) => {
    fileFunctions.file_getAllFiles(req.user.userId, (err, data) => {
      if (err) res.status(500).send('cannot find files');

      res.status(200).send(data);
    });
  });

  //get file and return as JSON object
  app.get('/file/:userId/:fileName', requireLogin, function(req, res) {
    fileFunctions.file_get(req.params.userId, req.params.fileName, function(
      err,
      file
    ) {
      if (err) res.status(500).send('cannot find file');
      res.status(200).send(file);
    });
  });

  app.post('/api/analyze/error', function(req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      fileFunctions.file_get(req.user.userId, fields.fileName, function(
        err,
        file
      ) {
        if (err) res.status(500).send('cannot find file');
        const buffer = Buffer.from(file.logFile.data);

        const strings = buffer
          .toString('utf8')
          .split('\n')
          .filter(s => s.length > 6);
        const applications = new Map();
        const month = new Map([
          ['Jan', '01'],
          ['Feb', '02'],
          ['Mar', '03'],
          ['Apr', '04'],
          ['May', '05'],
          ['Jun', '06'],
          ['Jul', '07'],
          ['Aug', '08'],
          ['Sep', '09'],
          ['Oct', '10'],
          ['Nov', '11'],
          ['Dec', '12']
        ]);
        var range = null;
        if (fields.start != null) {
          range = moment.range(fields.start, fields.end);
        }
        var year = 0;

        for (var i = 0; i < strings.length; i++) {
          var bool = true;
          const tokens = strings[i].split(' ');
          if (fields.start != null) {
            if (i == 0) year = tokens[5].substring(0, 4);
            //console.log(tokens[0]+ " "+tokens[1]+tokens[2])
            var d =
              year +
              '-' +
              month.get(tokens[0]) +
              '-' +
              tokens[1] +
              ' ' +
              tokens[2];
            //console.log(d)
            const date = moment(d);
            if (range.contains(date)) {
              bool = true;
            } else {
              bool = false;
            }
          }

          if (bool == true) {
            if (!applications.has(tokens[4])) {
              applications.set(
                tokens[4],
                new Map([
                  ['exception', 0],
                  ['warn', 0],
                  ['error', 0],
                  ['fail/failure', 0],
                  ['unauthorized', 0],
                  ['timeout', 0],
                  ['refused', 0],
                  ['NoSuchPageException', 0],
                  ['404', 0],
                  ['401', 0],
                  ['501', 0]
                ])
              );
            }

            const counts = applications.get(tokens[4]);

            tokens.map(t => {
              //console.log(t)
              if (t.search(/exception/i) >= 0) {
                counts.set('exception', counts.get('exception') + 1);
              } else if (t.search(/warn/i) >= 0) {
                counts.set('warn', counts.get('warn') + 1);
              } else if (t.search(/error/i) >= 0) {
                counts.set('error', counts.get('error') + 1);
              } else if (t.search(/fail/i) >= 0 || t.search(/failure/i) >= 0) {
                counts.set('fail/failure', counts.get('fail/failure') + 1);
              } else if (t.search(/unauthorized/i) >= 0) {
                counts.set('unauthorized', counts.get('unauthorized') + 1);
              } else if (t.search(/timeout/i) >= 0) {
                counts.set('timeout', counts.get('timeout') + 1);
              } else if (t.search(/refused/i) >= 0) {
                counts.set('refused', counts.get('refused') + 1);
              } else if (t.search(/NoSuchPageException/i) >= 0) {
                counts.set(
                  'NoSuchPageException',
                  counts.get('NoSuchPageException') + 1
                );
              } else if (t == '404') {
                counts.set('404', counts.get('404') + 1);
              } else if (t == '401') {
                counts.set('401', counts.get('401') + 1);
              } else if (t == '500') {
                counts.set('500', counts.get('500') + 1);
              }
            });
          }
        }

        const mapToObj = aMap => {
          const obj = {};
          aMap.forEach((value, key) => {
            obj[key] = value;
          });
          return obj;
        };

        applications.forEach((value, key) => {
          applications.set(key, mapToObj(value));
        });

        res.status(200).send(JSON.stringify(mapToObj(applications)));
      });
    });
  });

  app.post('/api/analyze/usage', function(req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      fileFunctions.file_get(req.user.userId, fields.fileName, function(
        err,
        file
      ) {
        if (err) res.status(500).send('cannot find file');
        const buffer = Buffer.from(file.logFile.data);

        const strings = buffer
          .toString('utf8')
          .split('\n')
          .filter(s => s.length > 6);
        const applications = new Map();

        const month = new Map([
          ['Jan', '01'],
          ['Feb', '02'],
          ['Mar', '03'],
          ['Apr', '04'],
          ['May', '05'],
          ['Jun', '06'],
          ['Jul', '07'],
          ['Aug', '08'],
          ['Sep', '09'],
          ['Oct', '10'],
          ['Nov', '11'],
          ['Dec', '12']
        ]);
        // '2017-08-19 00:00:00', '2017-08-21 00:00:00'
        var range = null;
        if (fields.start != null) {
          range = moment.range(fields.start, fields.end);
        }
        var year = 0;

        for (var i = 0; i < strings.length; i++) {
          var bool = true;
          const tokens = strings[i].split(' ');
          if (fields.start != null) {
            if (i == 0) year = tokens[5].substring(0, 4);
            //console.log(tokens[0]+ " "+tokens[1]+tokens[2])
            var d =
              year +
              '-' +
              month.get(tokens[0]) +
              '-' +
              tokens[1] +
              ' ' +
              tokens[2];
            //console.log(d)
            const date = moment(d);
            if (range.contains(date)) {
              bool = true;
            } else {
              bool = false;
            }
          }

          if (bool == true) {
            if (!applications.has(tokens[4])) {
              applications.set(
                tokens[4],
                new Map([
                  ['DockerServerController', 0],
                  ['DockerVolumeController', 0],
                  ['ProvisionController', 0],
                  ['BlueprintController', 0]
                ])
              );
            }

            const counts = applications.get(tokens[4]);

            tokens.map(t => {
              //console.log(t)
              if (t.search(/DockerServerController/i) >= 0) {
                counts.set(
                  'DockerServerController',
                  counts.get('DockerServerController') + 1
                );
              } else if (t.search(/DockerVolumeController/i) >= 0) {
                counts.set(
                  'DockerVolumeController',
                  counts.get('DockerVolumeController') + 1
                );
              } else if (t.search(/ProvisionController/i) >= 0) {
                counts.set(
                  'ProvisionController',
                  counts.get('ProvisionController') + 1
                );
              } else if (t.search(/BlueprintController/i) >= 0) {
                counts.set(
                  'BlueprintController',
                  counts.get('BlueprintController') + 1
                );
              }
            });
          }
        }

        const mapToObj = aMap => {
          const obj = {};
          aMap.forEach((value, key) => {
            obj[key] = value;
          });
          return obj;
        };

        applications.forEach((value, key) => {
          applications.set(key, mapToObj(value));
        });

        res.status(200).send(JSON.stringify(mapToObj(applications)));
      });
    });
  });
};
