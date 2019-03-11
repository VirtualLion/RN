"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_native_2 = require("@ant-design/react-native");
var react_navigation_1 = require("react-navigation");
var react_redux_1 = require("react-redux");
var navAction_1 = require("../../../redux/actions/navAction");
var BasicTabBarExample = /** @class */ (function (_super) {
    __extends(BasicTabBarExample, _super);
    function BasicTabBarExample(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            selectedTab: 'blueTab',
        };
        return _this;
    }
    BasicTabBarExample.prototype.componentDidMount = function () {
        console.log('get');
        this.props.dispatch(navAction_1.getData());
    };
    BasicTabBarExample.prototype.renderContent = function (pageText) {
        return (react_1.default.createElement(react_navigation_1.SafeAreaView, { style: { flex: 1, alignItems: 'center', backgroundColor: 'white' } },
            react_1.default.createElement(react_native_2.SearchBar, { placeholder: "Search", showCancelButton: true }),
            react_1.default.createElement(react_native_1.Text, { style: { margin: 50 } }, pageText)));
    };
    BasicTabBarExample.prototype.onChangeTab = function (tabName) {
        this.setState({
            selectedTab: tabName,
        });
    };
    BasicTabBarExample.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(react_native_2.TabBar, { unselectedTintColor: "#949494", tintColor: "#33A3F4", barTintColor: "#f5f5f5" },
            react_1.default.createElement(react_native_2.TabBar.Item, { title: "Life", icon: react_1.default.createElement(react_native_2.Icon, { name: "home" }), selected: this.state.selectedTab === 'blueTab', onPress: function () { return _this.onChangeTab('blueTab'); } },
                react_1.default.createElement(react_navigation_1.SafeAreaView, { style: { flex: 1, alignItems: 'center', backgroundColor: 'white' } },
                    react_1.default.createElement(react_native_1.Text, { style: { margin: 50 } }, 123))),
            react_1.default.createElement(react_native_2.TabBar.Item, { icon: react_1.default.createElement(react_native_2.Icon, { name: "ordered-list" }), title: "Koubei", badge: 2, selected: this.state.selectedTab === 'redTab', onPress: function () { return _this.onChangeTab('redTab'); } }, this.renderContent('Koubei Tab')),
            react_1.default.createElement(react_native_2.TabBar.Item, { icon: react_1.default.createElement(react_native_2.Icon, { name: "like" }), title: "Friend", selected: this.state.selectedTab === 'greenTab', onPress: function () { return _this.onChangeTab('greenTab'); } }, this.renderContent('Friend Tab')),
            react_1.default.createElement(react_native_2.TabBar.Item, { icon: react_1.default.createElement(react_native_2.Icon, { name: "user" }), title: "My", selected: this.state.selectedTab === 'yellowTab', onPress: function () { return _this.onChangeTab('yellowTab'); } }, this.renderContent('My Tab'))));
    };
    return BasicTabBarExample;
}(react_1.default.Component));
function select(store) {
    console.log('connect');
    console.log(store.nav);
    return {
        data: store.nav.value
    };
}
exports.default = react_redux_1.connect(select)(BasicTabBarExample);
