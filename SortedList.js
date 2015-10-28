'use strict';

var copy = require('deepcopy');

var List = require('./List');

function defaultCompare(a, b) {
	var result = null;
	var aString = JSON.stringify(a),
		bString = JSON.stringify(b);

	if(aString === bString) {
		result = 0;
	} else if(aString > bString) {
		result = 1;
	} else {
		result = -1;
	}

	return result;
}

function SortedList(maxItems, compare) {
	List.call(this, maxItems, compare || defaultCompare); // super
}

(function() {
	// set parent class via prototypal inheritance
	// analogous to using the Java `extends` keyword
	SortedList.prototype = new List(1, function(a, b) {
		return Math.round(-1 + 2 * Math.random()); // useless!
	});
	SortedList.prototype.constructor = SortedList;

	// private methods and attributes
	// info. hiding achieved via closure
	function binarySearch(item) {
		// search list using bisect search
		// NOTICE: this returns an index,
		//		which may be `0`, a falsey value.
		//		Always test the return value for
		//		equality to `false`.
		var first = 0,
			last = this.numItems - 1,
			found = false,
			moreToSearch = first <= last;

		while(moreToSearch && found === false) {
			var midpoint = Math.floor((first + last)/2),
				compareResult = this.compare(item, this.array[midpoint]);

			if(compareResult === 0) {
				found = midpoint;
			} else if(compareResult < 0) {
				last = midpoint - 1;
			} else {
				first = midpoint + 1;
			}

			moreToSearch = first <= last;
		}

		return found;
	}

	// public methods and attributes
	SortedList.prototype.insert = function(item) {
		var location = this.numItems,
			currentItem,
			moreToSearch = location > 0;

		while(moreToSearch) {
			currentItem = this.array[location - 1];

			if(this.compare(item, currentItem) === 1) {
				moreToSearch = false;
			} else {
				this.array[location] = this.array[location - 1];
				moreToSearch = --location > 0;
			}
		}

		this.array[location] = copy(item);
		this.numItems++;
	};
	SortedList.prototype.delete = function(item) {
		var location = binarySearch.call(this, item);

		for(var index = location + 1; index < this.numItems; index++) {
			this.array[index - 1] = this.array[index];
		}

		this.numItems--;
	};
	SortedList.prototype.contains = function(item) {
		// search list using bisect search
		return binarySearch.call(this, item) === false ?
			false :
			true;
	};
})();

module.exports = SortedList;
