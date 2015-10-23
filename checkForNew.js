'use strict';

function checkForNew(className, errorMessage) {
	var globalObject;

	try {
		globalObject = global;
	} catch(e) {
		globalObject = window;
	}

	if(this === globalObject || this === undefined) {
		var message = [
			className || "Object",
			errorMessage || "constructor called without the `new` keyword."
		].join(': ');
		throw new SyntaxError(message);
	}
}

module.exports = checkForNew;
