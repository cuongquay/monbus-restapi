import chai, { expect } from 'chai'
chai.should()

var apiService = require('../../test-utils');

describe('(monbusRestapi) peoplePets:', function () {

    before('Prepare for peoplePets test specs', async function () {
        await apiService.config(require('../../../../monbus-demo-meta.json'));
    });
    
    it('Should be rejected with Invalid Security Token (IAM) when calling fetchTimeByStation', async function () {
        var data = { id: 'id', body: {} }
        const result = await apiService.executeIAM('/stations/{id}', 'POST', data)
        result.should.be.an('object') && expect(result.errors.message).to.be.equal('The security token included in the request is invalid.')
    });

    after('Cleanup peoplePets test specs', function () {});
});
