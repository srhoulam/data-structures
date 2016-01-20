'use strict';

var copy = require('deepcopy');
var checkForNew = require('./checkForNew');
/**
 *
 *  For this generic ADT, we need flexibility in comparing
 *      member objects. In Java, this is achieved using
 *      interfaces. For us, we ask the user to supply
 *      a function:
 *      *   `compare`, a function describing an ordering relation over the List's members
 *          *   signature: takes two arguments, each potentially a list member
 *          *   returns: 1 for greater than, -1 for less than, 0 for equal to
 *
 */

function List(maxItems, compare) {
    checkForNew.call(this, "List");

    if(!(compare instanceof Function)) {
        if(compare === undefined) {
            compare = defaultCompare;
        } else {
            throw new TypeError("List: `compare` is not a function.");
        }
    }

    var length = maxItems || 100;
    this.array = new Array(length);
    this.compare = compare;
    this.numItems = 0;
    this.currentPos = 0;
}

List.prototype.isFull = function() {
    return this.array.length === this.numItems;
};
List.prototype.lengthIs = function() {
    return this.numItems;
};
List.prototype.reset = function() {
    this.currentPos = 0;
};
List.prototype.getNext = function() {
    var next = this.array[this.currentPos++];

    this.currentPos %= this.numItems;

    return copy(next);
};

function defaultCompare(a, b) {
    // good default for unsorted list
    var result;
    if(a instanceof Object || b instanceof Object) {
        let strA = JSON.stringify(a);
        let strB = JSON.stringify(b);

        if(strA === strB) {
            result = 0;
        } else if(strA > strB) {
            result = 1;
        } else {
            result = -1;
        }
    } else {
        if(a === b) {
            result = 0;
        } else if(a > b) {
            result = 1;
        } else {
            result = -1;
        }
    }

    return result;
}

/**
 *
 *  JavaScript's inheritance model doesn't provide an abstract
 *      method mechanism, so we merely leave them undefined.
 *
 */

module.exports = List;
