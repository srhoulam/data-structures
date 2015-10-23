'use strict';

// Nell Dale, chapter 4, exercise 8

var StackErrors = require('./StackErrors'),
	UnderflowError = StackErrors.Underflow,
	OverflowError = StackErrors.Overflow;

var checkForNew = require('./checkForNew');

function DoubleStack(maxHeight) {
	checkForNew.call(this, "DoubleStack");

	this.maxHeight = maxHeight || 100;
	this.array = new Array(maxHeight);
	this.height1 = 0,
	this.height2 = 0;
}

DoubleStack.prototype.isEmpty = function() {
	return this.height1 === 0 && this.height2 === 0;
};
DoubleStack.prototype.isFull = function() {
	return (this.height1 + this.height2) === this.maxHeight;
};
DoubleStack.prototype.push = function(item) {
	if(this.isFull()) {
		throw new OverflowError("Stack: could not push element to stack.");
	}

	if(this.height1 < (this.maxHeight - this.height2)) {
		if(item % 2 === 0) {
			this.array[this.maxHeight - ++this.height2] = item;
		} else {
			this.array[this.height1++] = item;
		}
	} else {
		throw new OverflowError("Stack: could not push element to stack.");
	}
};
DoubleStack.prototype.peek = function() {
	if(this.isEmpty()) {
		throw new UnderflowError("Stack: nothing to see here.");
	}

	if(this.height1 < this.height2) {
		return this.array[this.height1 - 1];
	} else {
		return this.array[this.maxHeight - this.height2];
	}
};
DoubleStack.prototype.pop = function() {
	if(this.isEmpty()) {
		throw new UnderflowError("Stack: attempted to pop while empty.");
	}

	var returnValue;
	if(this.height1 >= this.height2) {
		returnValue = this.array[this.height1 - 1];
		this.array[this.height1 - 1] = null;
		this.height1--;
	} else {
		returnValue = this.array[this.maxHeight - this.height2];
		this.array[this.maxHeight - this.height2] = null;
		this.height2--;
	}

	return returnValue;
};

module.exports = DoubleStack;

