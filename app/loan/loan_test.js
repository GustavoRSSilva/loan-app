'use strict';

describe('loanApp.loan module', function() {

    beforeEach(module('loanApp.loan'));

    describe('loan controller', function() {

        it('should update all the value in loan request', inject(function($controller) {
            //spec body
            var loanCtrl = $controller('loan');
            expect(loanCtrl).toBeDefined();
            expect(loanCtrl.loansArray).toEqual({});
            expect(loanCtrl.userEmail).toEqual('');
            expect(loanCtrl.moneyToLoan).toEqual(0);
            expect(loanCtrl.totalToPay).toEqual(0);
            expect(loanCtrl.totalInterest).toEqual(0);
            expect(loanCtrl.monthPayment).toEqual(0);
            expect(loanCtrl.totalInterest).toEqual(0);
            expect(loanCtrl.loansArray).toEqual({});
            expect(loanCtrl.loansArray).toEqual({});

            loanCtrl.selectedOption = {
                'interest': 3,
                'loan_years': 5
            }
            loanCtrl.moneyToLoan = 1000;
            loanCtrl.updateRequest();
            
            expect(loanCtrl.totalToPay).toEqual(1004.01);
            expect(loanCtrl.totalInterest).toEqual(4.01);
            expect(loanCtrl.monthPayment).toEqual(4.18);
        }));
    });
});
