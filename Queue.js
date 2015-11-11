'use strict';

var QueueErrors = require('./QueueErrors'),
    UnderflowError = QueueErrors.Underflow,
    OverflowError = QueueErrors.Overflow;

var checkForNew = require('./checkForNew');

function Queue(cap) {
    checkForNew.call(this, "Queue");

    this.capacity = cap,
    this.array = new Array(this.capacity),
    this.offset = 0,
    this.numItems = 0;
}

Queue.prototype.enq = function QueueEnq(element) {
    if(this.numItems === this.capacity) {
        throw new OverflowError("Queue: enqueue attempted on full queue.");
    }

    var position = (this.offset + this.numItems) % this.capacity;

    this.array[position] = element;

    this.numItems++;
};

Queue.prototype.deq = function QueueDeq() {
    if(this.numItems < 1) {
        throw new UnderflowError("Queue: dequeue attempted on empty queue.");
    }

    var result = this.array[this.offset];
    this.array[this.offset] = null;

    this.numItems--;
    this.offset = (this.offset + 1) % this.capacity;

    return result;
};

Queue.prototype.isEmpty = function QueueIsEmpty() {
    return this.numItems === 0;
};

Queue.prototype.isFull = function QueueIsFull() {
    return this.numItems === this.capacity;
};

module.exports = Queue;

