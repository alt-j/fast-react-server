var chai = require('chai');
var expect = chai.expect;
var React = require('../index');

describe('React', function () {
    describe('cleanHtml', function () {
        it('should be a function', function () {
            expect(React.cleanHtml).to.be.a('function');
        });

        it('should clean rendered string', function () {
            expect(React.cleanHtml('<!----><a>link</a>')).to.equal('<a>link</a>');
        });
    });

    describe('createClass', function () {
        it('should be a function', function () {
            expect(React.createClass).to.be.a('function');
        });

        it('should return a function', function () {
            expect(React.createClass({})).to.be.a('function');
        });
    });

    describe('createElement', function () {
        it('should be a function', function () {
            expect(React.createElement).to.be.a('function');
        });

        it('should render div as string', function () {
            expect(React.createElement('div')).to.equal('<!----><div></div>');
        });

        it('should render null object', function () {
            expect(React.createElement(null)).to.equal('');
        });
    });
});
