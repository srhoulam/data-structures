'use strict';

var L = require('../DoublyLinkedList');

describe("doubly linked list", function() {
    var l;

    beforeEach(function() {
        l = new L();
    });

    it("should insert elements in a sorted fashion", function() {
        // insert into an empty list
        l.insert('b');
        // insert at rear of list
        l.insert('c');
        // insert at head of list
        l.insert('a');

        expect(l.list.item).toBe('a');
        expect(l.list.next.item).toBe('b');
        expect(l.list.next.next.item).toBe('c');
    });

    it("should delete elements while preserving the sorting", function() {
        l.insert('a');
        l.insert('b');
        l.insert('c');
        l.insert('d');

        expect(l.list.item).toBe('a');
        expect(l.list.next.item).toBe('b');
        expect(l.list.next.next.item).toBe('c');
        expect(l.list.next.next.next.item).toBe('d');

        // delete from rear of list
        l.delete('d');

        expect(l.list.item).toBe('a');
        expect(l.list.next.item).toBe('b');
        expect(l.list.next.next.item).toBe('c');

        // delete from middle of list
        l.delete('b');

        expect(l.list.item).toBe('a');
        expect(l.list.next.item).toBe('c');

        // delete from head of list
        l.delete('a');

        expect(l.list.item).toBe('c');

        // delete lone element of list
        l.delete('c');

        expect(l.list).toBe(null);
    });

    it("should determine if it contains an item", function() {
        expect(l.contains('a')).toBe(false);

        l.insert('a');
        expect(l.contains('a')).toBe(true);
        expect(l.contains('b')).toBe(false);

        l.insert('b');
        expect(l.contains('a')).toBe(true);
        expect(l.contains('b')).toBe(true);
        expect(l.contains('c')).toBe(false);

        l.insert('c');
        expect(l.contains('a')).toBe(true);
        expect(l.contains('b')).toBe(true);
        expect(l.contains('c')).toBe(true);
        expect(l.contains('d')).toBe(false);

        l.delete('a');
        expect(l.contains('a')).toBe(false);
        expect(l.contains('b')).toBe(true);
        expect(l.contains('c')).toBe(true);

        l.delete('c');
        expect(l.contains('a')).toBe(false);
        expect(l.contains('b')).toBe(true);
        expect(l.contains('c')).toBe(false);

        l.delete('b');
        expect(l.contains('a')).toBe(false);
        expect(l.contains('b')).toBe(false);
        expect(l.contains('c')).toBe(false);
    });

    it("should retrieve items", function() {
        try {
            expect(l.retrieve('a') !== false).toBe(false);
        } catch(error) {
            expect(error.message).toBe("LinkedList: retrieve attempted on empty list.");
        }

        l.insert('a');
        expect(l.retrieve('a') !== false).toBe(true);
        expect(l.retrieve('b') !== false).toBe(false);

        l.insert('b');
        expect(l.retrieve('a') !== false).toBe(true);
        expect(l.retrieve('b') !== false).toBe(true);
        expect(l.retrieve('c') !== false).toBe(false);

        l.insert('c');
        expect(l.retrieve('a') !== false).toBe(true);
        expect(l.retrieve('b') !== false).toBe(true);
        expect(l.retrieve('c') !== false).toBe(true);
        expect(l.retrieve('d') !== false).toBe(false);

        l.delete('a');
        expect(l.retrieve('a') !== false).toBe(false);
        expect(l.retrieve('b') !== false).toBe(true);
        expect(l.retrieve('c') !== false).toBe(true);

        l.delete('c');
        expect(l.retrieve('a') !== false).toBe(false);
        expect(l.retrieve('b') !== false).toBe(true);
        expect(l.retrieve('c') !== false).toBe(false);

        l.delete('b');
        try {
            expect(l.retrieve('a') !== false).toBe(false);
            expect(l.retrieve('b') !== false).toBe(false);
            expect(l.retrieve('c') !== false).toBe(false);
        } catch(error) {
            expect(error.message).toBe("LinkedList: retrieve attempted on empty list.");
        }
    });


    it("should keep track of its length", function() {
        for(var index = 0; index < 100; index++) {
            expect(l.lengthIs()).toBe(index);
            l.insert({
                i : index
            });
        }
        for(index = 99; index >= 0; index--) {
            expect(l.lengthIs()).toBe(index + 1);
            l.delete({
                i : index
            });
        }
        expect(l.lengthIs()).toBe(0);
    });

    it("should never be full", function() {
        for(var index = 0; index < 100; index++) {
            expect(l.isFull()).toBe(false);
            l.insert({
                i : index
            });
        }
    });

    it("should allow traversal in both directions", function() {
        var alphabet = 'abcdefghijklmnopqrstuvwxyz';
        for(var index = 0; index < 26; index++) {
            l.insert({
                i : alphabet[index]
            });
        }
        l.reset();
        for(index = 0; index < 25; index++) {
            expect(JSON.stringify(l.getNext())).toBe(JSON.stringify({
                i : alphabet[index]
            }));
        }
        for(;index >= 0; index--) {
            expect(JSON.stringify(l.getPrev())).toBe(JSON.stringify({
                i : alphabet[index]
            }));
        }
    });
});
