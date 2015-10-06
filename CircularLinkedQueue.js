'use strict';

var QueueErrors = require('./QueueErrors'),
	UnderflowError = QueueErrors.Underflow;

var CircularLinkedQueue = (function circularLinkedQueueIIFE(){
	/**	DOC
	 *
	 *	See ./LinkedStack.js for an explanation of the general
	 *		paradigm of the code in this IIFE.
	 *
	 */

	function QueueNode(item) {
		this.item = item;
		this.next = null;
	}
	QueueNode.prototype = {
		constructor : QueueNode,

		get next() {
			return this._next;
		},
		set next(n) {
			this._next = n;
		}
	};

	function CircularLinkedQueue() {
		this.rear = null;
	}
	CircularLinkedQueue.prototype.enq = function circularLinkedQueueEnqueue(item) {
		var itemNode = new QueueNode(item);

		if(!this.isEmpty()) {
			itemNode.next = this.rear.next;
			this.rear.next = itemNode;
			this.rear = itemNode;
		} else {
			itemNode.next = itemNode;
			this.rear = itemNode;
		}
	};
	CircularLinkedQueue.prototype.deq = function circularLinkedQueueDequeue() {
		if(this.isEmpty()) {
			throw new UnderflowError("Queue: dequeue attempted on empty queue.");
		}

		var head = this.rear.next;
		var result = head;

		if(this.rear !== head) {
			this.rear.next = head.next;
		} else {
			this.rear = null;
		}
		
		return result.item;
	};
	CircularLinkedQueue.prototype.isEmpty = function circularLinkedQueueIsEmpty() {
		return !this.rear;
	};

	return CircularLinkedQueue;
})();

module.exports = CircularLinkedQueue;
