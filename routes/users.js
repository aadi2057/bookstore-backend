var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
const cors = require('./cors');
const authenticate =  require('../authenticate');
var passport = require('passport');
var router = express.Router();
router.use(bodyParser.json());
 


/* GET users listing. */
router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
router.get('/', cors.corsWithOptions, function(req, res, next) {
  

  User.find({})
    .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.post('/register', cors.corsWithOptions, (req, res, next) => {
  User.register(new User({username: req.body.username}),
  req.body.password, (err, user) => {
    // console.log(req.body);
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else{
      if(req.body.firstname){
        user.firstname = req.body.firstname;
      }
      if(req.body.lastname){
        user.lastname = req.body.lastname;
      }
      if(req.body.email) {
        user.email = req.body.email;
      }
      if(req.body.gender) {
        user.gender = req.body.gender;
      }
      user.save((err, user) => {
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
      
    }
  });
})

router.post('/login', cors.corsWithOptions, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err)
      return next(err);

    if(!user)
    {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Log In unsuccessful', err : info});

    } 
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});          
      }

      var token = authenticate.getToken({_id: req.user._id});
      res.cookie('token', token, {signed: true, httpOnly: true});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      res.json({success: true, status: 'Login Successful!', token: token});
      
    }); 
   

  }) (req, res, next);  

});

module.exports = router;
