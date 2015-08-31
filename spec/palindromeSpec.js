'use strict';

var cproc = require('child_process'),
	path = require('path');

describe("palindrome validator", function() {
	beforeEach(function() {
		this.pal = cproc.spawn('node', [path.join(__dirname, '..', 'app_palindromes.js')]);
		this.pal.stdout.setEncoding('utf8');
	});

	afterEach(function() {
		this.pal.stdin.end();
	});

	describe("should recognize word palindromes", function() {
		var result;

		beforeEach(function(done) {
			this.pal.stdout.on('data', function(res) {
				result = res;
				done();
			});

			this.pal.stdin.write('racecar');
		});

		it('', function() {
			expect(result).toBe('Good palindrome.\n');
		});
	});

	describe("should recognize sentence palindromes", function() {
		var result;

		beforeEach(function(done) {
			this.pal.stdout.on('data', function(res) {
				result = res;
				done();
			});

			this.pal.stdin.write('A dog, a plan, a canal, pagoda!');
		});

		it('', function() {
			expect(result).toBe('Good palindrome.\n');
		});
	});

	describe("should recognize non-palindromes", function() {
		var result;

		beforeEach(function(done) {
			this.pal.stdout.on('data', function(res) {
				result = res;
				done();
			});

			this.pal.stdin.write('totally bogus, man');
		});

		it('', function() {
			expect(result).toBe('Not a palindrome.\n');
		});
	});
});
