'use strict';

var app = angular.module('todoApp');

app.controller('loginCtrl', function($scope, $state, UserService, AuthService) {
  $scope.state = $state.current.name;
  $scope.submit = function(user) {
    if($scope.state === 'register') {
      // submit register form
      if(user.password !== user.password2) {
        $scope.user.password = $scope.user.password2 = '';
        alert('Please make sure your passwords match!');
      } else {
        AuthService.register(user)
          .then(function() {
            $state.go('home');
          }, function(err) {
            console.error(err);
          });
      }
    } else {
      // submit login form
      AuthService.login(user)
        .then(function() {
          $state.go('todos');
        }, function(err) {
          console.error(err);
        });
    }
  };
});


app.controller('navCtrl', function($scope, UserService, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
  };
  $scope.$watch(function() {
    return UserService.username;
  }, function(username) {
    $scope.username = username;
  });
});

app.controller('todoCtrl', function($scope, UserService, TodoService) {
  $scope.$watch(function() {
    return TodoService.todos;
  }, function(todos) {
    console.log('');
    $scope.todos = todos;
  });
});
