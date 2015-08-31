'use strict';

var UL = require('./UnsortedList');

function runTest(test, ul) {
	return test(ul);
}

function test1(ul) {
	var failCount = 0;

	// test `insert`, `lengthIs`
	ul.insert({});
	ul.insert({ a : 1 });
	ul.insert({ a : 'a', b : 'b' });
	if(ul.lengthIs() !== 3) failCount++;
	ul.delete({});
	if(ul.lengthIs() !== 2) failCount++;

	// test `reset`, `getNext`
	ul.reset();
	if(JSON.stringify(ul.getNext()) !== JSON.stringify({ a : 'a', b : 'b' })) failCount++;
	if(JSON.stringify(ul.getNext()) !== JSON.stringify({ a : 1 })) failCount++;

	return failCount;
}

function test2() {
	var size = 5;
	var ul = new UL(size, function(a, b) {
		return JSON.stringify(a) === JSON.stringify(b) ? 0 :
			(JSON.stringify(a) < JSON.stringify(b) ? -1 : 1);
	});
	var failCount = 0;

	// test `lengthIs` with an empty list
	if(ul.lengthIs() !== 0) failCount++;

	// test `contains`, `isFull`
	var i = 0;
	do {
		ul.insert({ 'i' : i });
		if(!ul.contains({ 'i' : i })) failCount++;

		i++;
	} while(i < size - 1);

	if(ul.isFull()) failCount++;

	ul.insert({ test : '4' });
	if(!ul.isFull()) failCount++;
	if(ul.lengthIs() !== size) failCount++;

	// test `delete` at end of list
	ul.delete({ 'i' : 4 });
	if(ul.contains({ 'i' : 4 })) failCount++;
	if(!(ul.lengthIs() === 4)) failCount++;

	// ... at beginning of list
	ul.delete({ 'i' : 0 });
	if(ul.isFull()) failCount++;
	if(ul.contains({ 'i' : 0 })) failCount++;

	// ... at middle of (remaining) list
	ul.delete({ 'i' : 2 });
	if(ul.contains({ 'i' : 2 })) failCount++;
	if(!(ul.lengthIs() === 2)) failCount++;

	return failCount;
}

function objectCompare(a, b) {
	return JSON.stringify(a) === JSON.stringify(b) ? 0 :
		(JSON.stringify(a) < JSON.stringify(b) ? -1 : 1);
}

var ul_noarg = new UL(null, objectCompare);
var ul_arg = new UL(10, objectCompare);

console.log("Test 1, no arguments: " + runTest(test1, ul_noarg));
console.log("Test 1, size argument: " + runTest(test1, ul_arg));

console.log("Test 2, size argument: " + runTest(test2));

process.exit(0);
