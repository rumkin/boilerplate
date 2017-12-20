const logger = require('./logger.js');

// const initMongoist = require('./factories/mongoist.js');
const createApp = require('./factories/app.js');
const createAdapters = require('./factories/adapters.js');
const createServices = require('./factories/services.js');
const createWebapp = require('./factories/webapp.js');
const createWebSocket = require('./factories/websocket.js');
const createHttp = require('./factories/http.js');
const createSessionStore = require('./factories/session-store.js');

module.exports = async function(config) {
    // Start mongoist...
    // logger.info('Connect to mongodb');
    // await initMongoist(config.mongo);

    // Create application and web server...
    logger.info('Create application');
    const app = createApp(config);

    app.logger = logger;

    logger.info('Create session store');
    const sessionStore = createSessionStore(app, logger);

    logger.info('Initialize adapters');
    const adapters = createAdapters(config, app, require('./adapters'));

    logger.info('Binds adapters');
    adapters
    .forEach((adapter, name) => {
        app.register(name, adapter);
    });

    logger.info('Initialize services');
    const services = createServices(config, app, require('./services'));

    logger.info('Binds services');
    services
    .forEach((service, name) => {
        app.register(name, service);
    });

    logger.info('Start application');
    await app.start();

    logger.info('Create WebApp');
    const webapp = createWebapp(app, logger, sessionStore);

    logger.info('Start server');
    // Start http instance...
    const server = await createHttp(config.http, webapp);

    logger.info('Bind web socket server');
    createWebSocket(app, server);

    logger.info('Server started at %s:%s', config.http.host, config.http.port);
};
