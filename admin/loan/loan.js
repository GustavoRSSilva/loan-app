'use strict';

var app = angular.module('loanApp.loan', ['loanApp.constants']);

app.directive('loansContainer', ['firebaseContants', function(firebaseContants) {
    return {
        restrict: "E",
        templateUrl: "loan/loan.html",
        controller: function($scope) {
            this.loansArray = {};
            this.userLoanRequestsArray = {};
            this.provider = '';
            this.interest = '';
            this.loanYears = '';
            var _self = this;

            firebase.initializeApp(firebaseContants);

            var dbLoanRef = firebase.database().ref().child('loans');
            dbLoanRef.on('value', function(snap) {
                _self.safeApply($scope, function() {
                    _self.loansArray = snap.val();
                });
            });

            this.deleteLoan = function(loanName) {
                console.log(loanName);
                const promise = firebase.database().ref().child('loans/' + loanName).remove();
            };

            this.createNewLoan = function() {
                //create unique loan name
                var loanName = _self.provider.toLowerCase() + '_' + new Date().getTime(),
                    postData = {
                        'interest': _self.interest,
                        'loan_years': _self.loanYears,
                        'provider': _self.provider
                    };

                // Write the new post's data simultaneously in the posts list and the user's post list.
                var updates = {};
                updates['loans/' + loanName] = postData;

                const promise = firebase.database().ref().update(updates);

                promise.catch(function(e) {
                    alert(e.message);
                    console.log(e.message);
                });
            };

            var dbUserLoanRef = firebase.database().ref().child('users');
            dbUserLoanRef.on('value', function(snap) {
                _self.safeApply($scope, function() {
                    _self.userLoanRequestsArray = snap.val();
                });
            });

            this.evaluateLoan = function(userId, loanRequestName, decision) {
                // Write the new post's data simultaneously in the posts list and the user's post list.
                var updates = {},
                status = (decision) ? 'APPROVED' : 'REJECTED';

                console.log(userId);

                updates['users/' + userId + '/' + loanRequestName + '/status'] = status;

                const promise = firebase.database().ref().update(updates);

                promise.catch(function(e) {
                    alert(e.message);
                    console.log(e.message);
                });
            };

            // function to safe apply (see $scope.$apply)
            this.safeApply = function(scope, fn) {
                (scope.$$phase || scope.$root.$$phase) ? fn(): scope.$apply(fn);
            };

        },
        controllerAs: 'loan'
    };
}]);
