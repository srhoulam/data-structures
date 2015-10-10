'use strict';

var copy = require('deepcopy');

var LinkedList = (function linkedListIIFE() {
	function LinkedList(compare) {
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
			throw new RangeError("LinkedList: unacceptable `cmp` argument.");
			}
		}

		this.list = null;
		this.numItems = 0;
		this.currentPos = null;
		this.compare = compare;
	}
	LinkedList.prototype.isFull = function linkedListIsFull() {
		return false;
	};
	LinkedList.prototype.lengthIs = function linkedListLengthIs() {
		return this.numItems;
	};
	LinkedList.prototype.reset = function linkedListReset() {
		this.currentPos = this.list;
	};
	LinkedList.prototype.getNext = function linkedListGetNext() {
		var nextItem;

		if(this.currentPos) {
			nextItem = copy(this.currentPos.item);

			if(this.currentPos.next) {
				this.currentPos = this.currentPos.next;
			} else {
				this.reset();
			}			
		} else {
			nextItem = null;
		}

		return nextItem;
	};
	LinkedList.prototype.retrieve = function linkedListRetrieve(item) {
		if(this.lengthIs() === 0) {
			throw new Error("LinkedList: retrieve attempted on empty list.");
		}

		var location = this.link;
		var found = false;

		while(!found && location !== null) {
			if(this.compare(location.item, item) === 0) {
				found = copy(location.item);
			} else {
				location = location.next;
			}
		}

		return found;
	};
	LinkedList.prototype.delete = function linkedListDelete(item) {
		if(this.lengthIs() === 0) {
			throw new Error("LinkedList: delete attempted on empty list.");
		}

		var location = this.list;
		var found = false;

		// special case: delete the first list element
		if(this.compare(location.item, item) === 0) {
			this.list = location.next;
			found = true;
		}
		while(!found && location.next) {
			if(this.compare(location.next.item, item) === 0) {
				found = true;
				location.next = location.next.next;
			} else {
				location = location.next;
			}
		}

		this.numItems--;

		return found;
	};

	return LinkedList;
})();

module.exports = LinkedList;
