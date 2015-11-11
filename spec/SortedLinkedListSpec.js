'use strict';

var SortedList = require('../SortedLinkedList');

describe("sorted linked list", function() {
    function objectCompare(a, b) {
        var result;
        if(a instanceof Object || b instanceof Object) {
            result = JSON.stringify(a) === JSON.stringify(b) ?
                0 :
                (JSON.stringify(a) < JSON.stringify(b) ?
                    -1 :
                    1);
        } else {
            result = a === b ?
                0 :
                (a < b ?
                    -1 :
                    1);
        }

        return result;
    }

    describe("basic functionality", function() {
        var sl = new SortedList(objectCompare);

        it("should insert elements", function() {
            sl.insert({});
            sl.insert({ a : 1 });
            sl.insert({ a : 'a', b : 'b' });

            expect(sl.lengthIs()).toBe(3);
        });

        it("should delete elements", function() {
            sl.delete({});

            expect(sl.lengthIs()).toBe(2);
        });

        it("should expose an iterator interface", function() {
            sl.reset();

            var t1 = sl.getNext(),
                t2 = sl.getNext();

            expect(JSON.stringify(t1)).
                toBe(JSON.stringify({ a : 'a', b : 'b' }));
            expect(JSON.stringify(t2)).
                toBe(JSON.stringify({ a : 1 }));
        });
    });

    describe("more intensive tests", function() {
        var sl = new SortedList(objectCompare);

        it("should begin empty", function() {
            expect(sl.lengthIs()).toBe(0);
            expect(sl.isFull()).toBe(false);
        });

        it("should insert items at its beginning and end", 
            function() {
                sl.insert({ 'c' : 1 });

                expect(sl.contains({ 'c' : 1 })).toBe(true);
                expect(sl.lengthIs()).toBe(1);
                expect(sl.isFull()).toBe(false);
            }
        );

        it("should insert items at its beginning", function() {
            sl.insert({ 'b' : 1 });

            expect(sl.contains({ 'b' : 1 })).toBe(true);
            expect(sl.lengthIs()).toBe(2);
            expect(sl.isFull()).toBe(false);
        });

        it("should insert items at its end", function() {
            sl.insert({ 'd' : 1 });

            expect(sl.contains({ 'd' : 1 })).toBe(true);
            expect(sl.lengthIs()).toBe(3);
            expect(sl.isFull()).toBe(false);
        });

        it("should insert another item at its beginning", 
            function() {
                sl.insert({ 'a' : 1 });

                expect(sl.contains({ 'a' : 1 })).toBe(true);
                expect(sl.lengthIs()).toBe(4);
                expect(sl.isFull()).toBe(false);
            }
        );

        it("should insert another item at its end", 
            function() {
                sl.insert({ 'e' : 1 });

                expect(sl.contains({ 'e' : 1 })).toBe(true);
                expect(sl.lengthIs()).toBe(5);
                expect(sl.isFull()).toBe(false);
            }
        );

        it("should report whether it lacks an item", 
            function() {
                expect(sl.contains({ 'f' : 1 })).toBe(false);
            }
        );

        it("should delete items at its end", function() {
            sl.delete({ 'e' : 1 });

            expect(sl.lengthIs()).toBe(4);
            expect(sl.contains({ 'e' : 1 })).toBe(false);
            expect(sl.isFull()).toBe(false);
        });

        it("should delete items at its beginning", function() {
            sl.delete({ 'a' : 1 });

            expect(sl.lengthIs()).toBe(3);
            expect(sl.isFull()).toBe(false);
            expect(sl.contains({ 'a' : 1 })).toBe(false);
        });

        it("should delete items at its middle", function() {
            sl.delete({ 'c' : 1 });

            expect(sl.lengthIs()).toBe(2);
            expect(sl.isFull()).toBe(false);
            expect(sl.contains({ 'c' : 1 })).toBe(false);
        });
    });
    describe("merge test", function() {
        it("should merge two lists to populate itself", function() {
            var sl = new SortedList();
            var l1 = new SortedList();
            var l2 = new SortedList();

            l1.insert({a : 'a'});
            l1.insert({a : 'c'});
            l1.insert({a : 'e'});
            l1.insert({a : 'g'});

            l2.insert({a : 'b'});
            l2.insert({a : 'd'});
            l2.insert({a : 'f'});

            expect(sl.lengthIs()).toBe(0);

            sl.merge(l1, l2);

            sl.reset();
            expect(JSON.stringify(sl.getNext())).
                toBe(JSON.stringify({a : 'a'}));
            expect(JSON.stringify(sl.getNext())).
                toBe(JSON.stringify({a : 'b'}));
            expect(JSON.stringify(sl.getNext())).
                toBe(JSON.stringify({a : 'c'}));
            expect(JSON.stringify(sl.getNext())).
                toBe(JSON.stringify({a : 'd'}));
            expect(JSON.stringify(sl.getNext())).
                toBe(JSON.stringify({a : 'e'}));
            expect(JSON.stringify(sl.getNext())).
                toBe(JSON.stringify({a : 'f'}));
            expect(JSON.stringify(sl.getNext())).
                toBe(JSON.stringify({a : 'g'}));
        });
        it("should merge without duplicates", function() {
            var sl = new SortedList();
            var l1 = new SortedList();
            var l2 = new SortedList();

            l1.insert({a : 'a'});
            l1.insert({a : 'c'});
            l1.insert({a : 'f'});
            l1.insert({a : 'g'});

            l2.insert({a : 'a'});
            l2.insert({a : 'd'});
            l2.insert({a : 'f'});

            expect(sl.lengthIs()).toBe(0);

            sl.merge(l1, l2);

            sl.reset();
            expect(JSON.stringify(sl.getNext())).
                toBe(JSON.stringify({a : 'a'}));
            expect(JSON.stringify(sl.getNext())).
                toBe(JSON.stringify({a : 'c'}));
            expect(JSON.stringify(sl.getNext())).
                toBe(JSON.stringify({a : 'd'}));
            expect(JSON.stringify(sl.getNext())).
                toBe(JSON.stringify({a : 'f'}));
            expect(JSON.stringify(sl.getNext())).
                toBe(JSON.stringify({a : 'g'}));
        });
    });
});
