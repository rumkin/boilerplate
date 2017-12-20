import imm from './imm.js';
import {cloneDeep} from 'lodash';

class Record {
    get defaults() {
        return this.constructor.defaults;
    }

    constructor(data = {}) {
        Object.assign(this, this.defaults, cloneDeep(data));

        imm.freezed(this);
    }

    clone() {
        const clone = Object.create(this.constructor.prototype);
        Object.assign(clone, this);
        return clone;
    }
}

[
    'get',
    'getIn',
]
.forEach((method) => {
    Record.prototype[method] = function(...args) {
        return imm[method](this, ...args);
    };
});

[
    'set',
    'setIn',
    'update',
    'updateIn',
    'remove',
    'removeIn',
    'merge',
    'mergeIn',
    'mapIn',
    'filterIn',
    'itemIn',
    'addLastIn',
    'addFirstIn',
    'removeLastIn',
    'removeFirstIn',
    'removeAtIn',
]
.forEach((method) => {
    Record.prototype[method] = function(...args) {
        const result = imm[method](this, ...args);

        return result;
    };
});

export default Record;

export function withDefaults(defaults) {
    return function (Class) {
        Class.defaults = defaults;
        return Class;
    };
}
