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
});
