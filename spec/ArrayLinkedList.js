'use strict';

var List = require('../ArrayLinkedList');

describe("unsorted array linked list", function() {
    describe("list operations", function() {
        var size = Math.floor(20 * Math.random()) + 10;
        var ul;

        beforeEach(function() {
            ul = new List(size);
        });

        it("should begin empty", function() {
            expect(ul.lengthIs()).toBe(0);
        });

        it("should insert elements", function() {
            for(var index = 0; index < size; index++) {
                ul.insert({ 'i' : index });
            }
        });

        it("should delete elements from its beginning", function() {
            for(var index = 0; index < size; index++) {
                ul.insert({ 'i' : index });
            }

            expect(ul.contains({ 'i' : size - 1 })).toBe(true);

            ul.delete({ 'i' : size - 1 });

            expect(ul.contains({ 'i' : size - 1 })).toBe(false);
            expect(ul.lengthIs()).toBe(size - 1);
        });

        it("should delete elements from its end", function() {
            for(var index = 0; index < size; index++) {
                ul.insert({ 'i' : index });
            }

            expect(ul.contains({ 'i' : 0 })).toBe(true);

            ul.delete({ 'i' : 0 });

            expect(ul.contains({ 'i' : 0 })).toBe(false);
            expect(ul.lengthIs()).toBe(size - 1);
        });

        it("should delete elements from its middle", function() {
            for(var index = 0; index < size; index++) {
                ul.insert({ 'i' : index });
            }

            expect(ul.contains({ 'i' : 2 })).toBe(true);

            ul.delete({ 'i' : 2 });

            expect(ul.contains({ 'i' : 2 })).toBe(false);
            expect(ul.lengthIs()).toBe(size - 1);
        });

        it("should expose an iterator interface", function() {
            for(var index = 0; index < size; index++) {
                ul.insert({ 'i' : index });
            }

            ul.reset();

            for(index = 0; index < size; index++) {
                let n = ul.getNext();                

                expect(JSON.stringify(n)).
                    toBe(JSON.stringify({ 'i' : index }));
            }
        });
        
        it("should not be full", function() {
            expect(ul.isFull()).toBe(false);
        });
    });
});

