var chai = require('chai');
var expect = chai.expect;
var html = require('../../../utils/escape/html');

describe('html', function () {
    it('should be a function', function () {
        expect(html).to.be.a('function');
    });

    it('should not change correct string', function () {
        var string = 'div a="b"';
        expect(html(string)).to.equal(string);
    });

    it('should escape `&` sign', function () {
        expect(html('&')).to.equal('&amp;');
    });

    it('should escape `<` sign', function () {
        expect(html('<')).to.equal('&lt;');
    });

    it('should escape `>` sign', function () {
        expect(html('>')).to.equal('&gt;');
    });

    it('should escape html string', function () {
        expect(html('<div class="name">&gt;</div>')).to.equal('&lt;div class="name"&gt;&amp;gt;&lt;/div&gt;');
    });
});
