'use strict';

var ListNode = require('./ListNode');

function DoublyLinkedNode(item) {
	ListNode.call(this, item);
	this.prev = null;
}
DoublyLinkedNode.prototype = new ListNode(null);
DoublyLinkedNode.prototype.constructor = DoublyLinkedNode;
DoublyLinkedNode.prototype.__defineGetter__('prev', function() {
	return this._prev;
});
DoublyLinkedNode.prototype.__defineSetter__('prev', function(p) {
	this._prev = p;
});

module.exports = DoublyLinkedNode;
