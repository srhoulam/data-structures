'use strict';

var Stack = require('../LinkedStack');
var StackErrors = require('../StackErrors'),
    UnderflowError = StackErrors.Underflow;

describe("linked stack", function() {
    var s = new Stack();

    it("should know when it's empty", function() {
        expect(s.isEmpty()).toBe(true);
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

    it("should know when it's not empty", function() {
        expect(s.isEmpty()).toBe(false);
    });

    it("should pop elements", function() {
        for(var index=9; index >= 0; index--) {
            expect(s.pop()).toBe(index);
        }
    });
});
