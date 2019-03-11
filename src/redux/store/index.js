"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_thunk_1 = __importDefault(require("redux-thunk")); //异步中间件
var redux_persist_1 = require("redux-persist"); //本地存储
var storage_1 = __importDefault(require("redux-persist/lib/storage")); // defaults to localStorage for web and AsyncStorage for react-native
//网络请求
var axios_1 = __importDefault(require("axios"));
var redux_axios_middleware_1 = __importDefault(require("redux-axios-middleware"));
var reducers_1 = __importDefault(require("../reducers"));
var client = axios_1.default.create({ //all axios can be used, shown in axios documentation
// baseURL:'https://',
// responseType: 'json'
});
// 自定义log中间件，该中间件的目的是打印出当前的触发的action以及出发后的state变化。
var logger = function (store) { return function (next) { return function (action) {
    if (typeof action === 'function')
        console.log('dispatching a function');
    else
        console.log('dispatching', action);
    var result = next(action);
    console.log('next state', store.getState());
    return result;
}; }; };
var middlewares = [
    logger,
    redux_thunk_1.default,
    redux_axios_middleware_1.default(client)
];
var persistConfig = {
    key: 'root',
    storage: storage_1.default,
    blacklist: ['nav'],
};
// applyMiddleware会将中间件应用在redux action过程中。
var createAppStore = redux_1.applyMiddleware.apply(void 0, middlewares)(redux_1.createStore);
var persistedReducer = redux_persist_1.persistReducer(persistConfig, reducers_1.default);
exports.default = (function () {
    var store = createAppStore(persistedReducer);
    var persistor = redux_persist_1.persistStore(store);
    return { store: store, persistor: persistor };
});
