'use strict';

var Stack = require('./Stack');

var StackErrors = require('./StackErrors'),
    UnderflowError = StackErrors.Underflow,
    OverflowError = StackErrors.Overflow;

var summary = {
    good : 0,
    bad : 0
};

var operators = {
    '+' : function(a, b) {
        return a + b;
    },
    '-' : function(a, b) {
        return a - b;
    },
    '*' : function(a, b) {
        return a * b;
    },
    '/' : function(a, b) {
        // Nell Dale, chapter 4, exercise 27, part d
        if(b === 0) {
            throw RangeError("/: divide by zero not allowed.");
        }

        return a / b;
    },
    '^' : function(a, b) {
        // Nell Dale, chapter 4, exercise 27, part e
        if(b > a) {
            return b;
        } else {
            return a;
        }
    } // extend as needed
};

process.stdin.setEncoding('utf8');
process.stdin.on('data', processLine);
process.stdin.on('end', printSummary);

function processLine(data) {
    var s = new Stack();

    var operandBuffer = '';

    for(var index=0; index < data.length; index++) {
        var currCharAsNumber = parseInt(data[index], 10);

        try {
            if(Number.isFinite(currCharAsNumber)) {
                operandBuffer += data[index];
                //s.push(currCharAsNumber);
            } else if(data[index] in operators) {
                if(operandBuffer !== '') {
                    s.push(parseInt(operandBuffer, 10));
                    operandBuffer = '';
                }

                var operator = operators[data[index]];

                try {
                    var operand2 = s.pop(),
                        operand1 = s.pop();

                    s.push(operator(operand1, operand2));
                } catch(e) {
                    // Nell Dale, chapter 4, exercise 27, part d
                    if(e instanceof RangeError) {
                        console.log(e.message);
                    } else if(e instanceof UnderflowError) {
                        console.log(e instanceof UnderflowError ?
                            "Not enough operands." :
                            "Some other error.");
                    }

                    summary.bad++;
                    return;
                }
            } else if(data[index] === ' ') {
                if(operandBuffer !== '') {
                    s.push(parseInt(operandBuffer, 10));
                    operandBuffer = '';
                }
            } else if(data[index] === '\n') {
            } else {
                console.log("Illegal symbol.");
                return;
            }
        } catch(e) {
            summary.bad++;
            console.log(e instanceof OverflowError ?
                "Too many operands (by far)." :
                "Some other error.");
            return;
        }
    }

    var result = !s.isEmpty() && s.pop();

    if(s.isEmpty()) {
        summary.good++;
        console.log("Result:", result);
        
    } else {
        summary.bad++;
        console.log("Too many operands.");
    }

    return result;
}

function printSummary() {
    console.log("Good expressions:", summary.good);
    console.log("Bad expressions:", summary.bad);
    console.log("Total expressions:", summary.good + summary.bad);
}

