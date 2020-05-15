
const getSafeValue = function (type, value) {
    var safeVal = null
    switch (type) {
        case "string":
            safeVal = typeof (value) === 'string' ? value.toString() : null
            break
        case "object":
            safeVal = typeof (value) === 'object' ? value : {}
            break
        case "integer":
            safeVal = parseInt(value)
            break
        case "number":
            safeVal = parseFloat(value)
            break
        case "array":
            safeVal = typeof (value) === 'array' ? value : []
            break
        case "boolean":
            safeVal = (value === true) ? true : false
            break
        default:
            break
    }
    return safeVal
}

exports.customSanitizeParamsMiddleware = function (req, res, next) {
    try {
        req.sanitizer = req.sanitizer || { }
        req.swagger.params.map(p => {
            if (p.in == 'path') req.sanitizer[p.name] = { type: p.type, value: getSafeValue(p.type, req.params[p.name]) }
            if (p.in == 'body') req.sanitizer[p.name] = { type: p.type, value: getSafeValue(p.type, req.body) }
            if (p.in == 'query') req.sanitizer[p.name] = { type: p.type, value: getSafeValue(p.type, req.query[p.name]) }
        })
        if (req.apiGateway) {
            req.sanitizer['context'] = req.apiGateway.event
        }
        return next()
    } catch (err) {
        res.status(400/** BAD REQUEST */).json({
            code: "ErrorServiceParametersError",
            message: err.message
        });
    }
}