const Store = require('../lib/memory-store.js');

module.exports = function(app) {
    return new Store(app.config.sessionStore || {});
};
