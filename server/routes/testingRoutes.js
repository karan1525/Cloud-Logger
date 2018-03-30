const passport = require('passport');

module.exports = app => {
  app.get('/status200ok', function(req, res) {
    res.status(200).send("You send the request from " + req.ip );
  });


};
