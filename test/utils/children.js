var chai = require('chai');
var expect = chai.expect;

var children = require('../../src/utils/children');

var child = {key: 'some value'};
var oneInArray = [{}];
var twoInArray = [{}, {}];

describe('children', function () {
    describe('toArray', function () {
        it('should be a function', function () {
            expect(children.toArray).to.be.a('function');
        });

        it('should return array for children', function () {
            var result = children.toArray(twoInArray);

            expect(Array.isArray(result)).to.equal(true);
            expect(result.length).to.equal(2);
        });

        it('should return array for child', function () {
            var result = children.toArray(child);

            expect(Array.isArray(result)).to.equal(true);
            expect(result.length).to.equal(1);
        });

        it('should return array for null/undefined', function () {
            var result1 = children.toArray(null);
            var result2 = children.toArray(undefined);

            expect(Array.isArray(result1)).to.equal(true);
            expect(Array.isArray(result2)).to.equal(true);

            expect(result1.length).to.equal(0);
            expect(result2.length).to.equal(0);
        });

        it('should add key to each child', function () {
            var result = children.toArray(twoInArray);

            expect(result[0].key).to.be.a('number');
            expect(result[1].key).to.be.a('number');
        });

        it('should not override child key', function () {
            var result = children.toArray(child);

            expect(result[0].key).to.equal(child.key);
        });
    });

    describe('count', function () {
        it('should be a function', function () {
            expect(children.count).to.be.a('function');
        });

        it('should return length for children', function () {
            expect(children.count(oneInArray)).to.equal(oneInArray.length);
            expect(children.count(twoInArray)).to.equal(twoInArray.length);
        });

        it('should return 1 for child', function () {
            expect(children.count(child)).to.equal(1);
        });

        it('should return 0 for null/undefined', function () {
            expect(children.count(null)).to.equal(0);
            expect(children.count(undefined)).to.equal(0);
        });
    });

    describe('only', function () {
        it('should be a function', function () {
            expect(children.only).to.be.a('function');
        });

        it('should return null for children', function () {
            expect(children.only(oneInArray)).to.equal(null);
            expect(children.only(twoInArray)).to.equal(null);
        });

        it('should return itself for any types except array', function () {
            expect(children.only(null)).to.equal(null);
            expect(children.only(undefined)).to.equal(undefined);
            expect(children.only(child)).to.equal(child);
        });
    });

    describe('map', function () {
        var mapper = function (child, index) {
            return index;
        };

        it('should be a function', function () {
            expect(children.map).to.be.a('function');
        });

        it('should return null for null', function () {
            expect(children.map(null)).to.equal(null);
        });

        it('should return undefined for undefined', function () {
            expect(children.map(null)).to.equal(null);
        });

        it('should map child', function () {
            expect(children.map(child, mapper)[0]).to.equal(0);
        });

        it('should map children', function () {
            expect(children.map(oneInArray, mapper)).to.deep.equal([0]);
            expect(children.map(twoInArray, mapper)).to.deep.equal([0, 1]);
        });

        it('should apply specific context', function () {
            expect(children.map(oneInArray, function (child, index) {
                return this.prefix + '-' + index;
            }, {prefix: 'prefix'})).to.deep.equal(['prefix-0']);
        });
    });

    describe('forEach', function () {
        it('should be a function', function () {
            expect(children.forEach).to.be.a('function');
        });

        it('should return null for null', function () {
            expect(children.forEach(null)).to.equal(null);
        });

        it('should return undefined for undefined', function () {
            expect(children.forEach(null)).to.equal(null);
        });

        it('should forEach child', function () {
            var result = [];
            children.forEach(child, function (child, index) {
                result.push(index);
            });

            expect(result).to.deep.equal([0]);
        });

        it('should map children', function () {
            var result = [];
            children.forEach(twoInArray, function (child, index) {
                result.push(index);
            });

            expect(result).to.deep.equal([1, 0]);
        });

        it('should apply specific context', function () {
            var result = [];
            children.forEach(oneInArray, function (child, index) {
                result.push(this.prefix + '-' + index);
            }, {prefix: 'prefix'});

            expect(result).to.deep.equal(['prefix-0']);
        });
    });
});
