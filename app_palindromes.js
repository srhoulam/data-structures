'use strict';

var Queue = require('./Queue');
var Stack = require('./Stack');

var results = {
    good : 0,
    bad : 0
};

var alphabet = "abcdefghijklmnopqrstuvwxyz";

process.stdin.setEncoding('utf8');
process.stdin.on('data', processLine);
process.stdin.on('end', printSummary);

function processLine(data) {
    if(data.length > 180) {
        console.log("String too long.");
        return;
    }

    var stack = new Stack(180),
        queue = new Queue(180);

    for(var index=0; index < data.length; index++) {
        // block scope
        (function() {
            var lowercaseLetter = data[index].toLowerCase();

            if(alphabet.indexOf(lowercaseLetter) > -1) {
                stack.push(lowercaseLetter);
                queue.enq(lowercaseLetter);
            }
        })();
    }

    while(!queue.isEmpty() && !stack.isEmpty()) {
        if(stack.pop() !== queue.deq()) {
            results.bad++;
            console.log("Not a palindrome.");
            return;
        }
    }

    results.good++;
    console.log("Good palindrome.");
}

function printSummary() {
    console.log("Palindromes:", results.good);
    console.log("Not palindromes:", results.bad);
    console.log("Total lines:", results.good + results.bad);
}
