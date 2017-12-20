const Promise = require('bluebird');
const {parse} = require('url');
const {Server} = require('ws');

const logger = require('../logger');
// const defer = require('../lib/defer');

module.exports = function(app, server, services) {
    const wss = new Server({server});

    wss.on('connection', function (ws, req) {
        Promise.try(async function() {
            // const {pathname, query} = parse(req.url, {query: true});

            // if (pathname !== '/api/v1/events') {
            //     logger.debug('Unknown path', pathname);
            //     ws.close();
            //     return;
            // }
            console.log('Connection will be closed now...');
            ws.close();
        })
        .catch((error) => {
            logger.error('WebSocket:', error);
            ws.close();
        });
    });

    return wss;
};
