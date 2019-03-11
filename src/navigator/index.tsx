import {
    createAppContainer,
    createStackNavigator,
    createBottomTabNavigator,
} from 'react-navigation';

import {
    Home,
    TabBar
} from '../pages/containers';

import React from 'react';
import {
    Image,
} from 'react-native';

const icons = [
    require('../img/nav_1.png'),
    require('../img/nav_2.png'),
    require('../img/nav_3.png'),
    require('../img/nav_4.png'),
];

const Tabbar = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: '首页',
            tabBarIcon: <Image source={icons[0]}/>
        }
    },
    Work: {
        screen: Home,
        navigationOptions: {
            title: '办事',
            tabBarIcon: <Image source={icons[1]}/>
        }
    },
    Life: {
        screen: Home,
        navigationOptions: {
            title: '生活',
            tabBarIcon: <Image source={icons[2]}/>
        }
    },
    Tool: {
        screen: Home,
        navigationOptions: {
            title: '工具',
            tabBarIcon: <Image source={icons[3]}/>
        }
    }
},{
    backBehavior: 'none',
    tabBarOptions: {
        activeTintColor: '#333333',
        inactiveTintColor: '#999999',
    },
});

const RootNav = createStackNavigator({
    Root: {
        screen: TabBar,
        navigationOptions: {
            header: null,
        },
    },
},{
    initialRouteName: 'Root',
});

export default createAppContainer(RootNav);