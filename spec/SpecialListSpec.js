'use strict';

var List = require('../SpecialList');

describe("special list", function() {
    var l;
    var size = Math.ceil(Math.random() * 25);
    beforeEach(function() {
        l = new List();
    });

    it("should insert to the front and report its length", function() {
        for(var index = 0; index < size; index++) {
            expect(l.lengthIs()).toBe(index);
            l.insertFront(Math.ceil(Math.random() * 127));
        }

        expect(l.lengthIs()).toBe(size);
    });

    it("should insert to the rear and report its length", function() {
        for(var index = 0; index < size; index++) {
            expect(l.lengthIs()).toBe(index);
            l.insertRear(Math.ceil(Math.random() * 127));
        }

        expect(l.lengthIs()).toBe(size);
    });

    describe("should expose an interator interface going forward", function() {
        beforeEach(function() {
            for(var index = 0; index < size; index++) {
                l.insertRear(index);
            }
        });

        it("", function() {
            l.resetForward();
            var values = [];

            for(var index = 0; index < size; index++) {
                values.push(l.getNext());
                expect(values[values.length - 1]).toBe(index);
            }

            l.resetForward();

            var match = values.reduce(function(pV, cV) {
                return pV && cV === l.getNext();
            }, true);

            expect(match).toBe(true);
        });
    });

    describe("should expose an interator interface going backward", function() {
        beforeEach(function() {
            for(var index = 0; index < size; index++) {
                l.insertFront(index);
            }
        });

        it("", function() {
            l.resetBackward();
            var values = [];
            for(var index = 0; index < size; index++) {
                values.push(l.getPrev());
                expect(values[values.length - 1]).toBe(index);
            }

            l.resetBackward();

            var match = values.reduce(function(pV, cV) {
                return pV && cV === l.getPrev();
            }, true);

            expect(match).toBe(true);
        });
    });
});
