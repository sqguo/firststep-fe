import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import App from './App';
import './index.css';

const container = document.getElementById('root')!;
const store = configureStore();

ReactDOM.render((
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
), container);
