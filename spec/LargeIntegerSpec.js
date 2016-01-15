'use strict';

var LI = require('../LargeInteger');

describe("large integer", function() {
    describe("should convert to a string if it has digits", function() {
        var lint;

        beforeEach(function() {
            lint = new LI();

            lint.addDigit(0);
        });

        it('', function() {
            lint.setPositive();

            expect(lint.toString()).toBe('+0');
        });

        it('', function() {
            lint.setNegative();

            expect(lint.toString()).toBe('-0');
        });
    });
    describe("should support addition and subtraction", function() {
        describe("without carry", function() {
            var lint1, lint2;

            beforeEach(function() {
                lint1 = new LI();
                lint2 = new LI();

                lint1.addDigit(1);
                lint1.addDigit(2);
                lint1.addDigit(3);

                lint2.addDigit(1);
                lint2.addDigit(2);
                lint2.addDigit(3);
            });

            it('', function() {
                expect(LI.add(lint1, lint2).toString()).toBe('+246');
                expect(LI.subtract(lint1, lint2).toString()).toBe('-000');
            });
        });
        // describe("with carry", function() {
        //     var lint1, lint2;

        //     beforeEach(function() {
        //         lint1 = new LI();
        //         lint2 = new LI();

        //         lint1.addDigit(1);
        //         lint1.addDigit(9);
        //         lint1.addDigit(9);
        //         lint1.addDigit(9);

        //         lint2.addDigit(1);
        //         lint2.addDigit(7);
        //     });
        // });
    });
});
