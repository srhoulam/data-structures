'use strict';

var DoubleStack = require('../DoubleStack');
var StackErrors = require('../StackErrors'),
    UnderflowError = StackErrors.Underflow,
    OverflowError = StackErrors.Overflow;

describe("double stack", function() {
    var ds = new DoubleStack();

    it("should know it's empty", function() {
        expect(ds.isEmpty()).toBe(true);
        expect(ds.isFull()).toBe(false);
    });

    it("should push elements", function() {
        for(var index = 0; index < 100; index++) {
            ds.push(index);
        }
    });

    it("should know it's full", function() {
        expect(ds.isFull()).toBe(true);
        expect(ds.isEmpty()).toBe(false);
    });

    it("should pop elements in FILO order", function() {
        for(var index = 99; index >= 0; index--) {
            expect(ds.pop()).toBe(index);
        }
    });

    it("should allow the even substack to fill the entire array", function() {
        for(var index = 0; index < 200; index += 2) {
            ds.push(index);
        }
        for(var index = 198; index >= 0; index -= 2) {
            expect(ds.pop()).toBe(index);
        }
    });

    it("should allow the odd substack to fill the entire array", function() {
        for(var index = 1; index < 200; index += 2) {
            ds.push(index);
        }
        for(var index = 199; index >= 1; index -= 2) {
            expect(ds.pop()).toBe(index);
        }
    });
});

