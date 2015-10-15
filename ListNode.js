'use strict';

function ListNode(item) {
	this.item = item;
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

module.exports = ListNode;
