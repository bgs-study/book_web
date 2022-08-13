// models/Post.js
var mongoose = require('mongoose');
// schema
var bookSchema = mongoose.Schema({ // 1
  title:{type:String, required:true},
  author:{type:String, required:true},
  image:{type:String}, 
    link:{type:String},
    description:{type:String}, 
});
// model & export
var Book = mongoose.model('book', bookSchema);
module.exports = Book;
