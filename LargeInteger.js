'use strict';

const PLUS = true;
const MINUS = false;

var DigitList = require('./SpecialList');

function LargeInt() {
    this.sign = PLUS;
    this.digits = new DigitList();
}
// Instance methods
LargeInt.prototype.setNegative = function lgIntSetNeg() {
    this.sign = MINUS;
};
LargeInt.prototype.setPositive = function lgIntSetPos() {
    this.sign = PLUS;
};
LargeInt.prototype.addDigit = function lgIntAddDigit(digit) {
    this.digits.insertRear(digit);
};
LargeInt.prototype.toString = function lgIntToString() {
    var string = this.sign === PLUS ? '+' : '-'; // compare to `PLUS` for clarity

    this.digits.resetForward();

    var currItem = this.digits.getNext();
    while(currItem !== null) {
        string += currItem;
        currItem = this.digits.getNext();
    }

    return string;
};
// Static (class) methods
LargeInt.addLists = function lgIntAdd() {};
LargeInt.subtractLists = function lgIntSub() {};
LargeInt.greaterList = function lgIntGreater(lint1, lint2) {
    if(lint1.sign ^ lint2.sign) { // if signs don't match
        return lint1.sign === PLUS ? lint1 : lint2;
    } else {
        // actually compare the digits
        // first, compare the length
        // before that, branch on the (common) sign
        if(lint1.sign === PLUS) {
            // both are positive
        } else {
            // both are negative
        }
    }
};

module.exports = LargeInt;
