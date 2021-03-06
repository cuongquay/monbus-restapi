const fs = require('fs')
const path = require('path')
const yaml = require('yaml');
const sanitizer = require('./sanitizer')
const specYAML = require('../specs/swagger.yaml')
let swagger = yaml.parse(fs.readFileSync(path.join(__dirname, specYAML.default), 'utf8'), { prettyErrors: true });
exports.register = function (event, context, operations) {
    const defaultHeaders = {
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        "X-Content-Type-Options": "nosniff",
        "Content-Type": "application/json"
    }
    let requestParams = event.pathParameters
    let eventPath = event.resource.replace(/{/g,':').replace(/}/g,'')
    const operation = operations.find(o => {
        if (o.method == event.httpMethod) {
            return o.path == eventPath
        }
        return false
    })
    if (typeof operation !== 'undefined') {
        const swaggerParams = swagger.paths[event.resource][event.httpMethod.toLowerCase()].parameters
        const req = {
            query: event.queryStringParameters || {},
            cookies: event.headers.cookie || event.headers.Cookie || "",
            body: JSON.parse(event.body || "{}") || {},
            swagger: {
                params: swaggerParams
            },
            headers: event.headers,
            params: requestParams
        }
        let res = {
            writeHead: function (status, headers) {
                this.status = status
                this.headers = headers
                return this
            },
            end: function (payload) {
                context.succeed({ statusCode: this.status, body: payload, headers: this.headers })
            },
            status: function (status) {
                this.status = status
                return this
            },
            json: function (obj) {
                context.succeed({ statusCode: this.status, body: JSON.stringify(obj), headers: this.headers || defaultHeaders })
            }
        }
        sanitizer.customSanitizeParamsMiddleware(req, res, function (_, req, res) {
            operation.handler(req, res)
        })
    } else {
        context.done({ statusCode: 403, body: JSON.stringify({ error: "ErrorInvalidContextRequest" }), headers: defaultHeaders })
    }
}