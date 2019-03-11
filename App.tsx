import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import storeConfig from './src/redux/store';

import RootNav from './src/navigator';

const { store, persistor } = storeConfig();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNav />
        </PersistGate>
      </Provider>
    )
  }
}