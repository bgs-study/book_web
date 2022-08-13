var express = require('express');
var router = express.Router();
var User = require('../models/User');


// Home
router.get('/', function(req, res){
    res.render('home/welcom');
});

router.get('/about', function(req, res){
    res.render('home/about');
});

router.post('/Auth/signup', 
    async (req, res) => {
    const { loginId, password } = req.body;
    try {
 
        let user = await User.findOne({ loginId });
        if (user) {
            return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] });
        }
        user = new User({
            loginId,
            password,
        });
        await user.save(); // db에 user 저장
        
        res.write("<script>alert('회원가입완료!')</script>");
        res.write("<script>window.location=\"login\"</script>");
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});

router.get('/Auth/signupForm', function(req, res){
    res.render('users/signup');
});

router.get('/Auth/login', function(req, res){
    res.render('users/login');
});


router.post('/Auth/login',
    async (req, res) => { 
        const { loginId, password } = req.body;
        try {  
            console.log('로그인'); 
            let user = await User.findOne({ loginId });
            if( user.password == password){
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write("<script>alert('로그인완료!')</script>");
                res.write("<script>window.location=\"/\"</script>");
            }
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
       
});
router.get('/Auth/logout', function(req, res) {
    //req.logout();
    res.redirect('/');
});



module.exports = router;