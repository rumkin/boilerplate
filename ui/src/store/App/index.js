import App from '../../models/App';

import * as actions from './actions';
import * as selectors from './selectors';
import saga from './sagas';

function reducer(state = new App(), {type, payload}) {
    switch (type) {
        case actions.APP_INIT:
            return state.merge({
                loading: true,
                loaded: false,
                error: null,

                actor: null,
            });

        case actions.APP_READY:
            return state.merge({
                loaded: true,
                loading: false,
                error: null,

                actor: payload.user,
            });

        case actions.APP_ERROR:
            return state.merge({
                loaded: true,
                loading: false,
                error: payload.error,
            });

        case actions.APP_SIGNED_IN:
            return state.set('actor', payload.user);

        case actions.APP_SIGNED_OUT:
            return state.set('actor', null);

        default:
            return state;
    }
}

export default {
    actions,
    selectors,
    saga,
    reducer,
};
