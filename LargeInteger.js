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
LargeInt.greaterList = function lgIntGreater(lint1, lint2) {
    //  PRECONDITION: no leading zeros in passed-in LargeInts
    if(lint1.sign ^ lint2.sign) { 
        //  if signs don't match
        return lint1.sign === PLUS ? true : false;
    } else {
        //  actually compare the digits
        if(lint1.sign === PLUS) {
            //  both are positive
            //  check number of digits
            if(lint1.digits.lengthIs() === lint2.digits.lengthIs()) {
                //  actually compare the digits
                lint1.resetForward();
                lint2.resetForward();
                let currentDigit1 = lint1.getNext();
                let currentDigit2 = lint2.getNext();

                //  need only check the current digit of one list
                //      to know we've reached the end
                while(currentDigit1 !== null) {
                    if(currentDigit1 === currentDigit2) {
                        // check next digit
                        currentDigit1 = lint1.getNext();
                        currentDigit2 = lint2.getNext();
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
                return lint1.digits.lengthIs() > lint2.digits.lengthIs() ?
                    true :
                    false;
            }
        } else {
            //  both are negative
            //  check number of digits
            if(lint1.digits.lengthIs() === lint2.digits.lengthIs()) {
                //  actually compare the digits
                lint1.resetForward();
                lint2.resetForward();
                let currentDigit1 = lint1.getNext();
                let currentDigit2 = lint2.getNext();

                //  need only check the current digit of one list
                //      to know we've reached the end
                while(currentDigit1 !== null) {
                    if(currentDigit1 === currentDigit2) {
                        // check next digit
                        currentDigit1 = lint1.getNext();
                        currentDigit2 = lint2.getNext();
                        continue;
                    } else if(currentDigit1 > currentDigit2) {
                        return false;
                    } else {
                        return true;
                    }
                }

                //  numbers are equal
                return false;
            } else {
                //  assume leading digits are nonzero
                return lint1.digits.lengthIs() > lint2.digits.lengthIs() ?
                    false :
                    true;
            }
        }
    }
};

module.exports = LargeInt;
