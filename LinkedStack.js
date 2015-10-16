'use strict';

var StackErrors = require('./StackErrors'),
	UnderflowError = StackErrors.Underflow;

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
	var globalObject;

	try {
		globalObject = global;
	} catch(e) {
		globalObject = window;
	}

	if(this === globalObject) {
		throw new SyntaxError("List: constructor called without the `new` keyword.");
	}

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
