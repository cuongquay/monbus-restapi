import chai, { expect } from 'chai'
chai.should()

var apiService = require('../../test-utils');

describe('(monbusRestapi) stations:', function () {

    before('Prepare for stations test specs', async function () {
        await apiService.config(require('../../../../monbus-demo-meta.json'));
    });
    
    it('Should be rejected with Invalid Security Token (IAM) when calling getStations', async function () {
        var data = {  }
        const result = await apiService.executeIAM('/stations', 'GET', data)
        result.should.be.an('object') && expect(result.errors.message).to.be.equal('The security token included in the request is invalid.')
    });

    after('Cleanup stations test specs', function () {});
});
