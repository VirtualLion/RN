import { NAV_DEFAULT } from '../actions/actionsTypes';
import { NavState } from './statesTypes';

const initialState: NavState = {
    tabItems: [
        'home',
        'page',
    ],
    value: null,
    status: 'none',
};

export default (state=initialState, action: any)=>{
    switch(action.type) {
        case NAV_DEFAULT:
            return {
                ...state,
                tabItems: [
                    'home',
                    'page',
                ],
                status: 'default',
            }
        case 'LOAD':
            console.log('LOAD');
            console.log(action);
            return {
                ...state,
                value: action.payload
            }
        case 'SUCCESS':
            console.log('SUCCESS');
            console.log(action);
            return {
                ...state,
                value: action.payload
            }
        case 'FAILURE':
            console.log('FAILURE');
            console.log(action);
            return {
                ...state,
                value: action.payload
            }
        default:
            return state;
    }
};