const http = require('http');
const https = require('https');
const fs = require('fs');

function createServer(config) {
    if (config.ssl) {
        return https.createServer({
            key: fs.readFileSync(config.key),
            cert: fs.readFileSync(config.cert),
        });
    }
    else {
        return http.createServer();
    }
}

module.exports = function createHttp(config, listener) {
    return new Promise((resolve, reject) => {
        const server = createServer(config);

        server.on('request', listener);
        server.on('error', reject);

        server.listen(config.port, config.host, () => resolve(server));
    });
};
