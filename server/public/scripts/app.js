'use strict';

/**
 * @ngdoc overview
 * @name signGraphApp
 * @description
 * # signGraphApp
 *
 * Main module of the application.
 */
angular
  .module('signGraphApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'n3-line-chart',
    'n3-pie-chart',
    'btford.socket-io'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).
  factory('chatSocket', function (socketFactory) {
    var socket = socketFactory();
      socket.forward('chat');
      return socket;
  });
