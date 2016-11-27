'use strict';

var app = angular.module('loanApp.auth', ['loanApp.constants']);

app.directive('loanAuth', ['firebaseContants', function(firebaseContants) {
    return {
        restrict: 'E',
        templateUrl: 'auth/auth.html',
        controller: function($scope) {

            firebase.initializeApp(firebaseContants);

            this.email = '';
            this.pass = '';
            this.user = null;

            var _self = this;

            this.isUserLoggedIn = function() {
              return this.user !== null;
            }

            this.signIn = function() {
                const email = _self.email;
                const pass = _self.pass;
                const firabaseAuth = firebase.auth();

                const promise = firabaseAuth.signInWithEmailAndPassword(email, pass);

                promise.catch(function(e) {
                    alert(e.message);
                    console.log(e.message);
                });
            };

            this.signUp = function() {
                const email = _self.email;
                const pass = _self.pass;
                const firabaseAuth = firebase.auth();

                const promise = firabaseAuth.createUserWithEmailAndPassword(email, pass);

                promise.catch(function(e) {
                  alert(e.message);
                    console.log(e.message);
                });
            };

            this.signOut = function() {
                firebase.auth().signOut();
            };

            firebase.auth().onAuthStateChanged(function(firebaseUser) {
                $scope.$apply(function() {
                  $scope.loggedIn = (firebaseUser) ? true : false;
                  _self.user = (firebaseUser) ? firebaseUser : null;
                });

                if (firebaseUser) {
                    console.log('user logged id');
                } else {
                    console.log('not logged id');
                }
            });
        },
        controllerAs: 'auth'
    }
}]);
