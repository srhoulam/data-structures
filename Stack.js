'use strict';

var StackErrors = require('./StackErrors'),
	UnderflowError = StackErrors.Underflow,
	OverflowError = StackErrors.Overflow;

function Stack(maxHeight) {
	var globalObject;

	try {
		globalObject = global;
	} catch(e) {
		globalObject = window;
	}

	if(this === globalObject) {
		throw new SyntaxError("Stack: constructor called without the `new` keyword.");
	}

	this.maxHeight = maxHeight || 100;
	this.array = new Array(this.maxHeight);
	this.height = 0;
}

Stack.prototype.isEmpty = function() {
	return this.height === 0;
};
Stack.prototype.isFull = function() {
	return this.height === this.maxHeight;
};
Stack.prototype.push = function(item) {
	if(this.isFull()) {
		throw new OverflowError("Stack: could not push element to stack.");
	}

	this.array[this.height++] = item;
};
Stack.prototype.peek = function() {
	if(this.isEmpty()) {
		throw new UnderflowError("Stack: nothing to see here.");
	}

	return this.array[this.height - 1];
};
Stack.prototype.pop = function() {
	if(this.isEmpty()) {
		throw new UnderflowError("Stack: attempted to pop while empty.");
	}

	var returnValue = this.array[--this.height];
	this.array[this.height] = null;
	return returnValue;
};
//Nell Dale, chapter 4, exercise 10
Stack.prototype.inspector = function(index) {
	if(index < 1) {
		throw new OverflowError("Stack: index out of range.");
	}
	else if(index > this.height) {
		throw new UnderflowError("Stack: index out of range.");
	}

	var position = this.height - index;
	return this.array[position];
};

module.exports = Stack;
