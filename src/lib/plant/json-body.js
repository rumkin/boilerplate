const stp = require('../utils/stream-to-promise.js');
const bytes = require('bytes');

module.exports = function(limit = '1Mb') {
    const maxSize = bytes(limit);

    return async function ({req}, next) {
        if (req.method !== 'get' && req.is('json')) {
            const length = req.headers.get('content-length');
            if (parseInt(length) > maxSize) {
                throw 413;
            }

            req.body = JSON.parse(await stp(req));
        }

        await next();
    };
};
