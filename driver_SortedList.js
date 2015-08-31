'use strict';

var SL = require('./SortedList');

function runTest(test, sl) {
	return test(sl);
}

function test1(sl) {
	var failCount = 0;

	// test `insert`, `lengthIs`
	sl.insert({});
	sl.insert({ a : 1 });
	sl.insert({ a : 'a', b : 'b' });
	if(sl.lengthIs() !== 3) failCount++;
	sl.delete({});
	if(sl.lengthIs() !== 2) failCount++;

	// test `reset`, `getNext`
	var t1 = sl.getNext(),
		t2 = sl.getNext();

	sl.reset();
	if(JSON.stringify(t1) !== JSON.stringify({ a : 'a', b : 'b' })) failCount++;
	if(JSON.stringify(t2) !== JSON.stringify({ a : 1 })) failCount++;

	return failCount;
}

function test2() {
	var size = 5;
	var sl = new SL(size, function(a, b) {
		return JSON.stringify(a) === JSON.stringify(b) ? 0 :
			(JSON.stringify(a) < JSON.stringify(b) ? -1 : 1);
	});
	var failCount = 0;

	// test `lengthIs` with an empty list
	if(sl.lengthIs() !== 0) failCount++;

	// test `insert` out of order, `contains`, `isFull`
	sl.insert({ 'c' : 1 }); // at beginning and end of list
	if(!sl.contains({ 'c' : 1 })) failCount++;
	if(!sl.lengthIs() === 1) failCount++;
	if(sl.isFull()) failCount++;

	sl.insert({ 'b' : 1 }); // at beginning
	if(!sl.contains({ 'b' : 1 })) failCount++;
	if(!sl.lengthIs() === 2) failCount++;
	if(sl.isFull()) failCount++;

	sl.insert({ 'd' : 1 }); // at end of list
	if(!sl.contains({ 'd' : 1 })) failCount++;
	if(!sl.lengthIs() === 3) failCount++;
	if(sl.isFull()) failCount++;

	sl.insert({ 'a' : 1 }); // at beginning
	if(!sl.contains({ 'a' : 1 })) failCount++;
	if(!sl.lengthIs() === 4) failCount++;
	if(sl.isFull()) failCount++;

	sl.insert({ 'e' : 1 }); // at end of list
	if(!sl.contains({ 'e' : 1 })) failCount++;
	if(!sl.lengthIs() === 5) failCount++;
	if(!sl.isFull()) failCount++;

	if(sl.lengthIs() !== size) failCount++;
	if(sl.contains({ 'f' : 1 })) failCount++;

	// test `delete` at end of list
	sl.delete({ 'e' : 1 });
	if(sl.contains({ 'e' : 1 })) failCount++;
	if(!(sl.lengthIs() === 4)) failCount++;

	// test `insert` at middle of list
	sl.insert({ 'b' : 2 });
	if(!sl.contains({ 'b' : 2 })) failCount++;
	if(!sl.isFull()) failCount++;

	// ... at beginning of list
	sl.delete({ 'a' : 1 });
	if(sl.isFull()) failCount++;
	if(sl.contains({ 'a' : 1 })) failCount++;

	// ... at middle of (remaining) list
	sl.delete({ 'c' : 1 });
	if(sl.contains({ 'c' : 1 })) failCount++;
	if(!(sl.lengthIs() === 3)) failCount++;

	return failCount;
}

function objectCompare(a, b) {
	return JSON.stringify(a) === JSON.stringify(b) ? 0 :
		(JSON.stringify(a) < JSON.stringify(b) ? -1 : 1);
}

var sl_noarg = new SL(null, objectCompare);
var sl_arg = new SL(10, objectCompare);

console.log("Test 1, no arguments: " + runTest(test1, sl_noarg));
console.log("Test 1, size argument: " + runTest(test1, sl_arg));

console.log("Test 2, size argument: " + runTest(test2));

process.exit(0);
