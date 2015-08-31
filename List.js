'use strict';

var copy = require('deepcopy');

/**
 *
 *	For this generic ADT, we need flexibility in comparing
 *		member objects. In Java, this is achieved using
 *		interfaces. For us, we ask the user to supply
 *		a function:
 *		*	`compare`, a function describing an ordering relation over the List's members
 *			*	signature: takes two arguments, each potentially a list member
 *			*	returns: 1 for greater than, -1 for less than, 0 for equal to
 *
 */

function List(maxItems, compare) {
	var globalObject;

	try {
		globalObject = global;
	} catch(e) {
		globalObject = window;
	}

	if(this === globalObject) {
		throw new SyntaxError("List: constructor called without the `new` keyword.");
	}

	if(!(compare instanceof Function)) {
		if(compare === undefined) {
			compare = function(a, b) {
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
			};
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

/**
 *
 *	JavaScript's inheritance model doesn't provide an abstract
 *		method mechanism, so we merely leave them undefined.
 *
 */

module.exports = List;

