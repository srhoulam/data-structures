'use strict';

var QueueErrors = require('./QueueErrors'),
	UnderflowError = QueueErrors.Underflow;

var LinkedQueue = (function linkedQueueIIFE(){
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

	function LinkedQueue() {
		var globalObject;

		try {
			globalObject = global;
		} catch(e) {
			globalObject = window;
		}

		if(this === globalObject) {
			throw new SyntaxError("List: constructor called without the `new` keyword.");
		}

		this.head = this.rear = null;
	}
	LinkedQueue.prototype.enq = function linkedQueueEnqueue(item) {
		var itemNode = new QueueNode(item);

		if(!this.isEmpty()) {
			this.rear.next = itemNode;
			this.rear = itemNode;
		} else {
			this.head = this.rear = itemNode;
		}
	};
	LinkedQueue.prototype.deq = function linkedQueueDequeue() {
		if(this.isEmpty()) {
			throw new UnderflowError("Queue: dequeue attempted on empty queue.");
		}

		var result = this.head;

		if(this.head !== this.rear) {
			this.head = this.head.next;
		} else {
			this.head = this.rear = null;
		}
		
		return result.item;
	};
	LinkedQueue.prototype.isEmpty = function linkedQueueIsEmpty() {
		return this.head === null && this.rear === null;
	};

	return LinkedQueue;
})();

module.exports = LinkedQueue;
