const cookie = require('cookie');

module.exports = async function cookieHandler({req, res}, next) {
    if (req.headers.has('cookie')) {
        req.cookie = cookie.parse(req.headers.get('cookie'));
    }
    else {
        req.cookie = {};
    }

    res.setCookie = function(name, value, opts) {
        res.headers.set(
            'set-cookie',
            cookie.serialize(name, String(value), opts)
        );
    };

    await next();
};
