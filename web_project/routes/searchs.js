var express  = require('express');
var router = express.Router();
var Book = require('../models/Book');
let book=[];
var client_id = 'fncATDDXzhm7hgiaqbD3';
var client_secret = 'Tvj2CedgkC';

router.get('/', function(req, res){
    res.render('search/search');
});

router.post('/bookview', async (req, res) => { 
  const { title } = req.body;
      
  var api_url = 'https://openapi.naver.com/v1/search/book?query='+encodeURI(title);
    var request = require('request');
    var options = {
          url: api_url,
          headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
      };
    request.get(options, function (error, response, body) {
      
      if (!error && response.statusCode == 200) {
        let json = JSON.parse(body);
        
        for(var i=0; i<json['items'].length;i++){
          var title = json['items'][i]['title'];
          var author = json['items'][i]['author'];
          var image = json['items'][i]['image'];
          var link = json['items'][i]['link'];
          var description = json['items'][i]['description'];

          book = new Book({      
            title ,
            author ,
            image ,
            link,
            description,
          });
          
          book.save();                  
        }
        Book.find({},function(err, books){
              if(err) return res.json(err);
              res.render('search/bookview', {books: books}); 
            });    
      } 
      
      else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
 });

//  router.get('/bookview', function(req, res){
//          
//  });  

module.exports = router;