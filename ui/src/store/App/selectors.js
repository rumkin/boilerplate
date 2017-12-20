export function getApp(state) {
    return state.app;
}

export function getActor(state) {
    return getApp(state).actor;
}

export function getError(state) {
    return getApp(state).error;
}
