"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var navReduce_1 = __importDefault(require("./navReduce"));
exports.default = redux_1.combineReducers({
    nav: navReduce_1.default,
});
