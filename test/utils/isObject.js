var chai = require('chai');
var expect = chai.expect;

var isObject = require('../../src/utils/isObject');

describe('isObject', function () {

    it('should be a function', function () {
        expect(isObject).to.be.a('function');
    });

    it('without arguments should return false', function () {
        expect(isObject()).to.equal(false);
    });

    it('should return true on simple object', function () {
        expect(isObject({})).to.equal(true);
    });

    it('should return false on null', function () {
        expect(isObject(null)).to.equal(false);
    });

    it('should return false with array', function () {
        expect(isObject([])).to.equal(false);
    });

    it('should return false with primitives', function () {
        expect(isObject(1)).to.equal(false);
        expect(isObject(true)).to.equal(false);
        expect(isObject('string')).to.equal(false);
        expect(isObject('')).to.equal(false);
    });

});
