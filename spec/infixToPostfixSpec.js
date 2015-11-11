'use strict';

var cproc = require('child_process'),
    path = require('path');

describe("infix to postfix converter", function() {
    beforeEach(function() {
        this.pf = cproc.spawn('node', [path.join(__dirname, '..', 'app_postfixNotation.js')]);
        this.pf.stdout.setEncoding('utf8');

        this.ifToPf = cproc.spawn('node', [path.join(__dirname, '..', 'project_infixToPostfix.js')]);
        this.ifToPf.stdout.pipe(this.pf.stdin);
    });

    afterEach(function() {
        this.ifToPf.stdin.end();
    });

    describe("should convert simple infix expressions to valid postfix",
        function() {
            var result;

            beforeEach(function(done) {
                this.pf.stdout.on('data', function(res) {
                    result = res;
                    done();
                });

                this.ifToPf.stdin.write("100 + 25");
            });

            it('', function() {
                expect(result).toEqual("Result: 125\n");
            });
        }
    );


    describe("should convert composite infix expressions to valid postfix",
        function() {
            var result;

            beforeEach(function(done) {
                this.pf.stdout.on('data', function(res) {
                    result = res;
                    done();
                });

                this.ifToPf.stdin.write("((2 + 6) * 3/4) + 100");
            });

            it('', function() {
                expect(result).toEqual("Result: 106\n");
            });
        }
    );

    describe("should convert convoluted expressions to valid postfix",
        function() {
            var result;

            beforeEach(function(done) {
                this.pf.stdout.on('data', function(res) {
                    result = res;
                    done();
                });

                this.ifToPf.stdin.write(
                    "0 + ((2 + 6) * 3/4) + (100 - 20) / 5 - 1"
                );
            });

            it('', function() {
                expect(result).toEqual("Result: 21\n");
            });
        }
    );
});

