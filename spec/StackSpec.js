'use strict';

var Stack = require('../Stack');
var StackErrors = require('../StackErrors'),
    UnderflowError = StackErrors.Underflow,
    OverflowError = StackErrors.Overflow;

describe("stack", function() {
    var s = new Stack(10);

    it("should know when it's empty", function() {
        expect(s.isEmpty()).toBe(true);
        expect(s.isFull()).toBe(false);
    });

    it("should throw if popped while empty", function() {
        try {
            s.pop();
            fail("Didn't throw.");
        } catch(e) {
            expect(e instanceof UnderflowError).toBe(true);
        }
    });

    it("should append elements and allow peeking", function() {
        for(var index=0; index < 10; index++) {
            s.push(index);
            expect(s.peek()).toBe(index);
        }
    });

    it("should know when it's full", function() {
        expect(s.isFull()).toBe(true);
        expect(s.isEmpty()).toBe(false);
    });

    it("should throw if pushed to while full", function() {
        try {
            s.push(10);
            fail("Didn't throw.");
        } catch(e) {
            expect(e instanceof OverflowError).toBe(true);
        }
    });

    it("should pop elements", function() {
        for(var index=9; index >= 0; index--) {
            expect(s.pop()).toBe(index);
        }
    });

    // Nell Dale, chapter 4, exercise 10, part b
    it("should allow inspection", function() {
        for(var index=0; index < 10; index++) {
            index !== 0 && expect(s.inspector(1)).toBe(index - 1);

            s.push(index);
            expect(s.inspector(1)).toBe(index);
        }

        for(var index=0; index < 10; index++) {
            expect(s.inspector(index + 1)).toBe(9 - index);
        }
    });
});

