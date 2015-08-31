'use strict';

function StringList(maxItems) {
	var globalObject;

	try {
		globalObject = global;
	} catch(e) {
		globalObject = window;
	}

	if(this === globalObject) {
		throw new SyntaxError("StringList: constructor called without the `new` keyword.");
	}

	var length = maxItems || 100;

	this.array = new Array(length);

	this.numItems = 0;
	this.currentPos = 0;
}

StringList.prototype.isFull = function() {
	return this.array.length === this.numItems;
};
StringList.prototype.lengthIs = function() {
	return this.numItems;
};
StringList.prototype.reset = function() {
	this.currentPos = 0;
};
StringList.prototype.getNext = function() {
	var next = this.array[this.currentPos++];

	this.currentPos %= this.numItems;

	return next.slice(0);
};

/**
 *	Methods of UnsortedStringList, SortedStringList, and other
 *		subclasses not present here can be considered abstract.
 *
 *	JavaScript's inheritance model doesn't provide an abstract
 *		method mechanism, so we merely leave them undefined.
 *
 */

module.exports = StringList;

