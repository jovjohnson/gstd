'use strict';

var app = angular.module('todoApp');

app.service('AuthService', function($http, UserService) {
  this.register = function(user) {
    return $http.post('/users/register', user)
      .then(function(res) {
        UserService.set(res.data);
      });
  };

  this.login = function(user) {
    return $http.post('/users/login', user)
      .then(function(res) {
        UserService.set(res.data);
      });
  };

  this.logout = function() {
    $http.delete('/users/logout')
    .then(function() {
      UserService.destroy();
    });
  };

  this.init = function() {
    $http.get('/users/profile')
    .then(function(res) {
      UserService.set(res.data);
    });
  };
});

app.service('UserService', function() {
  this.set = function(user) {
    this.username = user.username;
    this._id = user._id;
    this.todos = user.todos;
    console.log(this.todos);
  };
  this.destroy = function() {
    this.username = null;
    this._id = null;
  };
});

app.service('TodoService', function($http) {

  this.addTodo = function(newTodo) {
    return $http.post('users/todo', newTodo);
  };

  this.removeTodo = function(todoID) {
    return $http.delete(`/users/todo/${todoID}`);
  }

  this.todos = [];

  this.init = function() {
    return $http.get('/users/todos');

  };

});
