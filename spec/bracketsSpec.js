'use strict';

var cproc = require('child_process'),
    path = require('path');

describe("bracket expression evaluator", function() {
    beforeEach(function() {
        this.mb = cproc.spawn('node', [path.join(__dirname, '..', 'app_matchBrackets.js')]);
        this.mb.stdout.setEncoding('utf8');
    });

    afterEach(function() {
        this.mb.stdin.end();
    });

    describe("should recognize matched curly brackets", function() {
        var result;

        beforeEach(function(done) {
            this.mb.stdout.on('data', function(res) {
                result = res;
                done();
            });

            this.mb.stdin.write('{}');
        });

        it('', function() {
            expect(result).toBe("Good expression.\n");
        });
    });

    describe("should recognize matched square brackets", function() {
        var result;

        beforeEach(function(done) {
            this.mb.stdout.on('data', function(res) {
                result = res;
                done();
            });

            this.mb.stdin.write('[]');
        });

        it('', function() {
            expect(result).toBe("Good expression.\n");
        });
    });

    describe("should recognize matched angle brackets", function() {
        var result;

        beforeEach(function(done) {
            this.mb.stdout.on('data', function(res) {
                result = res;
                done();
            });

            this.mb.stdin.write('<>');
        });

        it('', function() {
            expect(result).toBe("Good expression.\n");
        });
    });

    describe("should recognize matched parentheses", function() {
        var result;

        beforeEach(function(done) {
            this.mb.stdout.on('data', function(res) {
                result = res;
                done();
            });

            this.mb.stdin.write('()');
        });

        it('', function() {
            expect(result).toBe("Good expression.\n");
        });
    });

    describe("should recognize composited matched brackets", function() {
        var result;

        beforeEach(function(done) {
            this.mb.stdout.on('data', function(res) {
                result = res;
                done();
            });

            this.mb.stdin.write('{[<()>]}');
        });

        it('', function() {
            expect(result).toBe("Good expression.\n");
        });
    });

    describe("should recognize sequences of matched brackets", function() {
        var result;

        beforeEach(function(done) {
            this.mb.stdout.on('data', function(res) {
                result = res;
                done();
            });

            this.mb.stdin.write('{}[]()<>');
        });

        it('', function() {
            expect(result).toBe("Good expression.\n");
        });
    });

    describe("should recognize overlapping brackets", function() {
        var result;

        beforeEach(function(done) {
            this.mb.stdout.on('data', function(res) {
                result = res;
                done();
            });

            this.mb.stdin.write('{[}(]<)>');
        });

        it('', function() {
            expect(result).toBe("Bad expression: malformed.\n");
        });
    });

    describe("should recognize unclosed brackets", function() {
        var result;

        beforeEach(function(done) {
            this.mb.stdout.on('data', function(res) {
                result = res;
                done();
            });

            this.mb.stdin.write('{');
        });

        it('', function() {
            expect(result).toBe("Bad expression: open symbols remain.\n");
        });
    });

    describe("should recognize matched curly brackets", function() {
        var result;

        beforeEach(function(done) {
            this.mb.stdout.on('data', function(res) {
                result = res;
                done();
            });

            this.mb.stdin.write('>');
        });

        it('', function() {
            expect(result).toBe("Bad expression: malformed.\n");
        });
    });
});

