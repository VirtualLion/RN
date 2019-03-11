"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionsTypes_1 = require("./actionsTypes");
var getNavDefault = function () { return ({ type: actionsTypes_1.NAV_DEFAULT }); };
exports.getNavDefault = getNavDefault;
var getData = function () { return ({
    type: ['LOAD', 'SUCCESS', 'FAILURE'],
    payload: {
        request: {
            url: 'https://www.baidu.com',
            method: 'get',
        }
    }
}); };
exports.getData = getData;
