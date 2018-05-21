import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import initStore from './state/store';
import { Provider } from 'react-redux';

const { store } = initStore();

ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
