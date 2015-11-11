'use strict';

var copy = require('deepcopy');
var checkForNew = require('./checkForNew');

function defaultCompare(a, b) {
    // good default for unsorted list
    var result;
    if(a instanceof Object || b instanceof Object) {
        result = JSON.stringify(a) === JSON.stringify(b);
    } else {
        result = a === b;
    }

    return result ?
        0 :
        1;
}

function LinkedList(compare) {
    checkForNew.call(this, "LinkedList");

    if(!(compare instanceof Function)) {
        if(compare === undefined) {
            compare = defaultCompare;
        } else {
            throw new RangeError("LinkedList: unacceptable `compare` argument.");
        }
    }

    this.list = null;
    this.numItems = 0;
    this.currentPos = null;
    this.compare = compare;
}
LinkedList.prototype.isFull = function linkedListIsFull() {
    return false;
};
LinkedList.prototype.lengthIs = function linkedListLengthIs() {
    return this.numItems;
};
// Nell Dale, chapter 5, exercise 14
LinkedList.prototype.dumbLengthIs = function linkedListDumbLengthIs() {
    if(this.list === null) {
        return 0;
    }

    var loc = this.list;

    for(var length = 1; loc.next !== null; length++) {
        loc = loc.next;
    }

    return length;
};
LinkedList.prototype.reset = function linkedListReset() {
    this.currentPos = this.list;
};
LinkedList.prototype.getNext = function linkedListGetNext() {
    var nextItem;

    if(this.currentPos !== null) {
        nextItem = copy(this.currentPos.item);
        this.currentPos = this.currentPos.next;
    } else {
        nextItem = null;
    }

    return nextItem;
};
LinkedList.prototype.retrieve = function linkedListRetrieve(item) {
    if(this.lengthIs() === 0) {
        throw new Error("LinkedList: retrieve attempted on empty list.");
    }

    var location = this.list;
    var found = false;

    while(!found && location !== null) {
        if(this.compare(location.item, item) === 0) {
            found = copy(location.item);
        } else {
            location = location.next;
        }
    }

    return found;
};
LinkedList.prototype.delete = function linkedListDelete(item) {
    if(this.lengthIs() === 0) {
        throw new Error("LinkedList: delete attempted on empty list.");
    }

    var location = this.list;
    var found = false;

    // special case: delete the first list element
    if(this.compare(location.item, item) === 0) {
        this.list = location.next;
        found = true;
    }
    while(!found && location.next !== null) {
        if(this.compare(location.next.item, item) === 0) {
            found = true;
            location.next = location.next.next;
        } else {
            location = location.next;
        }
    }

    this.numItems--;

    return found;
};

module.exports = LinkedList;
