import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';//异步中间件
import { persistStore, persistReducer } from 'redux-persist';//本地存储
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

//网络请求
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import rootReducer from '../reducers';

const client = axios.create({ //all axios can be used, shown in axios documentation
	// baseURL:'https://',
	// responseType: 'json'
});
  

// 自定义log中间件，该中间件的目的是打印出当前的触发的action以及出发后的state变化。
const logger = (store: any) => (next: any) => (action: any) => {
	if(typeof action === 'function') console.log('dispatching a function');
	else console.log('dispatching', action);
	let result = next(action);
	console.log('next state', store.getState());
	return result;
};

let middlewares = [
	logger,
	thunk,
	axiosMiddleware(client)
];

const persistConfig = {
    key: 'root',
	storage,
	blacklist:['nav'],//黑名单 不存储的reducer
	//whitelist:['city'],//白名单 只存储的reducer
};
// applyMiddleware会将中间件应用在redux action过程中。
let createAppStore = applyMiddleware(...middlewares)(createStore);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createAppStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
};