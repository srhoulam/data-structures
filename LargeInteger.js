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

//  Private static methods
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
function subtractLists(greater, lesser) {
    var result = new DigitList();
    var carry = 0;
    var lesserLength = lesser.lengthIs();
    var greaterLength = greater.lengthIs();

    greater.resetBackward();
    lesser.resetBackward();

    for(var count = 0; count < lesserLength; count++) {
        let digit1 = greater.getPrev();
        let digit2 = lesser.getPrev();

        let temp = 0;

        if(digit1 >= digit2) {
            //  regular, old-fashioned subtraction
            temp = digit1 - digit2 + carry;
            carry = 0;
        } else {
            //  subtraction using a "borrow" (negative carry)
            temp = 10 + digit1 - digit2 + carry;
            carry = -1;
        }

        result.insertFront(temp);
    }
    for(count = lesserLength; count < greaterLength; count++) {
        let digit = greater.getPrev();

        if(carry !== 0) {
            //  eventually, this condition will be met under the assumption
            //      that DigitLists do not have leading digits of zero
            if(digit !== 0) {
                digit -= 1;
                carry = 0;
            } else {
                digit = 9;
                carry = -1;
            }
        }

        result.insertFront(digit);
    }

    return result;
}
function greaterList(list1, list2) {
    //  PRECONDITION: no leading zeros in passed-in DigitList
    //  PURPOSE: test whether |list1| > |list2|,
    //      where |*| is the absolute value operator

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
}result['set' + (lint1.sign === PLUS ? 'Positive' : 'Negative')]();

// Public Static methods
LargeInt.add = function lgIntAdd(lint1, lint2) {
    var result = new LargeInt();

    if(lint1.sign === lint2.sign) {
        //  signs are the same
        //  set common sign on `result`
        result['set' + (lint1.sign === PLUS ? 'Positive' : 'Negative')]();

        //  set `result`'s digits to the sum of the two integers' digits
        result.digits = addLists(lint1.digits, lint2.digits);
    } else {
        //  signs differ

        if(greaterList(lint1.digits, lint2.digits)) {
            //  |lint1| > |lint2|
            //  set sign
            result['set' + (lint1.sign === PLUS ? 'Positive' : 'Negative')]();
        } else {
            //  |lint1| <= |lint2|
            //  set sign
            result['set' + (lint2.sign === PLUS ? 'Positive' : 'Negative')]();
        }

    }
};

module.exports = LargeInt;
