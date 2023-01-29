import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store/store';
import App from './App';
import './index.css';
import { LoadingScreen } from './common/components';

const container = document.getElementById('root')!;
const [store, persistor] = configureStore();

ReactDOM.render((
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen isLoading />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
), container);
