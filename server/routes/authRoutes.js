const passport = require('passport');

module.exports = app => {
  app.post('/test', function(req, res) {
    fs.readFile('/Users/cdub/Desktop/test.txt', function(err, data) {
      fileFunctions.file_upload('dummyUserId', data);
    });
    //
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
};
