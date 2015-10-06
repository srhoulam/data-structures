'use strict';

var Queue = require('../CircularLinkedQueue');
var QueueErrors = require('../QueueErrors'),
	UnderflowError = QueueErrors.Underflow;

describe("linked queue", function() {
	var q = new Queue();

	it("should know when it's empty", function() {
		expect(q.isEmpty()).toBe(true);
	});

	it("should throw if dequeued while empty", function() {
		try {
			q.deq();
			fail("Didn't throw.");
		} catch(e) {
			expect(e instanceof UnderflowError).toBe(true);
		}
	});

	it("should enqueue elements", function() {
		for(var index=0; index < 10; index++) {
			q.enq(index);
		}
	});

	it("should know when it's not empty", function() {
		expect(q.isEmpty()).toBe(false);
	});

	it("should dequeue elements in the same order as enqueued", function() {
		for(var index=0; index < 10; index++) {
			expect(q.deq()).toBe(index);
		}
	});
});
