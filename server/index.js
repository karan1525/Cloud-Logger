const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/log');
require('./models/user');
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

require('./routes/authRoutes')(app);
require('./routes/fileRoutes')(app);

//connect to mLab with mongoose
mongoose.connect(keys.mongoUrl);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'mLab connection error'));

const PORT = process.env.PORT || 5000;
app.listen(5000);

module.exports = app;
