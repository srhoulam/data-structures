'use strict';

var SSL = require('./SortedStringList');

function runTest(test, ssl) {
	return test(ssl);
}

function test1(ssl) {
	var failCount = 0;

	// test `insert`, `lengthIs`
	ssl.insert('test1');
	ssl.insert('test2');
	ssl.insert('test3');
	if(ssl.lengthIs() !== 3) failCount++;
	ssl.delete('test1');
	if(ssl.lengthIs() !== 2) failCount++;

	// test `reset`, `getNext`
	ssl.reset();
	if(ssl.contains('test1')) failCount++;
	if(!ssl.contains('test3')) failCount++;
	if(!ssl.contains('test2')) failCount++;

	return failCount;
}

function test2() {
	var size = 5;
	var ssl = new SSL(size);
	var failCount = 0;

	// test `lengthIs` with an empty list
	if(ssl.lengthIs() !== 0) failCount++;

	// test `insert` out of order, `contains`, `isFull`
	ssl.insert('test2'); // at beginning and end of list
	if(!ssl.contains('test2')) failCount++;
	if(!ssl.lengthIs() === 1) failCount++;
	if(ssl.isFull()) failCount++;

	ssl.insert('test1'); // at beginning
	if(!ssl.contains('test1')) failCount++;
	if(!ssl.lengthIs() === 2) failCount++;
	if(ssl.isFull()) failCount++;

	ssl.insert('test3'); // at end of list
	if(!ssl.contains('test3')) failCount++;
	if(!ssl.lengthIs() === 3) failCount++;
	if(ssl.isFull()) failCount++;

	ssl.insert('test0'); // at beginning
	if(!ssl.contains('test0')) failCount++;
	if(!ssl.lengthIs() === 4) failCount++;
	if(ssl.isFull()) failCount++;

	ssl.insert('test4'); // at end of list
	if(!ssl.contains('test4')) failCount++;
	if(!ssl.lengthIs() === 5) failCount++;
	if(!ssl.isFull()) failCount++;

	if(ssl.lengthIs() !== size) failCount++;
	if(ssl.contains('test5')) failCount++;

	// test `delete` at end of list
	ssl.delete('test4');
	if(ssl.contains('test4')) failCount++;
	if(!(ssl.lengthIs() === 4)) failCount++;

	// test `insert` at middle of list
	ssl.insert('test2.5');
	if(!ssl.contains('test2.5')) failCount++;
	if(!ssl.isFull()) failCount++;

	// ... at beginning of list
	ssl.delete('test0');
	if(ssl.isFull()) failCount++;
	if(ssl.contains('test0')) failCount++;

	// ... at middle of (remaining) list
	ssl.delete('test2');
	if(ssl.contains('test2')) failCount++;
	if(!(ssl.lengthIs() === 3)) failCount++;

	return failCount;
}

var ssl_noarg = new SSL();
var ssl_arg = new SSL(10);

console.log("Test 1, no arguments: " + runTest(test1, ssl_noarg));
console.log("Test 1, size argument: " + runTest(test1, ssl_arg));

console.log("Test 2, size argument: " + runTest(test2));

process.exit(0);
