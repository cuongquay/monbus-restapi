'use strict';

const express = require('express')
let app = express()

app.put("/events/stations-sync", require("./index").proxyHandler);    

app.listen(3000, function () {// NOSONAR
    console.log("node express service - ".concat("debugging"));
});