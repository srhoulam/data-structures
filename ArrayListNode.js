'use strict';

function ArrayListNode(item) {
    this.item = item;
    this.nextIndex = -1; // invalid array index
}

ArrayListNode.prototype = {
    constructor : ArrayListNode,

    get next() {
        return this._next;
    },
    set next(n) {
        this._next = n;
    }
};

module.exports = ArrayListNode;
