const App = require('../lib/app.js');
const createServices = require('./services.js');

module.exports = function createApp(config) {
    const app = new App(config);

    return app;
};
