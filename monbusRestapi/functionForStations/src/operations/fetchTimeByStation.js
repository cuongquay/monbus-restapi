'use strict';

var utils = require('../utils/writer.js');
const enforcementPackage = process.env.ENFORCEMENT_PACKAGE || 'function-for-stations'
const allowedCanaries = [ "latest", "stable", "enforce" ]
const getPackage = function(canary) {
    let runtimePackage = undefined
    if (canary === 'stable') runtimePackage = __non_webpack_require__('function-for-stations').peoplePets
    else if (canary === 'enforce') runtimePackage = __non_webpack_require__(`${enforcementPackage}`).peoplePets
    else runtimePackage = require('../function-for-stations').peoplePets
    return runtimePackage
}
var peoplePets = getPackage(process.env.DEPLOYMENT_STAGE || 'latest')


/**
 * Watch a realtime bus stop by StationId
 * curl -X POST http://localhost:3000/stations/{id}
 * - id string 
 * - body object Send my location information
 * no response value expected for this operation
 **/

module.exports = function (req, res, next) {
    if (allowedCanaries.indexOf(req.headers['x-canary-selection']) >=0 && process.env.DEPLOYMENT_STAGE === 'canary') {
        peoplePets = getPackage(`${req.headers['x-canary-selection']}`)
    }
    var id = req.sanitizer['id'].value;
    var body = req.sanitizer['body'].value;
    peoplePets.fetchTimeByStation(req.sanitizer['context'], id, body)
        .then(function (response) {
            utils.writeJson(res, response);
        }, function (error) {
            utils.writeError(res, error);
        })
        .catch(function (error) {
            utils.writeError(res, {
                code: 'InnerHandlerThrownException',
                message: error
            });
        });
};