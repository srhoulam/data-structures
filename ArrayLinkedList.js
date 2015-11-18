'use strict';

var ALNode = require('./ArrayListNode');
var checkForNew = require('./checkForNew');
var copy = require('deepcopy');

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

function ArrayLinkedList(length, compare) {
    checkForNew.call(this, "ArrayLinkedList");

    if(!(compare instanceof Function)) {
        if(compare === undefined) {
            compare = defaultCompare;
        } else {
            throw new RangeError("ArrayLinkedList: unacceptable `compare` argument.");
        }
    }

    // to imitate an "actual" fixed-length array
    this.maxLength = length > 0 ? length : 1;
    this.list = new Array(this.maxLength);
    this.numItems = 0;
    this.first = -1;
    this.currentPos = 0;
    this.compare = compare;

    // initialize array to `null`
    for(var index = 0; index < this.maxLength; index++) {
        this.list[index] = null;
    }
}
ArrayLinkedList.prototype.isFull = function alListIsFull() {
    return this.numItems >= this.maxLength;
};
ArrayLinkedList.prototype.lengthIs = function alListLengthIs() {
    return this.numItems;
};
ArrayLinkedList.prototype.reset = function alListReset() {
    this.currentPos = this.first;
};
ArrayLinkedList.prototype.getNext = function alListGetNext() {
    var result = this.list[this.currentPos];
    this.currentPos = result.nextIndex;
    return result.item;
};
ArrayLinkedList.prototype.contains = function alListContains(item) {
    var currItem = this.list[this.first];
    while(currItem.nextIndex !== -1 && this.compare(currItem.item, item) !== 0) {
        currItem = this.list[currItem.nextIndex];
    }
    if(this.compare(currItem.item, item) === 0) {
        return true;
    } else {
        return false;
    }
};
ArrayLinkedList.prototype.retrieve = function alListRetrieve(item) {
    var currItem = this.list[this.first];
    while(currItem.nextIndex !== -1 && this.compare(currItem.item, item) !== 0) {
        currItem = this.list[currItem.nextIndex];
    }
    if(this.compare(currItem.item, item) === 0) {
        return copy(currItem.item);
    } else {
        return false;
    }
};
ArrayLinkedList.prototype.insert = function alListInsert(item) {
    if(this.numItems === this.maxLength) {
        throw new Error("ArrayLinkedList: the list is at capacity.");
    }

    var newItem = new ALNode(copy(item));

    if(this.first === -1) {
        this.list[0] = newItem;
        this.first = 0;
    } else {
        for(var index = 0; index < this.maxLength; index++) {
            if(this.list[index] === null) {
                this.list[index] = newItem;
                break;
            }
        }
        var currItem = this.list[this.first];
        while(currItem.nextIndex !== -1) {
            currItem = this.list[currItem.nextIndex];
        }

        currItem.nextIndex = index;
    }

    this.numItems++;
};
ArrayLinkedList.prototype.delete = function alListDelete(item) {
    var prevItem = null;
    var currItem = this.list[this.first];
    while(currItem.nextIndex !== -1 && this.compare(currItem.item, item) !== 0) {
        prevItem = currItem;
        currItem = this.list[currItem.nextIndex];
    }
    if(this.compare(currItem.item, item) === 0) {
        if(currItem === this.list[this.first]) {
            let nextIndex = currItem.nextIndex;
            this.list[this.first] = null;
            this.first = nextIndex;
        } else {
            let nextNext = currItem.nextIndex;
            this.list[prevItem.nextIndex] = null;
            prevItem.nextIndex = nextNext;
        }
    
        this.numItems--;
    }
};

module.exports = ArrayLinkedList;
