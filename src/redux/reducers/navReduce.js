"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var actionsTypes_1 = require("../actions/actionsTypes");
var initialState = {
    tabItems: [
        'home',
        'page',
    ],
    value: null,
    status: 'none',
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actionsTypes_1.NAV_DEFAULT:
            return __assign({}, state, { tabItems: [
                    'home',
                    'page',
                ], status: 'default' });
        case 'LOAD':
            console.log('LOAD');
            console.log(action);
            return __assign({}, state, { value: action.payload });
        case 'SUCCESS':
            console.log('SUCCESS');
            console.log(action);
            return __assign({}, state, { value: action.payload });
        case 'FAILURE':
            console.log('FAILURE');
            console.log(action);
            return __assign({}, state, { value: action.payload });
        default:
            return state;
    }
});
