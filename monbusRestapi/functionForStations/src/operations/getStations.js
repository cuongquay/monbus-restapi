'use strict';

var utils = require('../utils/writer.js');
const enforcementPackage = process.env.ENFORCEMENT_PACKAGE || 'function-for-stations'
const allowedCanaries = [ "latest", "stable", "enforce" ]
const getPackage = function(canary) {
    let runtimePackage = undefined
    if (canary === 'stable') runtimePackage = __non_webpack_require__('function-for-stations').stations
    else if (canary === 'enforce') runtimePackage = __non_webpack_require__(`${enforcementPackage}`).stations
    else runtimePackage = require('../function-for-stations').stations
    return runtimePackage
}
var stations = getPackage(process.env.DEPLOYMENT_STAGE || 'latest')


/**
 * Get Stations Information
 * curl -X GET http://localhost:3000/stations
 * no response value expected for this operation
 **/

module.exports = function (req, res, next) {
    if (allowedCanaries.indexOf(req.headers['x-canary-selection']) >=0 && process.env.DEPLOYMENT_STAGE === 'canary') {
        stations = getPackage(`${req.headers['x-canary-selection']}`)
    }
    stations.getStations(req.sanitizer['context'])
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