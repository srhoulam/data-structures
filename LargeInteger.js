'use strict';

const PLUS = true;
const MINUS = false;

var DigitList = require('./SpecialList');

function LargeInt() {
    this.sign = PLUS;
    this.digits = new DigitList();
}
//  Instance methods
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
//  Static (class) methods
LargeInt.addLists = function lgIntAdd() {};
LargeInt.subtractLists = function lgIntSub() {};

//  Private methods
function greaterList(list1, list2) {
    //  PRECONDITION: no leading zeros in passed-in LargeInts
    //  NOTE: ignores sign!
    //  actually compare the digits
    //  check number of digits
    if(list1.lengthIs() === list2.lengthIs()) {
        //  actually compare the digits
        list1.resetForward();
        list2.resetForward();
        let length = list1.lengthIs();
        let currentDigit1 = list1.getNext();
        let currentDigit2 = list2.getNext();

        //  need only check the current digit of one list
        //      to know we've reached the end
        while(currentDigit1 !== null) {
            if(currentDigit1 === currentDigit2) {
                // check next digit
                currentDigit1 = list1.getNext();
                currentDigit2 = list2.getNext();
                continue;
            } else if(currentDigit1 > currentDigit2) {
                return true;
            } else {
                return false;
            }
        }

        //  numbers are equal
        return false;
    } else {
        //  assume leading digits are nonzero
        return list1.lengthIs() > list2.lengthIs() ?
            true :
            false;
    }
}

module.exports = LargeInt;
