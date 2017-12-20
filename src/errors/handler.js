const http = require('http');
const error3 = require('error3');

const errors = require('../errors');

module.exports = function (logger) {
    return async function errorHandler({res}, next) {
        try {
            await next();
        }
        catch (err) {
            logger.log('Error:', err);

            if (typeof err === 'number') {
                res.status(err);
                res.json({
                    error: {
                        code: err,
                        message: http.STATUS_CODES[err],
                    },
                });
            }
            else if (err instanceof error3) {
                switch (err.constructor) {
                    case errors.Access:
                        res.status(403);
                        break;
                    case errors.Conflict:
                        res.status(409);
                        break;
                    case errors.BadParams:
                        if (err.code === 'not_found') {
                            res.status(404);
                        }
                        else {
                            res.status(400);
                        }
                        break;
                    case errors.App:
                    default:
                        res.status(500);
                        break;
                }

                const response = {
                    code: err.code,
                    message: err.message,
                    details: err.details,
                };

                res.json({
                    error: response,
                });
            }
            else {
                res.status(500);
                res.json({
                    error: {
                        code: 'unknown_error',
                        message: 'Unknown error',
                    },
                });
            }
        }
    };
};
