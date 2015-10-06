'use strict';

var Queue = require('../Queue');

var QueueErrors = require('../QueueErrors'),
	UnderflowError = QueueErrors.Underflow,
	OverflowError = QueueErrors.Overflow;

describe("queue, basic operations", function() {
	var q = new Queue(10);

	it("should enqueue elements", function() {
		for(var index=0; index < 10; index++) {
			q.enq(index);
		}
	});

	it("should know when it's full", function() {
		expect(q.isFull()).toBe(true);
	});

	it("should throw if enqueued past its capacity", function() {
		try {
			q.enq('fail');
			fail("Didn't throw.");
		} catch(e) {
			expect(e instanceof OverflowError).toBe(true);
		}
	});

	it("should dequeue elements in the correct order", function() {
		for(var index=0; index < 10; index++) {
			expect(q.deq()).toBe(index);
		}
	});

	it("should know when it's empty", function() {
		expect(q.isEmpty()).toBe(true);
	});

	it("should throw if dequeued past emptiness", function() {
		try {
			q.deq();
			fail("Didn't throw.");
		} catch(e) {
			expect(e instanceof UnderflowError).toBe(true);
		}
	});
});

describe("queue, tricky operations", function() {
	var q;
	beforeAll(function() {
		q = new Queue(10);
		for(var index=0; index < 10; index++) {
			q.enq(index);
		}
		q.deq();
	});

	it("should wrap around the array like an ouroboros", function() {
		expect(q.offset).toBe(1);
		q.enq(11);
		q.deq();
		expect(q.offset).toBe(2);
		q.enq(12);
		q.deq();
		expect(q.offset).toBe(3);
	});
});

