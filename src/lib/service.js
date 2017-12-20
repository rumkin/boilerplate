const {EventEmitter} = require('events');
const copy = require('./utils/deep-copy.js');

module.exports = class Service extends EventEmitter {
    constructor(app, options = {}) {
        super();
        this.app = app;
        this.options = copy(options);
    }

    startService(app) {
        this.api = app.api;
    }

    stopService() {
        delete this.api;
    }
};
