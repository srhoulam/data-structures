'use strict';

var cproc = require('child_process');

describe("postfix expression evaluator", function() {
	beforeEach(function() {
		this.pf = cproc.spawn('node', ['./app_postfixNotation.js']);
		this.pf.stdout.setEncoding('utf8');
	});

	afterEach(function() {
		this.pf.stdin.end();
	});

	describe("should evaluate additive expressions in postfix notation",
		function() {
			var result;

			beforeEach(function(done) {
				this.pf.stdout.on('data', function(res) {
					result = res;
					done();
				});

				this.pf.stdin.write("4 5 6 7 8 9+++++");
			});

			it('', function() {
				expect(result).toEqual("Result: 39\n");
			});
		}
	);

	describe("should evaluate subtractive expressions in postfix notation",
		function() {
			var result;

			beforeEach(function(done) {
				this.pf.stdout.on('data', function(res) {
					result = res;
					done();
				});

				this.pf.stdin.write("9 1 2 3 3----");
			});

			it('', function() {
				expect(result).toEqual("Result: 10\n");
			});
		}
	);

	describe("should evaluate multiplicative expressions in postfix notation",
		function() {
			var result;

			beforeEach(function(done) {
				this.pf.stdout.on('data', function(res) {
					result = res;
					done();
				});

				this.pf.stdin.write("3 4 3 4***");
			});

			it('', function() {
				expect(result).toEqual("Result: 144\n");
			});

		}
	);

	describe("should evaluate divisive expressions in postfix notation",
		function() {
			var result;

			beforeEach(function(done) {
				this.pf.stdout.on('data', function(res) {
					result = res;
					done();
				});

				this.pf.stdin.write("48 2 / 3 / 4 /");
			});

			it('', function() {
				expect(result).toEqual("Result: 2\n");
			});
		}
	);

	describe("should evaluate composite expressions in postfix notation",
		function() {
			var result;

			beforeEach(function(done) {
				this.pf.stdout.on('data', function(res) {
					result = res;
					done();
				});

				this.pf.stdin.write("1 1+ 0- 10* 4/");
			});

			it('', function() {
				expect(result).toEqual("Result: 5\n");
			});
		}
	);

	describe("should recognize an expression with too few operands",
		function() {
			var result;

			beforeEach(function(done) {
				this.pf.stdout.on('data', function(res) {
					result = res;
					done();
				});

				this.pf.stdin.write("9 * /");
			});

			it('', function() {
				expect(result).toEqual("Not enough operands.\n");
			});
		}
	);

	describe("should recognize an expression with too many operands",
		function() {
			var result;

			beforeEach(function(done) {
				this.pf.stdout.on('data', function(res) {
					result = res;
					done();
				});

				this.pf.stdin.write("7 1 1 1 + *");
			});

			it('', function() {
				expect(result).toEqual("Too many operands.\n");
			});
		}
	);

	describe("should recognize an expression with invalid symbols",
		function() {
			var result;

			beforeEach(function(done) {
				this.pf.stdout.on('data', function(res) {
					result = res;
					done();
				});

				this.pf.stdin.write("2 5 11&");
			});

			it('', function() {
				expect(result).toEqual("Illegal symbol.\n");
			});
		}
	);

	describe("should recognize an expression with far too many operands",
		function() {
			var result;

			beforeEach(function(done) {
				this.pf.stdout.on('data', function(res) {
					result = res;
					done();
				});

				var string = "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 " +
					"1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 " +
					"1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 " +
					"1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 " +
					"1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 " +
					"1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 " +
					"1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 +";

				this.pf.stdin.write(string);
			});

			it('', function() {
				expect(result).toEqual("Too many operands (by far).\n");
			});
		}
	);

	describe("should recognize an empty expression",
		function() {
			var result;

			beforeEach(function(done) {
				this.pf.stdout.on('data', function(res) {
					result = res;
					done();
				});

				this.pf.stdin.write("\n");
			});

			it('', function() {
				expect(result).toEqual("Result: false\n");
			});
		}
	);

	// Nell Dale, chapter 4, exercise 27, part d
	describe("should deny division by zero",
		function() {
			var result;

			beforeEach(function(done) {
				this.pf.stdout.on('data', function(res) {
					result = res;
					done();
				});

				this.pf.stdin.write("2 5 3 - 2 - /");
			});

			it('', function() {
				expect(result).toEqual("/: divide by zero not allowed.\n");
			});
		}
	);

	// Nell Dale, chapter 4, exercise 27, part e
	describe("should evaluate maximum expressions",
		function() {
			var result;

			beforeEach(function(done) {
				this.pf.stdout.on('data', function(res) {
					result = res;
					done();
				});

				this.pf.stdin.write("0 999 ^");
			});

			it('', function() {
				expect(result).toEqual("Result: 999\n");
			});
		}
	);
});

