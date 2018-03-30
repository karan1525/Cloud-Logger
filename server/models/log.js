const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
  userId: String,
  logFileName: String,
  logFile: Buffer
  //numOfFiles: Number
});

mongoose.model('Log', logSchema);
