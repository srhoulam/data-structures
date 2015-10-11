'use strict';

var copy = require('deepcopy');
var LinkedList = require('./LinkedList');

var SortedLinkedList = (function() {
	/**	DOC
	 *
	 *	See ./LinkedStack.js for an explanation of the general
	 *		paradigm of the code in this IIFE.
	 *
	 */

	function ListNode(item) {
		this.item = copy(item);
		this.next = null;
	}
	ListNode.prototype = {
		constructor : ListNode,

		get next() {
			return this._next;
		},
		set next(n) {
			this._next = n;
		}
	};

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

	function SortedLinkedList(compare) {
		LinkedList.call(this, compare || defaultCompare); //super
	}
	SortedLinkedList.prototype = new LinkedList();
	SortedLinkedList.prototype.insert = function sortedLinkedListInsert(item) {
		var prevLoc = null;
		var currLoc = this.list;
		var moreToSearch = currLoc !== null;

		while(moreToSearch) {
			if(this.compare(item, currLoc.item) < 0) {
				moreToSearch = false; // redundant
			} else {
				prevLoc = currLoc;
				currLoc = currLoc.next;
				moreToSearch = currLoc !== null;
			}
		}

		var newItem = new ListNode(item);
		newItem.next = currLoc;

		if(prevLoc === null) {
			this.list = newItem;
		} else {
			prevLoc.next = newItem;
		}

		this.numItems++;
	}
	SortedLinkedList.prototype.contains = function sortedLinkedListContains(item) {
		var loc = this.list;
		var found = false;
		var moreToSearch = loc !== null;

		while(moreToSearch && !found) {
			var comparison = this.compare(item, loc.item);
			if(comparison === 0) {
				found = true;
			} else if(comparison < 0) {
				moreToSeach = false;
			} else {
				loc = loc.next;
				moreToSearch = loc !== null;
			}
		}

		return found;
	}

	return SortedLinkedList;
})();

module.exports = SortedLinkedList;
