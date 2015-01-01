'use strict';

/**
 * @ngdoc overview
 * @name freiesMagazinApp
 * @description
 * # freiesMagazinApp
 *
 * Main module of the application.
 */
angular
  .module('freiesMagazinApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'nvd3'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      
      .when('/', {
        templateUrl: 'views/chart1.html',
        controller: 'Chart1Ctrl'
      })
      .when('/chart1', {
        templateUrl: 'views/chart1.html',
        controller: 'Chart1Ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


