var chai = require('chai');
var expect = chai.expect;
var extend = require('../../src/utils/extend');

var str = 'me a test';
var integer = 10;
var arr = [1, 'what', new Date(81, 8, 4)];
var date = new Date(81, 4, 13);

var Foo = function () {};

var obj = {
    str: str,
    integer: integer,
    arr: arr,
    date: date,
    constructor: 'fake',
    isPrototypeOf: 'not a function',
    foo: new Foo()
};

describe('extend', function () {
    it('should be a function', function () {
        expect(extend).to.be.a('function');
    });

    it('without arguments should return an object', function () {
        expect(extend()).to.deep.equal({});
    });

    it('should merge object with object', function () {
        var ori = {
            str: 'no shit',
            integer: 76,
            arr: [1, 2, 3, 4],
            date: new Date(81, 7, 26),
            foo: 'bar'
        };
        var target = extend(ori, obj);
        var expectedObj = {
            str: 'me a test',
            integer: 10,
            arr: [1, 'what', new Date(81, 8, 4)],
            date: new Date(81, 4, 13),
            constructor: 'fake',
            isPrototypeOf: 'not a function',
            foo: new Foo()
        };
        var expectedTarget = {
            str: 'me a test',
            integer: 10,
            arr: [1, 'what', new Date(81, 8, 4)],
            date: new Date(81, 4, 13),
            constructor: 'fake',
            isPrototypeOf: 'not a function',
            foo: new Foo()
        };
        expect(obj).to.deep.equal(expectedObj);
        expect(target).to.deep.equal(expectedTarget);
    });

    it('should handle null object normally', function () {
        var target = extend(null, obj);
        expect(target).to.deep.equal(obj);
    });

    it('should merge any count of objects', function () {
        var ori = {
            str: 'no shit',
            integer: 76,
            arr: [1, 2, 3, 4],
            date: new Date(81, 7, 26),
            foo: 'bar'
        };
        var target = extend(ori, obj, {str: 'normal', integer: 0}, {integer: 42});
        var expectedTarget = {
            str: 'normal',
            integer: 42,
            arr: [1, 'what', new Date(81, 8, 4)],
            date: new Date(81, 4, 13),
            constructor: 'fake',
            isPrototypeOf: 'not a function',
            foo: new Foo()
        };
        expect(target).to.deep.equal(expectedTarget);
    });
});
