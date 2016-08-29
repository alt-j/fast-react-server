var chai = require('chai');
var expect = chai.expect;
var dasherize = require('../../utils/dasherize');

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference
 */
var COMMON_CSS_PROPERTIES = {
    background: 'background',
    backgroundAttachment: 'background-attachment',
    backgroundColor: 'background-color',
    backgroundImage: 'background-image',
    backgroundPosition: 'background-position',
    backgroundRepeat: 'background-repeat',
    border: 'border',
    borderBottom: 'border-bottom',
    borderBottomColor: 'border-bottom-color',
    borderBottomStyle: 'border-bottom-style',
    borderBottomWidth: 'border-bottom-width',
    borderColor: 'border-color',
    borderLeft: 'border-left',
    borderLeftColor: 'border-left-color',
    borderLeftStyle: 'border-left-style',
    borderLeftWidth: 'border-left-width',
    borderRight: 'border-right',
    borderRightColor: 'border-right-color',
    borderRightStyle: 'border-right-style',
    borderRightWidth: 'border-right-width',
    borderStyle: 'border-style',
    borderTop: 'border-top',
    borderTopColor: 'border-top-color',
    borderTopStyle: 'border-top-style',
    borderTopWidth: 'border-top-width',
    borderWidth: 'border-width',
    clear: 'clear',
    clip: 'clip',
    color: 'color',
    cursor: 'cursor',
    display: 'display',
    filter: 'filter',
    font: 'font',
    fontFamily: 'font-family',
    fontSize: 'font-size',
    fontVariant: 'font-variant',
    fontWeight: 'font-weight',
    height: 'height',
    left: 'left',
    letterSpacing: 'letter-spacing',
    lineHeight: 'line-height',
    listStyle: 'list-style',
    listStyleImage: 'list-style-image',
    listStylePosition: 'list-style-position',
    listStyleType: 'list-style-type',
    margin: 'margin',
    marginBottom: 'margin-bottom',
    marginLeft: 'margin-left',
    marginRight: 'margin-right',
    marginTop: 'margin-top',
    overflow: 'overflow',
    padding: 'padding',
    paddingBottom: 'padding-bottom',
    paddingLeft: 'padding-left',
    paddingRight: 'padding-right',
    paddingTop: 'padding-top',
    pageBreakAfter: 'page-break-after',
    pageBreakBefore: 'page-break-before',
    position: 'position',
    textAlign: 'text-align',
    textDecoration: 'text-decoration',
    textIndent: 'text-indent',
    textTransform: 'text-transform',
    top: 'top',
    verticalAlign: 'vertical-align',
    visibility: 'visibility',
    width: 'width',
    zIndex: 'z-index'
};

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

    it('should return common css properties', function () {
        Object.keys(COMMON_CSS_PROPERTIES).forEach(function (key) {
            expect(dasherize(key)).to.equal(COMMON_CSS_PROPERTIES[key]);
        });
    });
});
