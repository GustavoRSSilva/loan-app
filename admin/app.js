'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('loanApp', [
    'ngRoute',
    'loanApp.version',
    'loanApp.footer',
    'loanApp.auth',
    'loanApp.loan'
]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
