'use strict';

var StackErrors = require('./StackErrors'),
    UnderflowError = StackErrors.Underflow;

var checkForNew = require('./checkForNew');

function StackNode(item, next) {
    this.item = item;
    this.next = next || null;
}
StackNode.prototype = {
    constructor : StackNode,

    get next() {
        return this._next;
    },
    set next(n) {
        this._next = n;
    }
};

function LinkedStack() {
    checkForNew.call(this, "LinkedStack");

    this.top = null;
}
LinkedStack.prototype.push = function linkedStackPush(item) {
    var itemNode = new StackNode(item, this.top);
    this.top = itemNode;
};
LinkedStack.prototype.pop = function linkedStackPop() {
    if(this.isEmpty()) {
        throw new UnderflowError("LinkedStack: pop attempted on empty stack.");
    }

    var result = this.top;
    this.top = this.top.next;
    return result.item;
};
LinkedStack.prototype.peek = function linkedStackPeek() {
    if(this.isEmpty()) {
        throw new UnderflowError("LinkedStack: peek attempted on empty stack.");
    }

    return this.top.item;
};
LinkedStack.prototype.isEmpty = function linkedStackIsEmpty() {
    return this.top === null;
};

module.exports = LinkedStack;
