const enforcementPackage = process.env.ENFORCEMENT_PACKAGE || 'function-for-get-timetables'
const allowedCanaries = [ "latest", "stable", "enforce" ]
const getPackage = function(canary) {
    let runtimePackage = undefined
    if (canary === 'stable') runtimePackage = __non_webpack_require__('function-for-get-timetables')
    else if (canary === 'enforce') runtimePackage = __non_webpack_require__(`${enforcementPackage}`)
    else runtimePackage = require('./function-for-get-timetables')
    return runtimePackage
}
var functionForGetTimetables = getPackage(process.env.DEPLOYMENT_STAGE || 'latest')

exports.handler = (event, context, callback) => {
    if (allowedCanaries.indexOf(event.headers['x-canary-selection']) >=0 && process.env.DEPLOYMENT_STAGE === 'canary') {
        functionForGetTimetables = getPackage(`${event.headers['x-canary-selection']}`)
    }
    functionForGetTimetables.handler(event, context, callback)
};

exports.proxyHandler = function(req, res) {
    exports.handler(req, {}, function(err, data) {
        if (err) res.status(403).send(err)
        else res.status(data.statusCode).json(JSON.parse(data.body))
    })
}