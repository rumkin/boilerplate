import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects';
import {push} from 'react-router-redux';

import api from '../../api';
import * as routes from '../../routes.js';

import * as actions from './actions';

function* init() {
    try {
        const user = yield call([api, 'get']);
        yield put(actions.ready(user));
    }
    catch (error) {
        if (error.code === 'auth_required') {
            yield put(actions.ready(null));
        }
        else {
            yield put(actions.error('Loading error'));
        }
    }
}

function* signOut() {
    try {
        // yield call([api, 'signOut']);
        yield put(actions.signedOut());
        yield put(push(routes.home()));
    }
    catch (error) {
        console.error(error);
    }
}

export default function* saga() {
    yield takeEvery(actions.APP_INIT, init);
    yield takeEvery(actions.APP_SIGN_OUT, signOut);
}
