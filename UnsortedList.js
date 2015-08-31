'use strict';

var copy = require('deepcopy');

var List = require('./List');

function UnsortedList(maxItems, compare) {
	List.call(this, maxItems, compare); // super
}

UnsortedList.prototype = new List(1, function(a, b) {
	return Math.round(-1 + 2 * Math.random()); // useless!
});

UnsortedList.prototype.contains = function(item) {
	var found = false;

	for(var index = 0; index < this.numItems && !found; index++) {
		if(this.compare(item, this.array[index]) === 0) {
			found = true;
		}
	}

	return found;
};
UnsortedList.prototype.insert = function(item) {
	this.array[this.numItems] = copy(item);
	this.numItems++;
};
UnsortedList.prototype.delete = function(item) {
	var location = 0;

	while(location < this.numItems && this.compare(this.array[location], item) !== 0) {
		location++;
	}

	this.array[location] = this.array[this.numItems - 1];
	this.numItems--;
};

module.exports = UnsortedList;

