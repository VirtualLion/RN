"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_navigation_1 = require("react-navigation");
var containers_1 = require("../pages/containers");
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var icons = [
    require('../img/nav_1.png'),
    require('../img/nav_2.png'),
    require('../img/nav_3.png'),
    require('../img/nav_4.png'),
];
var Tabbar = react_navigation_1.createBottomTabNavigator({
    Home: {
        screen: containers_1.Home,
        navigationOptions: {
            title: '首页',
            tabBarIcon: react_1.default.createElement(react_native_1.Image, { source: icons[0] })
        }
    },
    Work: {
        screen: containers_1.Home,
        navigationOptions: {
            title: '办事',
            tabBarIcon: react_1.default.createElement(react_native_1.Image, { source: icons[1] })
        }
    },
    Life: {
        screen: containers_1.Home,
        navigationOptions: {
            title: '生活',
            tabBarIcon: react_1.default.createElement(react_native_1.Image, { source: icons[2] })
        }
    },
    Tool: {
        screen: containers_1.Home,
        navigationOptions: {
            title: '工具',
            tabBarIcon: react_1.default.createElement(react_native_1.Image, { source: icons[3] })
        }
    }
}, {
    backBehavior: 'none',
    tabBarOptions: {
        activeTintColor: '#333333',
        inactiveTintColor: '#999999',
    },
});
var RootNav = react_navigation_1.createStackNavigator({
    Root: {
        screen: containers_1.TabBar,
        navigationOptions: {
            header: null,
        },
    },
}, {
    initialRouteName: 'Root',
});
exports.default = react_navigation_1.createAppContainer(RootNav);
