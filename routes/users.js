var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');

//Bring in User Model
var User = require('../models/user');

//Post request
router.post('/', function(req, res, next) {

  //Get form values
  var reg_date =        req.body.reg_date;
  var name =            req.body.name;
  var lastname =        req.body.lastname;
  var email =           req.body.email;
  var username =        req.body.user;
  var password =        req.body.password1;

  //User Object
  var newUser = new User({
    name: name,
    lastname: lastname,
    email: email,
    username: username,
    password: password,
    reg_date: reg_date
  });

  bcrypt.genSalt(10, function(err, salt){
  	bcrypt.hash(newUser.password, salt, function(err, hash){
  		if(err) {
  			console.log(err);
  		}

  		newUser.password = hash;

  		//Create User
		  User.createUser(newUser, function(err, user) {
		    if(err) {
		      console.log(err);
		    }
  			});

  	});
  });


  
});


module.exports = router;