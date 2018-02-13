const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;
 
const UserSchema = new Schema({
    login: String, 
    password: String
});

module.exports = mongoose.model('users', UserSchema);