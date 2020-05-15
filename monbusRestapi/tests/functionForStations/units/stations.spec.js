var chai = require('chai');
var rewire = require('rewire');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();
require('../../../utils/sanitizer');

const stationsService = require('../../../functionForStations/src/function-for-stations').stations;

describe('(monbusRestapi) stations:', function () {
    var context = { requestContext: { identity: { user: {} }, authorizer: { claims: {} } } }
    before('Prepare for stations test specs', function () {
        context.requestContext.identity.user = "XXXXXXXXXXXXXXXXXXXX:CognitoIdentityCredentials"
        context.requestContext.authorizer.claims.sub=  "9999-0000-33333333-2222-333333333333"
    });

    it('Should be rejected with ErrorOperationNotImplemetedException when calling getStations', function () {
        var data = {  }
        return stationsService.getStations(context).should.eventually.rejected;
    });

    after('Cleanup stations test specs', function () {});
});