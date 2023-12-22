const { Download } = require('../src/download');

var sinon = require("sinon");

var assert = require('assert');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var assert = chai.assert;


describe('download', function() {
    describe('#donwloadAll', function() {
        it('should download all files', async function() {

            let download = new Download();
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

            await download.downloadAll(oppenConnectionCallbackFake, saveCallbackFake, list, maxPool);

            assert.equal(oppenConnectionCallbackFake.callCount, 4);
            assert.equal(saveCallbackFake.callCount, 4);
        });
    });
});