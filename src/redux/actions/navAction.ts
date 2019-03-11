import { NAV_DEFAULT } from './actionsTypes';

const getNavDefault = ()=>({type:NAV_DEFAULT});

const getData = ()=>({
    type: ['LOAD','SUCCESS','FAILURE'],
    payload: {
        request:{
            url:'https://www.baidu.com',
            method:'get',
        }
    }
});

export {
    getNavDefault,
    getData
}