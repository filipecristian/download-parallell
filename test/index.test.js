const index = require('../index');

var sinon = require("sinon");

var assert = require('assert');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect;
var assert = chai.assert;


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
    
    describe('#donwloadAll', function() {
        it('should download all files', async function() {

            var oppenConnectionCallbackFake = sinon.stub().resolves('foo');

            var saveCallbackFake = sinon.stub().resolves('bar');

            var list = [
                {
                    "url": "http://jsonplaceholder.typicode.com/users/1"
                },
                {
                    "url": "http://jsonplaceholder.typicode.com/users/2"
                },
                {
                    "url": "http://jsonplaceholder.typicode.com/users/3"
                },
                {
                    "url": "http://jsonplaceholder.typicode.com/users/4"
                },
            ];
            
            var maxPool = 4;

            await index.downloadAll(oppenConnectionCallbackFake, saveCallbackFake, list, maxPool);

            assert.equal(oppenConnectionCallbackFake.callCount, 4);
            assert.equal(saveCallbackFake.callCount, 4);
        });
    });
});