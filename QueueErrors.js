'use strict';

function QueueUnderflowError(message) {
	Error.call(this, message); // super
	this.message = message;
}

QueueUnderflowError.prototype = new Error();
QueueUnderflowError.prototype.name = 'QueueUnderflowError';

function QueueOverflowError(message) {
	Error.call(this, message); //super
	this.message = message;
}

QueueOverflowError.prototype = new Error();
QueueOverflowError.prototype.name = 'QueueOverflowError';

module.exports = {
	Underflow : QueueUnderflowError,
	Overflow : QueueOverflowError
};
