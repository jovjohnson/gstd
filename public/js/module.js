'use strict';

var app = angular.module('todoApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {url: '/', templateUrl: '/html/home.html'})
    .state('login', {url: '/login', templateUrl: '/html/login.html', controller: 'loginCtrl'})
    .state('register', {url: '/register', templateUrl: '/html/login.html', controller: 'loginCtrl'})
    .state('todos', {url: '/todos', templateUrl: '/html/todos.html', controller: 'todoCtrl'})

  $urlRouterProvider.otherwise('/');
});

app.run(function(AuthService) {
  AuthService.init();
});
