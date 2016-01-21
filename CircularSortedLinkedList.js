'use strict';

var copy = require('deepcopy');
var LinkedList = require('./LinkedList');
var ListNode = require('./ListNode');

var Stack = require('./LinkedStack');

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

function CircularSortedLinkedList(compare) {
    LinkedList.call(this, compare || defaultCompare);
}
CircularSortedLinkedList.prototype = new LinkedList();
CircularSortedLinkedList.prototype.constructor = CircularSortedLinkedList;
CircularSortedLinkedList.prototype.reset = function circularSortedLinkedListReset() {
    if(this.list === null) {
        this.currentPos = this.list;
    } else {
        this.currentPos = this.list.next;
    }
};
CircularSortedLinkedList.prototype.contains = function circularSortedLinkedListContains(item) {
    var loc = this.list;
    var found = false;
    var moreToSearch = loc !== null;

    while(moreToSearch && !found) {
        var comparison = this.compare(loc.next.item, item);
        if(comparison === 0) {
            found = true;
        } else if(comparison > 0) {
            moreToSearch = false;
        } else {
            loc = loc.next;
            moreToSearch = loc !== this.list;
        }
    }

    return found;
};
CircularSortedLinkedList.prototype.delete = function circularSortedLinkedListDelete(item) {
    if(this.lengthIs() === 0) {
        throw new Error("LinkedList: delete attempted on empty list.");
    }

    var location = this.list;

    // special case: single-element list
    if(location === location.next) {
        if(this.compare(location.item, item) === 0) {
            this.list = null;
        } else {
            return;
        }
    } else {
        while(this.compare(location.next.item, item) !== 0) {
            location = location.next;
        }

        if(location.next === this.list) {
            this.list = location;
        }

        location.next = location.next.next;
    }

    this.numItems--;
};
CircularSortedLinkedList.prototype.insert = function circularSortedLinkedListInsert(item) {
    var newItem = new ListNode(copy(item));

    // empty list
    if(this.list === null) {
        newItem.next = newItem;
        this.list = newItem;
    } else {
        var prevLoc = this.list;
        var currLoc = this.list.next;
        var moreToSearch = true;

        while(moreToSearch) {
            if(this.compare(currLoc.item, item) > 0) {
                moreToSearch = false;
            } else {
                prevLoc = currLoc;
                currLoc = currLoc.next;
                moreToSearch = currLoc !== this.list.next;
            }
        }

        newItem.next = currLoc;
        prevLoc.next = newItem;

        // new rear of list
        if(this.compare(item, this.list.item) > 0) {
            this.list = newItem;
        }
    }

    this.numItems++;
};
// ch6ex4
CircularSortedLinkedList.prototype.printReverse = function csllPrintReverse() {
    var s = new Stack();
    var length = this.numItems;

    this.reset();

    for(var count = 0; count < length; count++) {
        s.push(this.getNext());
    }

    for(count = 0; count < length; count++) {
        console.log(s.pop());
    }
};
// closest thing available to a copy constructor (ch6ex2)
CircularSortedLinkedList.copy = function csllCopy(list) {
    var result = new CircularSortedLinkedList(list.compare);
    var length = list.numItems;

    list.reset();

    for(var count = 0; count < length; count++) {
        result.insert(list.getNext());
    }

    return result;
};
// ch6ex5d
CircularSortedLinkedList.prototype.inBetween = function(item) {
    var last = this.list;
    var first = last.next;

    return this.compare(first.item, item) === -1 &&
        this.compare(last.item, item) === 1;
};

module.exports = CircularSortedLinkedList;
