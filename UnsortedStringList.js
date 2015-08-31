'use strict';

var StringList = require('./StringList');

function UnsortedStringList(maxItems) {
	StringList.call(this, maxItems); // super
}

UnsortedStringList.prototype = new StringList();

UnsortedStringList.prototype.contains = function(item) {
	var found = false;

	for(var index = 0; index < this.numItems && !found; index++) {
		if(item == this.array[index]) {
			found = true;
		}
	}
	// we use `==` rather than `===` here for semantics.
	//	we are dealing with copies, not aliases, even
	//	though the interpreter stores duplicate immutables
	//	as aliases, not copies.
	// when we extend this to other kinds of objects, which
	//	may not be immutable, we will benefit from this
	//	decision.

	return found;
};
UnsortedStringList.prototype.insert = function(item) {
	this.array[this.numItems] = item.slice(0);
	this.numItems++;
};
UnsortedStringList.prototype.delete = function(item) {
	var location = 0;

	while(this.array[location] != item && location < this.numItems) {
		location++;
	}

	this.array[location] = this.array[this.numItems - 1];
	this.numItems--;
};

module.exports = UnsortedStringList;

