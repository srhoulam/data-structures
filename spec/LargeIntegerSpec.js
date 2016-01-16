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
    describe("should support addition and subtraction:", function() {
        var lint1, lint2;

        beforeEach(function() {
            lint1 = new LI();
            lint2 = new LI();
        });

        it('0 +/- 0', function() {
            lint1.addDigit(0);

            lint2.addDigit(0);

            expect(LI.add(lint1, lint2).toString()).toBe('+0');
            expect(LI.subtract(lint1, lint2).toString()).toBe('-0');

            lint2.setNegative();

            expect(LI.add(lint1, lint2).toString()).toBe('-0');
        });
        it('0 +/- 1', function() {
            lint1.addDigit(0);

            lint2.addDigit(1);

            expect(LI.add(lint1, lint2).toString()).toBe('+1');
            expect(LI.subtract(lint1, lint2).toString()).toBe('-1');

            lint2.setNegative();

            expect(LI.add(lint1, lint2).toString()).toBe('-1');
        });
        it('1 +/- 1', function() {
            lint1.addDigit(1);

            lint2.addDigit(1);

            expect(LI.add(lint1, lint2).toString()).toBe('+2');
            expect(LI.subtract(lint1, lint2).toString()).toBe('-0');

            lint2.setNegative();

            expect(LI.add(lint1, lint2).toString()).toBe('-0');
        });
        it('123 +/- 123', function() {
            lint1.addDigit(1);
            lint1.addDigit(2);
            lint1.addDigit(3);

            lint2.addDigit(1);
            lint2.addDigit(2);
            lint2.addDigit(3);

            expect(LI.add(lint1, lint2).toString()).toBe('+246');
            expect(LI.subtract(lint1, lint2).toString()).toBe('-000');

            lint2.setNegative();

            expect(LI.add(lint1, lint2).toString()).toBe('-000');
        });
        it('25 +/- 50', function() {
            lint1.addDigit(2);
            lint1.addDigit(5);

            lint2.addDigit(5);
            lint2.addDigit(0);

            expect(LI.add(lint1, lint2).toString()).toBe('+75');
            expect(LI.subtract(lint1, lint2).toString()).toBe('-25');

            lint2.setNegative();

            expect(LI.add(lint1, lint2).toString()).toBe('-25');
        });
        it('9000 +/- 9001', function() {
            lint1.addDigit(9);
            lint1.addDigit(0);
            lint1.addDigit(0);
            lint1.addDigit(0);

            lint2.addDigit(9);
            lint2.addDigit(0);
            lint2.addDigit(0);
            lint2.addDigit(1);

            expect(LI.add(lint1, lint2).toString()).toBe('+18001');
            expect(LI.subtract(lint1, lint2).toString()).toBe('-0001');

            lint2.setNegative();

            expect(LI.add(lint1, lint2).toString()).toBe('-0001');
        });
        it('16000000000000 +/- 50000', function() {
            lint1.addDigit(1);
            lint1.addDigit(6);
            lint1.addDigit(0);
            lint1.addDigit(0);
            lint1.addDigit(0);
            lint1.addDigit(0);
            lint1.addDigit(0);
            lint1.addDigit(0);
            lint1.addDigit(0);
            lint1.addDigit(0);
            lint1.addDigit(0);
            lint1.addDigit(0);
            lint1.addDigit(0);
            lint1.addDigit(0);

            lint2.addDigit(5);
            lint2.addDigit(0);
            lint2.addDigit(0);
            lint2.addDigit(0);
            lint2.addDigit(0);

            expect(LI.add(lint1, lint2).toString()).toBe('+16000000050000');
            expect(LI.subtract(lint1, lint2).toString()).toBe('+15999999950000');

            lint2.setNegative();

            expect(LI.add(lint1, lint2).toString()).toBe('+15999999950000');
        });
    });
});
