// import {createActions} from 'redux-actions';

import action from '../../lib/action';

export const APP_INIT = 'app/init';
export const APP_READY = 'app/ready';
export const APP_ERROR = 'app/error';

export const APP_SIGN_IN = 'app/sign_in';
export const APP_SIGNED_IN = 'app/signed_in';
export const APP_SIGN_OUT = 'app/sign_out';
export const APP_SIGNED_OUT = 'app/signed_out';

// App initialized
export function init() {
    return action(APP_INIT);
}

export function ready(user) {
    return action(APP_READY, {user});
}

export function error(error) {
    return action(APP_ERROR, {error});
}

export function signIn(username, password) {
    return action(APP_SIGN_IN, {username, password});
}

export function signedIn(user) {
    return action(APP_SIGNED_IN, {user});
}

export function signOut() {
    return action(APP_SIGN_OUT);
}

export function signedOut() {
    return action(APP_SIGNED_IN);
}
