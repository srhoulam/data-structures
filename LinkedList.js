'use strict';

var copy = require('deepcopy');

var LinkedList = (function linkedListIIFE() {
	function LinkedList(cmp) {
		this.list = null;
		this.numItems = 0;
		this.currentPos = null;

		if(cmp instanceof Function) {
			this.compare = cmp;
		} else if(cmp === undefined) {
			this.compare = function defaultCompare(a, b) {
				return a === b ?
					0 :
					(a > b ?
						1 :
						-1);
			};
		} else {
			throw new RangeError("LinkedList: unacceptable `cmp` argument.");
		}
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

		while(!found) {
			if(this.compare(location.item, item) === 0) {
				found = true;
			} else {
				location = location.next;
			}
		}

		return copy(location.item);
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
