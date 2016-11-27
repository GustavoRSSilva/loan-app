'use strict';

var app = angular.module('loanApp.loan', []);

app.directive('loansContainer', ['firebaseContants', function(firebaseContants) {
    return {
        restrict: "E",
        templateUrl: "loan/loan.html",
        controller: function($scope) {
            this.loansArray = {};
            this.userLoanRequestsArray = {};
            this.selectedOption = '';
            this.userEmail = '';
            this.moneyToLoan = 0;
            this.totalToPay = 0;
            this.totalInterest = 0;
            this.monthPayment = 0;
            this.userLoan = {};
            var _self = this;

            var user = firebase.auth().currentUser;

            var dbLoanRef = firebase.database().ref().child('loans');
            dbLoanRef.on('value', function(snap) {
                _self.safeApply($scope, function() {
                    _self.loansArray = snap.val();
                    let user = firebase.auth().currentUser;
                    _self.userEmail = (user) ? user.email : '';
                });
            });

            this.updateRequest = function() {
                var selectedOption = _self.selectedOption
                _self.totalToPay = (selectedOption) ? (_self.moneyToLoan * (Math.pow((1 + (selectedOption.interest / 100)), selectedOption.loan_years))).toFixed(2) : 0;
                _self.totalInterest = (_self.totalToPay) ?(_self.totalToPay - _self.moneyToLoan).toFixed(2) : 0;
                _self.monthPayment = (selectedOption) ? (_self.totalToPay / (selectedOption.loan_years * 12)).toFixed(2) : 0;
            };

            this.addLoanRequest = function() {
                let user = firebase.auth().currentUser,
                    selectedOption = _self.selectedOption,
                    userId = user.uid,
                    postData = {
                        'user': _self.userEmail,
                        'total': _self.totalToPay,
                        'total_interest': _self.totalInterest,
                        'provider': selectedOption.provider,
                        'status': "PENDING_APPROVAL"
                    };
                // Get a key for a new Post.
                var newPostKey = firebase.database().ref().child('users/' + userId).push().key;

                // Write the new post's data simultaneously in the posts list and the user's post list.
                var updates = {};
                updates['users/' + userId + '/' + newPostKey] = postData;

                const promise = firebase.database().ref().update(updates);

                promise.catch(function(e) {
                    alert(e.message);
                    console.log(e.message);
                });

                this.moneyToLoan = 0;
                this.updateRequest();
            };

            // get user loan requests on log in
            firebase.auth().onAuthStateChanged(function(firebaseUser) {
                if (firebaseUser) {
                    var dbUserLoanRef = firebase.database().ref().child('/users/' + firebaseUser.uid);
                    dbUserLoanRef.on('value', function(snap) {
                        _self.safeApply($scope, function() {
                            _self.userLoanRequestsArray = snap.val();
                        });
                    });
                    _self.userEmail = firebaseUser.email;
                } else {
                    _self.userLoanRequestsArray = {};
                    _self.userEmail = '';
                }
            });

            // function to safe apply (see $scope.$apply)
            this.safeApply = function(scope, fn) {
                (scope.$$phase || scope.$root.$$phase) ? fn(): scope.$apply(fn);
            }

        },
        controllerAs: 'loan'
    };
}]);
