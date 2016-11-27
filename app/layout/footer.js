'use strict';

var app = angular.module('loanApp.footer', []);

app.directive('loanFooter', function() {
    return {
        restrict: "E",
        templateUrl: "layout/footer.html",
        controller: function() {
            var date = new Date();
            this.copyRight = "©" + date.getFullYear() + " Gustavo Silva";
        },
        controllerAs: 'footer'
    };
});
