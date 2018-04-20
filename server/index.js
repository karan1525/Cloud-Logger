const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const bodyParser = require('body-parser');
require('./models/Log');
require('./models/User');

require('./services/passport');

const fs = require('fs');
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())

require('./routes/authRoutes')(app);
require('./routes/fileRoutes')(app);

//connect to mLab with mongoose
mongoose.connect(keys.mongoUrl);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'mLab connection error'));

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!

  app.use(express.static('server/client/build')); //based on project structure

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

module.exports = app;
