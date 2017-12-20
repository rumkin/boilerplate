import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import App from './store/App';

let initialState = {};

const sagaMiddleware = createSagaMiddleware();

// Redux DevTools extension code
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : (e) => e;

export const history = createHistory();

const enhancer = composeEnhancers(applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware
));

export const store = createStore(combineReducers({
    app: App.reducer,
    router: routerReducer,
}), initialState, enhancer);

sagaMiddleware.run(App.saga);
