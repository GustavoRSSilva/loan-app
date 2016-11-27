'use strict';

var app = angular.module('loanApp.auth', ['loanApp.constants']);

app.directive('loanAuth', ['firebaseContants', function(firebaseContants) {
    return {
        restrict: 'E',
        templateUrl: 'auth/auth.html'
    }
}]);
