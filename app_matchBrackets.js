'use strict';

var Stack = require('./Stack'),
	OverflowError = require('./StackErrors').Overflow;

var matchMap = {
	'{' : '}',
	'(' : ')',
	'[' : ']',
	'<' : '>'
}, closingBraces = '})]>';

var expressions = 0,
	goodExpressions = 0,
	badExpressions = 0;

// BEGIN read from console
console.log("Enter your text and press Ctrl+D when finished:\n");
process.stdin.setEncoding('utf8');
process.stdin.on('data', processInput);
process.stdin.on('end', printSummary);
// END

function processInput(line) {
	expressions++;
	var stack = new Stack();
	var balancedString = true;

	try {
		for(var index = 0; index < line.length; index++) {
			var currentChar = line[index];

			// "process character"
			if(currentChar in matchMap) {
				stack.push(currentChar);
			} else if(closingBraces.indexOf(currentChar) !== -1) {
				if(stack.isEmpty()) {
					balancedString = false;
				} else {
					(function() { // block scope
						var openSymbol = stack.pop();
						if(currentChar !== matchMap[openSymbol]) {
							balancedString = false;
						}
					})();
				}
			}
		}

		if(!balancedString) {
			badExpressions++;
			console.log("Bad expression: malformed.");
		} else if(!stack.isEmpty()){
			badExpressions++;
			console.log("Bad expression: open symbols remain.");
		} else {
			goodExpressions++;
			console.log("Good expression.");
		}
	} catch(e) {
		if(e instanceof OverflowError) {
			console.error("StackOverflowError: expression too long.", e.stack);
		} else {
			console.error(e);
		}
	}
}

function printSummary() {
	console.log("Number of expressions:", expressions);
	console.log("Number of good expressions:", goodExpressions);
	console.log("Number of bad expressions:", badExpressions);
}

