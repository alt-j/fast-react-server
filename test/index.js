var chai = require('chai');
var expect = chai.expect;
var React = require('../index');

describe('React', function () {
    describe('createClass', function () {
        it('should be a function', function () {
            expect(React.createClass).to.be.a('function');
        });
    });

    describe('createElement', function () {
        it('should be a function', function () {
            expect(React.createElement).to.be.a('function');
        });
    });
});
