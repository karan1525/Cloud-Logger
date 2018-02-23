var mongoose = require ('mongoose')

var Schema = mongoose.Schema;

var userSchema = new Schema({
    userId: String,
    name: String,
    email: String,
    imageUrl: String

});

var User = mongoose.model ('User', userSchema);

module.exports = User;