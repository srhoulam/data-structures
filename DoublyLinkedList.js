'use strict';

var copy = require('deepcopy');
var LinkedList = require('./LinkedList');
var DLNode = require('./DoublyLinkedNode');

function defaultCompare(a, b) {
    var result = null;
    var aString = JSON.stringify(a),
        bString = JSON.stringify(b);

    if(aString === bString) {
        result = 0;
    } else if(aString > bString) {
        result = 1;
    } else {
        result = -1;
    }

    return result;
}

function DoublyLinkedList(compare) {
    /** NOTE
     *
     *  This constructor would have exactly duplicated `LinkedList`.
     *  It would then be a good idea to have this class
     *      inherit from `LinkedList` to reduce code repetition.
     *  However, the text states that it should not because a
     *      singly-linked list and a doubly-linked list
     *      are different at the logical level.
     *  Ultimately, since a doubly-linked list can be substituted
     *      anywhere one can use a singly-linked list without
     *      diminishing its functionality, I have decided to
     *      make it inherit from `LinkedList`. (Liskov Sub. Principle)
     *
     */

    LinkedList.call(this, compare || defaultCompare); //super
}
DoublyLinkedList.prototype = new LinkedList();
DoublyLinkedList.prototype.constructor = DoublyLinkedList;
DoublyLinkedList.prototype.insert = function dlListInsert(item) {
    var location = this.list;

    var newItem = new DLNode(copy(item));

    if(this.numItems === 0) {
        // special case: inserting into an empty list
        this.list = newItem;
        newItem.prev = null;
        newItem.next = null;
    } else {
        // normal case: inserting into a non-empty list
        while(location.next !== null && this.compare(item, location.item) > 0) {
            location = location.next;
        }

        // inserting into rear of list
        if(location.next === null && this.compare(item, location.item) > 0) {
            newItem.next = location.next;
            newItem.prev = location;
            location.next = newItem;
        } else {
            // inserting in the middle or front of list
            newItem.prev = location.prev;
            newItem.next = location;

            // inserting into the middle
            if(location.prev !== null) {
                location.prev.next = newItem;
            }

            location.prev = newItem;

            // inserting into the front of the list
            if(location === this.list) {
                this.list = newItem;
            }
        }
    }

    this.numItems++;
};
DoublyLinkedList.prototype.contains = function dlListContains(item) {
    var loc = this.list;
    var found = false;
    var moreToSearch = loc !== null;

    while(moreToSearch && !found) {
        var comparison = this.compare(item, loc.item);
        if(comparison === 0) {
            found = true;
        } else if(comparison < 0) {
            moreToSearch = false;
        } else {
            loc = loc.next;
            moreToSearch = loc !== null;
        }
    }

    return found;
};
DoublyLinkedList.prototype.getPrev = function dlListGetPrev() {
    var prevItem;

    if(this.currentPos !== null) {
        prevItem = copy(this.currentPos.item);
        this.currentPos = this.currentPos.prev;
    } else {
        prevItem = null;
    }

    return prevItem;
};

/* extraneous!
DoublyLinkedList.prototype.delete = function dlListDelete(item) {
    if(this.numItems === 0) {
        return;
    }

    var location = this.list;

    while(location !== null && this.compare(item, location.item) !== 0) {
        // seek through the list
        location = location.next;
    }

    if(location !== null) {
        // remove item

        if(location.next === location.prev) {
            // delete a list of one element
            this.list = null;
        } else if(location === this.list) {
            // delete from head of list
            this.list = this.list.next;
            this.list.prev = null;
        } else {
            // guard clause for end of list
            if(location.next !== null) {
                location.next.prev = location.prev;
            }

            location.prev.next = location.next;
        }

        // decrement `numItems`
        this.numItems--;
    }
};
*/

module.exports = DoublyLinkedList;
