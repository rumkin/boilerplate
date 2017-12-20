const bytes = require('bytes');

module.exports = function(logger) {
    return async function({res, req}, next) {
        const start = Date.now();
        await next();
        const time = Date.now() - start;

        const bytesIn = bytes.format(req.headers.get('content-length')|0);

        const args = [
            '%s - %s %s | %s sec | (%s)',
            res.statusCode,
            req.method,
            req.url,
            time / 1000,
            bytesIn,
        ];

        if (res.statusCode > 299 && res.statusCode < 500) {
            logger.warn(...args);
        }
        else if (res.statusCode > 499) {
            logger.error(...args);
        }
        else {
            logger.info(...args);
        }
    };
};
