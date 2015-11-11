'use strict';

function StackUnderflowError(message) {
    Error.call(this, message); // super
    this.message = message;
}

StackUnderflowError.prototype = new Error();
StackUnderflowError.prototype.name = 'StackUnderflowError';

function StackOverflowError(message) {
    Error.call(this, message); //super
    this.message = message;
}

StackOverflowError.prototype = new Error();
StackOverflowError.prototype.name = 'StackOverflowError';

module.exports = {
    Underflow : StackUnderflowError,
    Overflow : StackOverflowError
};
