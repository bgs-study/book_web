// models/login.js
var mongoose = require('mongoose');
// schema
var userSchema = mongoose.Schema({ // 1
      loginId:{type:String, required:true},
      password:{type:String, required:true},
});
// model & export
var User = mongoose.model('user', userSchema);
module.exports = User;
