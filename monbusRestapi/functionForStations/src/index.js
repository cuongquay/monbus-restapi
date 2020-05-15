const router = require('./utils/router');
exports.handler = (event, context) => {
    router.register(event, context, [
        { method: "POST", path: "/stations/:id", handler: require("./operations/fetchTimeByStation") },
        { method: "GET", path: "/stations", handler: require("./operations/getStations") },
    ]);
};