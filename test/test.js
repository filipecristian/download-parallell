const index = require('../index');

var assert = require('assert');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect;
var assert = chai.assert;


describe('Array', function() {
    describe("#indexOf()", function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('index.js', function() {
    describe('#sleep()', function() {
        it('should return message after sleep', function() {
            return expect(index.sleep(100)).to.eventually.equal(100);
        });
    });

    describe("#list of files", function() {
        it('should return 4 objects', function() {
            assert.equal(index.list.length, 4);
        });
    });
});