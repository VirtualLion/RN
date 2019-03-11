"use strict";
/**
 * FetchNetworkDemo
 * 作者Git：https://github.com/guangqiang-liu
 * 技术交流群：620792950
 * 作者QQ：1126756952
 * @guangqiang
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/** 基于fetch 封装的网络请求工具类 **/
var react_1 = require("react");
var react_native_1 = require("react-native");
/**
 * fetch 网络请求的header，可自定义header 内容
 * @type {{Accept: string, Content-Type: string, accessToken: *}}
 */
var header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};
/**
 * GET 请求时，拼接请求URL
 * @param url 请求URL
 * @param params 请求参数
 * @returns {*}
 */
var handleUrl = function (url) { return function (params) {
    if (params) {
        var paramsArray_1 = [];
        Object.keys(params).forEach(function (key) { return paramsArray_1.push(key + '=' + encodeURIComponent(params[key])); });
        if (url.search(/\?/) === -1) {
            typeof (params) === 'object' ? url += '?' + paramsArray_1.join('&') : url;
        }
        else {
            url += '&' + paramsArray_1.join('&');
        }
    }
    return url;
}; };
/**
 * fetch 网络请求超时处理
 * @param original_promise 原始的fetch
 * @param timeout 超时时间 30s
 * @returns {Promise.<*>}
 */
var timeoutFetch = function (original_fetch, timeout) {
    if (timeout === void 0) { timeout = 30000; }
    var timeoutBlock = function () { };
    var timeout_promise = new Promise(function (resolve, reject) {
        timeoutBlock = function () {
            // 请求超时处理
            reject('timeout promise');
        };
    });
    // Promise.race(iterable)方法返回一个promise
    // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
    var abortable_promise = Promise.race([
        original_fetch,
        timeout_promise
    ]);
    setTimeout(function () {
        timeoutBlock();
    }, timeout);
    return abortable_promise;
};
/**
 * 网络请求工具类
 */
var HttpUtils = /** @class */ (function (_super) {
    __extends(HttpUtils, _super);
    function HttpUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 基于fetch 封装的GET 网络请求
     * @param url 请求URL
     * @param params 请求参数
     * @returns {Promise}
     */
    HttpUtils.getRequest = function (url, params, myHeader) {
        if (params === void 0) { params = {}; }
        return timeoutFetch(fetch(handleUrl(url)(params), {
            method: 'GET',
            headers: myHeader ? [header, myHeader] : header
        })).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                react_native_1.Alert.alert(response);
            }
        }).then(function (response) {
            // response.code：是与服务器端约定code：200表示请求成功，非200表示请求失败，message：请求失败内容
            if (response) {
                return response;
            }
            else {
                // 非 200，错误处理
                // alert(response.message)
                return response;
            }
        }).catch(function (error) {
            react_native_1.Alert.alert(error);
        });
    };
    /**
     * 基于fetch 的 POST 请求
     * @param url 请求的URL
     * @param params 请求参数
     * @returns {Promise}
     */
    HttpUtils.postRequrst = function (url, params, myHeader) {
        if (params === void 0) { params = {}; }
        return timeoutFetch(fetch(url, {
            method: 'POST',
            headers: myHeader ? [header, myHeader] : header,
            body: JSON.stringify(params)
        })).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                react_native_1.Alert.alert('服务器繁忙，请稍后再试；\r\nCode:' + response.status);
            }
        }).then(function (response) {
            // response.code：是与服务器端约定code：200表示请求成功，非200表示请求失败，message：请求失败内容
            if (response && response.code === 200) {
                return response;
            }
            else {
                // alert(response.message)
                return response;
            }
        }).catch(function (error) {
            react_native_1.Alert.alert(error);
        });
    };
    return HttpUtils;
}(react_1.Component));
exports.default = HttpUtils;
