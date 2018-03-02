const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: String,
  name: String,
  email: String,
  imageUrl: String
});

mongoose.model('User', userSchema);
