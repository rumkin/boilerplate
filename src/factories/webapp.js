const Plant = require('@plant/plant');

// Handlers
const logHandler = require('../lib/plant/log.js');
const jsonBodyHandler = require('../lib/plant/json-body.js');
const authHandler = require('../lib/plant/auth.js');
const originHandler = require('../lib/plant/origin.js');
const cookieHandler = require('../lib/plant/cookie.js');
const sessionHandler = require('../lib/plant/session.js');
const fileHandler = require('../lib/plant/file.js');

const appHandler = require('../delivery');

module.exports = function createHttp(app, logger, sessionStore) {
    const plant = new Plant();

    plant.use(logHandler(logger));
    plant.use(originHandler());
    plant.use(jsonBodyHandler(app.config.http.maxBody));
    plant.use(cookieHandler);
    plant.use(sessionHandler({
        store: sessionStore,
        secret: app.config.http.sessionSecret,
    }));
    plant.use(authHandler);
    plant.use(fileHandler({
        root: './assets',
    }));
    plant.use(appHandler(app, logger));

    return plant.handler();
};
