'use strict';

const logger = require('../../utils/logger')

/**
 * Get Stations Information - Trial Deployment (latest)
 * curl -X GET http://localhost:3000/stations
 * - context object { requestContext: { identity, authorizer } }
 * no response value expected for this operation
 **/
exports.getStations = function(context) {
    var f = __function
    logger.info(__function, __line, "Enable Debug Info Only: process.env.DEBUG=INFO")
    logger.warn(__function, __line, "Enable INFO and WARNING: process.env.DEBUG=INFO,WARNING")
    logger.error(__function, __line, "Enable Debug Error Only: process.env.DEBUG=ERROR")
    return new Promise(function(resolve, reject) {    
        reject({
            "code": "ErrorOperationNotImplemetedException",
            "message": `The 'getStations' was not Implemented. [TODO: Update your service code at line:${__line} of ${f}]`
        });    
    });
}
