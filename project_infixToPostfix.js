'use strict';

// Nell Dale, chapter 4, programming project

var Stack = require('./Stack');

function greaterPriority(operA, operB) {
    if(operA === '(') {
        return true;
    } else if(operB === '(') {
        return false;
    } else {
        var priority = {
            '+' : 2,
            '-' : 2,
            '*' : 4,
            '/' : 4
        };

        return priority[operA] >= priority[operB];
    }
}

var operList = ['+', '-', '*', '/', '('];

process.stdin.setEncoding('utf8');
process.stdin.on('data', processLine);
process.stdin.on('end', function() {
    process.exit(0);
});

function processLine(data) {
    var postfix = '',
        operandBuffer = '',
        stack = new Stack();

    for(var index=0; index < data.length; index++) {
        var currentChar = data[index],
            currCharAsNumber = parseInt(currentChar, 10);

        if(Number.isFinite(currCharAsNumber)) {
            operandBuffer += currentChar;
        } else if(currentChar === ' ') {
            addOperandToResult();
        } else if(operList.indexOf(currentChar) > -1) {
            addOperandToResult();

            while(!stack.isEmpty() &&
                stack.peek() !== '(' &&
                greaterPriority(stack.peek(), currentChar)
            ) {
                postfix += stack.pop() + ' ';
            }

            stack.push(currentChar);
        } else if(currentChar === ')') {
            addOperandToResult();
            while(!stack.isEmpty() && stack.peek() !== '(') {
                postfix += stack.pop() + ' ';
            }
            if(!stack.isEmpty() && stack.peek() === '(') {
                stack.pop();
            }
        }
    }
    if(operandBuffer !== '') {
        postfix += operandBuffer + ' ';
    }
    while(!stack.isEmpty()) {
        postfix += stack.pop();
    }
    console.log(postfix);

    //-----------------------
    // CLOSURED FUNCTIONS
    //-----------------------
    function addOperandToResult() {
        if(operandBuffer !== '') {
            postfix += operandBuffer + ' ';
            operandBuffer = '';
        }
    }
}

