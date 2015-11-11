'use strict';

var UnsortedList = require('../UnsortedList');

describe("unsorted list", function() {
    describe("basic operation", function() {
        var ul = new UnsortedList(10);

        it("should begin empty", function() {
            expect(ul.lengthIs()).toBe(0);
        });

        it("should insert elements", function() {
            ul.insert({});
            ul.insert({ a : 1 });
            ul.insert({ a : 'a', b : 'b' });

            expect(ul.lengthIs()).toBe(3);
        });

        it("should delete elements", function() {
            ul.delete({});

            expect(ul.lengthIs()).toBe(2);
        });

        it("should expose an iterator interface", function() {
            ul.reset();

            var n = ul.getNext();

            expect(JSON.stringify(n)).
                toBe(JSON.stringify({ a : 'a', b : 'b' }));

            n = ul.getNext();

            expect(JSON.stringify(n)).
                toBe(JSON.stringify({ a : 1 }));
        });
        
        it("should not be full", function() {
            expect(ul.isFull()).toBe(false);
        });
    });

    describe("more intensive tests", function() {
        var size = 5;
        var ul = new UnsortedList(size);

        it("should begin empty", function() {
            expect(ul.lengthIs()).toBe(0);
        });

        it("should know when it's full", function() {
            for(var index = 0; index < size - 1; index++) {
                ul.insert({
                    'i' : index
                });

                expect(ul.contains({
                    'i' : index
                })).toBe(true);
            }

            expect(ul.isFull()).toBe(false);

            ul.insert({
                'i' : size - 1
            });

            expect(ul.isFull()).toBe(true);
        });

        it("should report its length", function() {
            expect(ul.lengthIs()).toBe(size);
        });

        it("should delete elements from its end", function() {
            ul.delete({ 'i' : size - 1 });

            expect(ul.contains({ 'i' : size - 1 })).toBe(false);
            expect(ul.lengthIs()).toBe(size - 1);
        });

        it("should delete elements from its beginning", function() {
            ul.delete({ 'i' : 0 });

            expect(ul.contains({ 'i' : 0 })).toBe(false);
            expect(ul.lengthIs()).toBe(size - 2);
        });

        it("should delete elements from its middle", function() {
            ul.delete({ 'i' : 2 });

            expect(ul.contains({ 'i' : 2 })).toBe(false);
            expect(ul.lengthIs()).toBe(size - 3);
        });
    });
});

