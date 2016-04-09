var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Todo = require('../models/Todo');





//register
router.post('/register', function(req, res) {
  User.register(req.body, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('lilcookie', token).send(user);
    }
  });
});



// login
router.post('/login', function(req, res) {
  User.authenticate(req.body, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('lilcookie', token).send(user);
    }
  });
});

//logout
router.delete('/logout', function(req, res) {
  res.clearCookie('lilcookie').send();
});

//acquire auth info
router.get('/profile', User.authMiddleware, function(req, res) {
  res.send(req.user);
});

//create a todo
router.post('/todo', User.authMiddleware, function(req, res) {
  Todo.create(req.body, function(err, todo) {
      var user = req.user;
      if(err) {
        res.status(400).send(err);
      } else {
       user.todos.push(todo._id);
       user.save(function(err, savedUser) {
       res.status(err ? 400 : 200).send(err || savedUser);
       });
      }
  });
});





/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
