'use strict';

var copy = require('deepcopy');
var LinkedList = require('./LinkedList');

var UnsortedLinkedList = (function unsortedLinkedListIIFE() {
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

	function UnsortedLinkedList(compare) {
		LinkedList.call(this, compare); //super
	}
	UnsortedLinkedList.prototype = new LinkedList();
	UnsortedLinkedList.prototype.insert = function unsortedLinkedListInsert(item) {
		var newItem = new ListNode(item);
		newItem.next = this.list;
		this.list = newItem;
		this.numItems++;
	};
	UnsortedLinkedList.prototype.contains = function unsortedLinkedListContains(item) {
		var loc = this.list;
		var found = false;
		var moreToSearch = loc.next !== null;

		while(moreToSearch && !found) {
			if(this.compare(item, loc.item) === 0) {
				found = true;
			} else {
				loc = loc.next;
				moreToSearch = loc.next !== null;
			}
		}

		return found;
	};

	return UnsortedLinkedList;
})();

module.exports = UnsortedLinkedList;
