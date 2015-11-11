'use strict';

var UnsortedList = require('../UnsortedLinkedList');

describe("unsorted linked list", function() {
    describe("list operations", function() {
        var ul = new UnsortedList();
        var size = Math.floor(20 * Math.random()) + 10;

        it("should begin empty", function() {
            expect(ul.lengthIs()).toBe(0);
        });

        it("should insert elements", function() {
            for(var index = 0; index < size; index++) {
                ul.insert({ 'i' : index });
            }
        });

        it("should delete elements from its beginning", function() {
            expect(ul.contains({ 'i' : size - 1 })).toBe(true);

            ul.delete({ 'i' : size - 1 });

            expect(ul.contains({ 'i' : size - 1 })).toBe(false);
            expect(ul.lengthIs()).toBe(size - 1);
        });

        it("should delete elements from its end", function() {
            expect(ul.contains({ 'i' : 0 })).toBe(true);

            ul.delete({ 'i' : 0 });

            expect(ul.contains({ 'i' : 0 })).toBe(false);
            expect(ul.lengthIs()).toBe(size - 2);
        });

        it("should delete elements from its middle", function() {
            expect(ul.contains({ 'i' : 2 })).toBe(true);

            ul.delete({ 'i' : 2 });

            expect(ul.contains({ 'i' : 2 })).toBe(false);
            expect(ul.lengthIs()).toBe(size - 3);
        });

        it("should expose an iterator interface", function() {
            ul.reset();

            var n = ul.getNext();

            expect(JSON.stringify(n)).
                toBe(JSON.stringify({ 'i' : size - 2 }));

            n = ul.getNext();

            expect(JSON.stringify(n)).
                toBe(JSON.stringify({ 'i' : size - 3 }));
        });
        
        it("should not be full", function() {
            expect(ul.isFull()).toBe(false);
        });
    });
});

