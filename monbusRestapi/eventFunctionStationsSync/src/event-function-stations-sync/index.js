exports.handler = (event, context, callback) => {
    callback(null, { statusCode: 403, body: JSON.stringify({
        "code": "ErrorServiceNotImplemetedException",
        "message": `The 'event-function-stations-sync' was not Implemented. [TODO: Update your code then deploy again!]`
    })})
};