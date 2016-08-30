var chai = require('chai');
var expect = chai.expect;
var attr = require('../../../src/utils/escape/attr');

describe('attr', function () {
    it('should be a function', function () {
        expect(attr).to.be.a('function');
    });

    it('should not change correct string', function () {
        var string = 'forbidden';
        expect(attr(string)).to.equal(string);
    });

    it('should escape `&` sign', function () {
        expect(attr('&')).to.equal('&amp;');
    });

    it('should escape `"` sign', function () {
        expect(attr('"')).to.equal('&quot;');
    });
});
