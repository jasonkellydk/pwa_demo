import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import reducers from './ducks';

export default function () {
  const allReducers = combineReducers({
    ...reducers,
  });

  const middlewares = [thunk];
  const composeData = [applyMiddleware(...middlewares), offline(offlineConfig)];

  const isBrowser = typeof window !== 'undefined';

  if (isBrowser && process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeData.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const enhancers = compose(...composeData);

  const store = createStore(
    allReducers,
    enhancers
  );

  return { store };
}
