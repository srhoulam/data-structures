'use strict';

var QueueErrors = require('./QueueErrors'),
	UnderflowError = QueueErrors.Underflow;

var checkForNew = require('./checkForNew');

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
	checkForNew.call(this, "LinkedQueue");

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

module.exports = LinkedQueue;
