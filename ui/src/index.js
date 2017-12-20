import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './containers/App';
import {Provider} from 'react-redux';
import {init} from './store/App/actions';

import {store} from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

store.dispatch(init());
