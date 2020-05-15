'use strict';

const logger = require('../../utils/logger')

/**
 * Watch a realtime bus stop by StationId - Trial Deployment (latest)
 * curl -X POST http://localhost:3000/stations/{id}
 * - context object { requestContext: { identity, authorizer } }
 * - id string 
 * - body object Send my location information
 * no response value expected for this operation
 **/
exports.fetchTimeByStation = function(context, id, body) {
    var f = __function
    logger.info(__function, __line, "Enable Debug Info Only: process.env.DEBUG=INFO")
    logger.warn(__function, __line, "Enable INFO and WARNING: process.env.DEBUG=INFO,WARNING")
    logger.error(__function, __line, "Enable Debug Error Only: process.env.DEBUG=ERROR")
    return new Promise(function(resolve, reject) {    
        reject({
            "code": "ErrorOperationNotImplemetedException",
            "message": `The 'fetchTimeByStation' was not Implemented. [TODO: Update your service code at line:${__line} of ${f}]`
        });    
    });
}
