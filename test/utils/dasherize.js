var chai = require('chai');
var expect = chai.expect;
var dasherize = require('../../utils/dasherize');

describe('dasherize', function () {
    it('should be a function', function () {
        expect(dasherize).to.be.a('function');
    });

    it('should change UpperCamelCase to kebab-case', function () {
        expect(dasherize('UpperCamelCase')).to.equal('upper-camel-case');
    });

    it('should change lowerCamelCase to kebab-case', function () {
        expect(dasherize('lowerCamelCase')).to.equal('lower-camel-case');
    });

    it('should not change lowercase string', function () {
        var string = 'lowercase string';
        expect(dasherize(string)).to.equal(string);
    });

    it('should return `background` css properties', function () {
        expect(dasherize('background')).to.equal('background');
    });

    it('should return `z-index` css properties', function () {
        expect(dasherize('zIndex')).to.equal('z-index');
    });

    it('should return `border-bottom-color` css properties', function () {
        expect(dasherize('borderBottomColor')).to.equal('border-bottom-color');
    });
});
