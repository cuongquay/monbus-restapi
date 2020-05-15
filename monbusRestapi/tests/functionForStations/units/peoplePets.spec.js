var chai = require('chai');
var rewire = require('rewire');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();
require('../../../utils/sanitizer');

const peoplePetsService = require('../../../functionForStations/src/function-for-stations').peoplePets;

describe('(monbusRestapi) peoplePets:', function () {
    var context = { requestContext: { identity: { user: {} }, authorizer: { claims: {} } } }
    before('Prepare for peoplePets test specs', function () {
        context.requestContext.identity.user = "XXXXXXXXXXXXXXXXXXXX:CognitoIdentityCredentials"
        context.requestContext.authorizer.claims.sub=  "9999-0000-33333333-2222-333333333333"
    });

    it('Should be rejected with ErrorOperationNotImplemetedException when calling fetchTimeByStation', function () {
        var data = { id: 'id', body: {} }
        return peoplePetsService.fetchTimeByStation(context, data.id, data.body).should.eventually.rejected;
    });

    after('Cleanup peoplePets test specs', function () {});
});