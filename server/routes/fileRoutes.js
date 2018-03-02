const passport = require('passport');

module.exports = app => {
  app.post('/test', function(req, res) {
    fs.readFile('/Users/cdub/Desktop/test.txt', function(err, data) {
      fileFunctions.file_upload('dummyUserId', data);
    });
    //
  });
};
