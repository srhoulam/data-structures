'use strict';

var cproc = require('child_process');

describe("bracket expression evaluator", function() {
	beforeEach(function() {
		var self = this;
		this.expectation = '';
		this.mb = cproc.spawn('node', ['../app_matchBrackets.js']);
		this.mb.stdout.setEncoding('utf8');
		this.mb.stdout.on('data', function(data) {
			expect(data).toBe(self.expectation);
		});
	});

	afterEach(function() {
		this.mb.stdin.end();
	});

	it("should recognize matched curly brackets",
		function() {
			this.expectation = "Good expression.\n";
			this.mb.stdin.write("{}");
		});

	it("should recognize matched square brackets",
		function() {
			this.expectation = "Good expression.\n";
			this.mb.stdin.write("[]");
		});

	it("should recognize matched angle brackets",
		function() {
			this.expectation = "Good expression.\n";
			this.mb.stdin.write("<>");
		});

	it("should recognize matched parentheses",
		function() {
			this.expectation = "Good expression.\n";
			this.mb.stdin.write("()");
		});

	it("should recognize composited matched brackets",
		function() {
			this.expectation = "Good expression.\n";
			this.mb.stdin.write("{[<()>]}");
		});

	it("should recognize sequences of matched brackets",
		function() {
			this.expectation = "Good expression.\n";
			this.mb.stdin.write("{}[]()<>");
		});

	it("should recognize overlapping brackets",
		function() {
			this.expectation = "Bad expression: malformed.\n";
			this.mb.stdin.write("{[}(]<)>");
		});

	it("should recognize unclosed brackets",
		function() {
			this.expectation = "Bad expression: open symbols remain.\n";
			this.mb.stdin.write("{");
		});

	it("should recognize matched curly brackets",
		function() {
			this.expectation = "Bad expression: malformed.\n";
			this.mb.stdin.write(">");
		});
});

