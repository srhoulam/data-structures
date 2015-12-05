'use strict';

var checkForNew = require('./checkForNew');
var DLNode = require('./DoublyLinkedNode');

//  stores duplicate elements
//  doubly-linked list or array list
function SpecialList() {
    checkForNew.call(this, 'SpecialList');

    this.front = null;
    this.rear = null;
    this.numItems = 0;
    this.fPos = null;
    this.rPos = null;
}
//  methods needed:
//      lengthIs,
SpecialList.prototype.lengthIs = function sListLengthIs() {
    return this.numItems;
};
//      resetForward,
SpecialList.prototype.resetForward = function sListResetF() {
    this.fPos = this.front;
};
//      resetBackward,
SpecialList.prototype.resetBackward = function sListResetB() {
    this.rPos = this.rear;
};
//      getNext,
SpecialList.prototype.getNext = function sListGetNext() {
    var result = this.fPos;

    if(result !== null) {
        this.fPos = this.fPos.next;
        result = result.item;
    }

    return result;
};
//      getPrev,
SpecialList.prototype.getPrev = function sListGetPrev() {
    var result = this.rPos;

    if(result !== null) {
        this.rPos = this.rPos.prev;
        result = result.item;
    }

    return result;
};
//      insertFront,
SpecialList.prototype.insertFront = function sListInsFront(item) {
    var newItem = new DLNode(validateItem(item));
    newItem.next = this.front;

    if(this.numItems === 0) {
        this.rear = newItem;
    } else {
        this.front.prev = newItem;
    }

    this.front = newItem;
    this.numItems++;
};
//      insertRear
SpecialList.prototype.insertRear = function sListInsRear(item) {
    var newItem = new DLNode(validateItem(item));
    newItem.prev = this.rear;

    if(this.numItems === 0) {
        this.front = newItem;
    } else {
        this.rear.next = newItem;
    }

    this.rear = newItem;
    this.numItems++;
};
//  special functionality needed:
//      can traverse list forward and backward separately

function validateItem(item) {
    //  use Int8Array to fit `item` into Java `byte` constraints
    var signedIntArray = new Int8Array(1);
    signedIntArray[0] = item;
    return signedIntArray[0];
}

module.exports = SpecialList;
