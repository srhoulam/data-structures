'use strict';

var USL = require('./UnsortedStringList');

function runTest(test, usl) {
	return test(usl);
}

function test1(usl) {
	var failCount = 0;

	// test `insert`, `lengthIs`
	usl.insert('test1');
	usl.insert('test2');
	usl.insert('test3');
	if(usl.lengthIs() !== 3) failCount++;
	usl.delete('test1');
	if(usl.lengthIs() !== 2) failCount++;

	// test `reset`, `getNext`
	usl.reset();
	if(usl.getNext() != 'test3') failCount++;
	if(usl.getNext() != 'test2') failCount++;
	// we use `!=` here rather than `!==` because the list stores
	//	and returns copies, not references.
	// it's bad practice to use knowledge of the implementation
	//	in one's tests.

	return failCount;
}

function test2() {
	var size = 5;
	var usl = new USL(size);
	var failCount = 0;

	// test `lengthIs` with an empty list
	if(usl.lengthIs() !== 0) failCount++;

	// test `contains`, `isFull`
	var i = 0;
	do {
		usl.insert('test' + i);
		if(!usl.contains('test' + i)) failCount++;

		i++;
	} while(i < size - 1);

	if(usl.isFull()) failCount++;

	usl.insert('test4');
	if(!usl.isFull()) failCount++;
	if(usl.lengthIs() !== size) failCount++;
	if(usl.contains('test5')) failCount++;

	// test `delete` at end of list
	usl.delete('test4');
	if(usl.contains('test4')) failCount++;
	if(!(usl.lengthIs() === 4)) failCount++;

	// ... at beginning of list
	usl.delete('test0');
	if(usl.isFull()) failCount++;
	if(usl.contains('test0')) failCount++;

	// ... at middle of (remaining) list
	usl.delete('test2');
	if(usl.contains('test2')) failCount++;
	if(!(usl.lengthIs() === 2)) failCount++;

	return failCount;
}

var usl_noarg = new USL();
var usl_arg = new USL(10);

console.log("Test 1, no arguments: " + runTest(test1, usl_noarg));
console.log("Test 1, size argument: " + runTest(test1, usl_arg));

console.log("Test 2, size argument: " + runTest(test2));

process.exit(0);
