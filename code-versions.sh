#!/bin/bash
# Simplify Automatic Deployment Script
# Project: monbus-restapi
# Deployment: monbus-demo
# Region: eu-west-1
# Profile: simplify-eu
# Version: 0.1.1

export ENV_functionForGetTimetables_DEPLOYMENT_STAGE=${1}
export ENV_functionForGetTimetables_ENFORCEMENT_PACKAGE=
export ENV_eventFunctionStationsSync_DEPLOYMENT_STAGE=${1}
export ENV_eventFunctionStationsSync_ENFORCEMENT_PACKAGE=
export ENV_functionForStations_DEPLOYMENT_STAGE=${1}
export ENV_functionForStations_ENFORCEMENT_PACKAGE=
