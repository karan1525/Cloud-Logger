const passport = require('passport');
const fs = require('fs');
const fileFunctions = require('../file/fileFunctions.js');
module.exports = app => {
  app.post('/test', function(req, res) {
   fs.readFile('/Users/cdub/Desktop/test.txt', function(err, data) {s

       fileFunctions.file_upload( 'dummyName',data);

   });



    res.status(200).send('file was uploaded');
  });


  app.put('/test', function(req, res){
    console.log(req.body.message);
    res.status(200).send(req.body);

  });
};
