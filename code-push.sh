#!/bin/bash
# Simplify Automatic Deployment Script
# Project: monbus-restapi
# Deployment: monbus-demo
# Region: eu-west-1
# Profile: simplify-eu
# Version: 0.1.1
INITIAL_DIR=$PWD

node code-init.js --input monbus-demo.json

source ${INITIAL_DIR}/code-versions.sh ${1}

export DEPLOYMENT_STAGE=${ENV_functionForGetTimetables_DEPLOYMENT_STAGE}
export ENFORCEMENT_PACKAGE=${ENV_functionForGetTimetables_ENFORCEMENT_PACKAGE}
cd ${INITIAL_DIR}/monbusRestapi/functionForGetTimetables && npm install && npm run build && npm run deploy && cd -
if [ $? -ne 0 ]; then
    echo "Publishing functionForGetTimetables (latest) version has failed!"
    exit 255
fi
export DEPLOYMENT_STAGE=${ENV_eventFunctionStationsSync_DEPLOYMENT_STAGE}
export ENFORCEMENT_PACKAGE=${ENV_eventFunctionStationsSync_ENFORCEMENT_PACKAGE}
cd ${INITIAL_DIR}/monbusRestapi/eventFunctionStationsSync && npm install && npm run build && npm run deploy && cd -
if [ $? -ne 0 ]; then
    echo "Publishing eventFunctionStationsSync (latest) version has failed!"
    exit 255
fi
export DEPLOYMENT_STAGE=${ENV_functionForStations_DEPLOYMENT_STAGE}
export ENFORCEMENT_PACKAGE=${ENV_functionForStations_ENFORCEMENT_PACKAGE}
cd ${INITIAL_DIR}/monbusRestapi/functionForStations && npm install && npm run build && npm run deploy && cd -
if [ $? -ne 0 ]; then
    echo "Publishing functionForStations (latest) version has failed!"
    exit 255
fi
