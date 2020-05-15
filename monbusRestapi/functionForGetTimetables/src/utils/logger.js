const functionForGetTimetables = require('debug')('functionForGetTimetables')
exports.info = functionForGetTimetables.extend('INFO')
exports.warn = functionForGetTimetables.extend('WARNING')
exports.error = functionForGetTimetables.extend('ERROR')
exports.debug = functionForGetTimetables.extend('DEBUG')

if (typeof global.__stack === 'undefined') {
    Object.defineProperty(global, '__stack', {
        get: function () {
            var orig = Error.prepareStackTrace;
            Error.prepareStackTrace = function (_, stack) {
                return stack;
            };
            var err = new Error;
            Error.captureStackTrace(err, arguments.callee);
            var stack = err.stack;
            Error.prepareStackTrace = orig;
            return stack;
        }
    });
}

if (typeof global.__line === 'undefined') {
    Object.defineProperty(global, '__line', {
        get: function () {
            return __stack[1].getLineNumber();
        }
    });
}

if (typeof global.__function === 'undefined') {
    Object.defineProperty(global, '__function', {
        get: function () {
            return __stack[1].getFunctionName();
        }
    });
}

require('debug').enable(process.env.DEBUG || 'functionForGetTimetables:INFO,functionForGetTimetables:WARNING,functionForGetTimetables:ERROR')