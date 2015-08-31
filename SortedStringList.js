'use strict';

var StringList = require('./StringList');

function SortedStringList(maxItems) {
	StringList.call(this, maxItems); // super
}

(function() {
	// set parent class via prototypal inheritance
	// analogous to using the Java `extends` keyword
	SortedStringList.prototype = new StringList();

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
				compareResult = (item == this.array[midpoint]) ?
					0 : // Java-style `String.compareTo`
					(item > this.array[midpoint] ? 1 : -1);
				// So sorry for nesting tertiaries! ;D

			if(compareResult == 0) {
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
	SortedStringList.prototype.insert = function(item) {
		var location = this.numItems,
			currentItem,
			moreToSearch = location > 0;

		while(moreToSearch) {
			currentItem = this.array[location - 1];

			if(item > currentItem) {
				moreToSearch = false;
			} else {
				this.array[location] = this.array[location - 1];
				moreToSearch = --location > 0;
			}
		}

		this.array[location] = item.slice(0);
		this.numItems++;
	};
	SortedStringList.prototype.delete = function(item) {
		var location = binarySearch.call(this, item);

		for(var index = location + 1; index < this.numItems; index++) {
			this.array[index - 1] = this.array[index];
		}

		this.numItems--;
	};
	SortedStringList.prototype.contains = function(item) {
		// search list using bisect search
		return binarySearch.call(this, item) === false ?
			false :
			true;
	};
})();

module.exports = SortedStringList;

