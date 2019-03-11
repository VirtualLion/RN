import { combineReducers } from 'redux';

import navReducer from './navReduce';

export default combineReducers({
    nav: navReducer,
});