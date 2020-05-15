'use strict';

const express = require('express')
let app = express()

app.get("/timetables", require("./index").proxyHandler);    

app.listen(3000, function () {// NOSONAR
    console.log("node express service - ".concat("debugging"));
});