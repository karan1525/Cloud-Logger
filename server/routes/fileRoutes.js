const fs = require("fs");
const fileFunctions = require("../file/fileFunctions.js");
const formidable = require("formidable");
const readline = require("readline");

module.exports = app => {
  //upload new file
  app.post("/upload", function(req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      if (err) {
        console.log(err.stack);
        res.status(500).send("parsing failed");
      }

      fileFunctions.file_find(
        fields.userId,
        files.fileUploaded.name,
        (err, valid) => {
          if (err) res.status(500).send("file_find error happened");

          if (valid == "maxLimit") {
            res.status(500).send("user has reached a max limit");
          } else if (valid == "fileNameExist") {
            res.status(500).send("fileName already exist");
          } else if (valid == "validFile") {
            fs.readFile(files.fileUploaded.path, function(err, data) {
              if (err) {
                console.log(err.stack);
                return res.status(500).send("upload failed");
              }

              fileFunctions.file_upload(
                fields.userId,
                files.fileUploaded.name,
                data
              );
            });
            res.status(200).send("file was uploaded");
          }
        }
      );
    });
  });

  //rename file
  app.put("/upload/rename/:userId/:oldFileName/:newFileName", function(
    req,
    res
  ) {
    fileFunctions.file_rename(
      req.params.userId,
      req.params.oldFileName,
      req.params.newFileName
    );

    res.status(200).send("file renamed");
  });

  //overwrite existing file
  app.put("/upload/overwrite", function(req, res) {
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

    res.status(200).send("file was overwritten");
  });

  //delete existing file
  app.delete("/file/:userId/:fileName", function(req, res) {
    fileFunctions.file_delete(req.params.userId, req.params.fileName);

    res.status(200).send("file delete successful");
  });

  //get file and return as JSON object
  app.get("/file/:userId/:fileName", function(req, res) {
    fileFunctions.file_get(req.params.userId, req.params.fileName, function(err,file) {
      if (err) res.status(500).send("cannot find file");
      res.status(200).send(file);
    });
  });

  app.get("/analyze/file/:userId/:fileName", function(req, res) {
    fileFunctions.file_get(req.params.userId, req.params.fileName, function(err,file) {
      if (err) res.status(500).send("cannot find file");
      const buffer = Buffer.from(file.logFile.data);

      const strings = buffer
        .toString("utf8")
        .split("\n")
        .filter(s => s.length > 6);
      const applications = new Map();

      /*[0]- exception;[1]- warn; [2]- error; [3]- fail/failure; 
      **[4]- unauthorized; [5]- timeout; [6]- refused; 
      **[7]- NoSuchPageException; [8]- 404; [9]- 401; [10]- 500
      */

      for (var i = 0; i < strings.length; i++) {
        //console.log('line #: ' + i + ' ' + strings[i])
        const tokens = strings[i].split(" ");
        //console.log(tokens[4])

        if (!applications.has(tokens[4])) {
          console.log("making a new app at" + i + " " + tokens[4]);
          applications.set(tokens[4], new Array(11).fill(0));
        }

        const array = applications.get(tokens[4]);
        //console.log(array)
        tokens.map(t => {
          //console.log(t)
          if (t.search(/exception/i) >= 0) {
            array[0]++;
          } else if (t.search(/warn/i) >= 0) {
            array[1]++;
          } else if (t.search(/error/i) >= 0) {
            array[2]++;
          } else if (t.search(/fail/i) >= 0 || t.search(/failure/i) >= 0) {
            array[3]++;
          } else if (t.search(/unauthorized/i) >= 0) {
            array[4]++;
          } else if (t.search(/timeout/i) >= 0) {
            array[5]++;
          } else if (t.search(/refused/i) >= 0) {
            array[6]++;
          } else if (t.search(/NoSuchPageException/i) >= 0) {
            array[7]++;
          } else if (t == "404") {
            array[8]++;
          } else if (t == "401") {
            array[9]++;
          } else if (t == "500") {
            array[10]++;
          }
        });
      }
      console.log(applications);

      res.status(200).send(buffer.toString("utf8"));
    });
  });
};
