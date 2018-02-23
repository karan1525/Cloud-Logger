var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var logSchema = new Schema ({
    userId: String,
    logfiles: [Buffer],
    numOfFiles: Number
});

var Log = mongoose.model('Log',logSchema);

module.exports = Log;