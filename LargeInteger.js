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

//  Private methods
function addLists(greater, lesser) {
    var result = new DigitList();
    var carry = 0;
    var lesserLength = lesser.lengthIs();
    var greaterLength = greater.lengthIs();

    greater.resetBackward();
    lesser.resetBackward();

    for(var count = 0; count < lesserLength; count++) {
        let digit1 = greater.getPrev();
        let digit2 = lesser.getPrev();

        let temp = digit1 + digit2 + carry;
        carry = Math.floor(temp / 10);

        result.insertFront(temp % 10);
    }
    for(count = lesserLength; count < greaterLength; count++) {
        let digit = greater.getPrev();

        let temp = digit + carry;
        carry = Math.floor(temp / 10);

        result.insertFront(temp % 10);
    }
    if(count !== 0) {
        result.insertFront(count);
    }

    return result;
}
function subtractLists(greater, lesser) {}
function greaterList(list1, list2) {
    //  PRECONDITION: no leading zeros in passed-in DigitList
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

        for(var count = 0; count < length; count++) {
            if(currentDigit1 === currentDigit2) {
                // check next digit
                currentDigit1 = list1.getNext();
                currentDigit2 = list2.getNext();
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
