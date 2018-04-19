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



      for (var i = 0; i < strings.length; i++) {
        //console.log('line #: ' + i + ' ' + strings[i])
        const tokens = strings[i].split(" ");
        //console.log(tokens[4])

        if (!applications.has(tokens[4])) {

          applications.set(tokens[4], new Map ([['exception',0],
                                                ['warn', 0],
                                                ['error',0],
                                                ['fail/failure',0],
                                                ['unauthorized',0],
                                                ['timeout',0],
                                                ['refused',0],
                                                ['NoSuchPageException',0],
                                                ['404',0],
                                                ['401',0],
                                                ['501',0]]))
        }

        const counts = applications.get(tokens[4]);

        tokens.map(t => {
          //console.log(t)
          if (t.search(/exception/i) >= 0) {
            counts.set('exception', counts.get('exception')+1)
          } else if (t.search(/warn/i) >= 0) {
            counts.set('warn',counts.get('warn')+1)
          } else if (t.search(/error/i) >= 0) {
            counts.set('error',counts.get('error')+1)
          } else if (t.search(/fail/i) >= 0 || t.search(/failure/i) >= 0) {
            counts.set('fail/failure', counts.get('fail/failure')+1)
          } else if (t.search(/unauthorized/i) >= 0) {
            counts.set('unauthorized', counts.get('unauthorized')+1)
          } else if (t.search(/timeout/i) >= 0) {
            counts.set('timeout', counts.get('timeout')+1)
          } else if (t.search(/refused/i) >= 0) {
            counts.set('refused', counts.get('refused')+1)
          } else if (t.search(/NoSuchPageException/i) >= 0) {
            counts.set('NoSuchPageException', counts.get('NoSuchPageException')+1)
          } else if (t == "404") {
            counts.set('404', counts.get('404')+1)
          } else if (t == "401") {
            counts.set('401', counts.get('401')+1)
          } else if (t == "500") {
            counts.set('500', counts.get('500')+1)
          }
        });
      }

      const mapToObj = (aMap => {
          const obj = {}
          aMap.forEach((value, key)=>{obj[key] = value})
          return obj
      })


      applications.forEach((value, key)=> { applications.set (key, mapToObj(value))} )

      res.status(200).send(JSON.stringify(mapToObj(applications)));
    });
  });


  app.get("/analyze/usage/:userId/:fileName", function(req, res) {
    fileFunctions.file_get(req.params.userId, req.params.fileName, function(err,file) {
      if (err) res.status(500).send("cannot find file");
      const buffer = Buffer.from(file.logFile.data);

      const strings = buffer
        .toString("utf8")
        .split("\n")
        .filter(s => s.length > 6);
      const applications = new Map();

      for (var i = 0; i < strings.length; i++) {
        //console.log('line #: ' + i + ' ' + strings[i])
        const tokens = strings[i].split(" ");
        //console.log(tokens[4])


        if (!applications.has(tokens[4])) {

          applications.set(tokens[4], new Map ([["DockerServerController",0],
                                                ["DockerVolumeController", 0],
                                                ["ProvisionController",0],
                                                ['BlueprintController',0],
                                                ]))
        }

        const counts = applications.get(tokens[4]);

        tokens.map(t => {
          //console.log(t)
          if (t.search(/DockerServerController/i) >= 0) {
            counts.set("DockerServerController", counts.get("DockerServerController")+1)
          } else if (t.search(/DockerVolumeController/i) >= 0) {
            counts.set("DockerVolumeController",counts.get("DockerVolumeController")+1)
          } else if (t.search(/ProvisionController/i) >= 0) {
            counts.set("ProvisionController",counts.get("ProvisionController")+1)
          } else if (t.search(/BlueprintController/i) >= 0) {
            counts.set("BlueprintController", counts.get("BlueprintController")+1)
          }
        });
      }

      const mapToObj = (aMap => {
          const obj = {}
          aMap.forEach((value, key)=>{obj[key] = value})
          return obj
      })


      applications.forEach((value, key)=> { applications.set (key, mapToObj(value))} )

      res.status(200).send(JSON.stringify(mapToObj(applications)));
    });
  });
};
